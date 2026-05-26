import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { exchangeCodeForToken } from "@/lib/metaApi";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  console.log("Step 1 - Code received:", code);

  if (!code) {
    return NextResponse.redirect(new URL("/connect?error=no_code", request.url));
  }

  try {
    console.log("Step 2 - Token exchange starting");
    const tokenData = await exchangeCodeForToken(code);
    const metaAccessToken = tokenData.access_token;
    console.log("Step 3 - Token received:", metaAccessToken);

    if (!state) {
      return NextResponse.redirect(new URL("/connect?error=no_session", request.url));
    }

    const supabaseJwt = atob(state);

    // Anon client with user JWT — only used to verify who the user is
    const anonClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    console.log("Step 4 - Getting user session");
    const { data: { user }, error: userError } = await anonClient.auth.getUser(supabaseJwt);
    console.log("Step 5 - User:", user);

    if (userError) {
      console.log("Step 5 - User error:", userError.message);
    }

    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Service role client — bypasses RLS for server-side DB writes
    const adminClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    console.log("Step 6 - Saving to DB");

    const { error: deleteError } = await adminClient
      .from("connections")
      .delete()
      .eq("user_id", user.id)
      .eq("platform", "meta");

    console.log("Step 6a - Delete error:", deleteError?.message ?? null);

    const { data: result, error } = await adminClient
      .from("connections")
      .insert({
        user_id: user.id,
        platform: "meta",
        access_token: metaAccessToken,
        created_at: new Date().toISOString(),
      })
      .select();

    console.log("Step 7 - DB result:", result);
    console.log("Step 8 - DB error:", error);

    if (error) {
      return NextResponse.redirect(new URL("/connect?error=db_error", request.url));
    }

    return NextResponse.redirect(new URL("/connect?success=true", request.url));

  } catch (err) {
    console.log("CATCH ERROR:", err.message, err.stack);
    return NextResponse.redirect(new URL("/connect?error=true", request.url));
  }
}
