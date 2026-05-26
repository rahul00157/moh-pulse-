import axios from "axios";

const BASE_URL = "https://graph.facebook.com/v19.0";
const REDIRECT_URI = "http://localhost:3000/api/auth/meta/callback";

// accessToken: Supabase JWT, encoded in state so the callback can identify the user
export function generateMetaAuthURL(accessToken) {
  const state = accessToken ? btoa(accessToken) : "";
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_META_APP_ID,
    redirect_uri: REDIRECT_URI,
    scope: "ads_read,ads_management,business_management",
    response_type: "code",
    config_id: process.env.NEXT_PUBLIC_META_CONFIG_ID,
    state,
  });
  return `https://www.facebook.com/dialog/oauth?${params.toString()}`;
}

export async function exchangeCodeForToken(code) {
  const { data } = await axios.post(`${BASE_URL}/oauth/access_token`, null, {
    params: {
      client_id: process.env.META_APP_ID,
      client_secret: process.env.META_APP_SECRET,
      redirect_uri: REDIRECT_URI,
      code,
    },
  });
  return data;
}

export async function fetchAdAccounts(accessToken) {
  const { data } = await axios.get(`${BASE_URL}/me/adaccounts`, {
    params: {
      access_token: accessToken,
      fields: "id,name,account_status,currency",
    },
  });
  return data;
}
