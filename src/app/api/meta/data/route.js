import axios from "axios";

export async function GET() {
  const accessToken = process.env.META_TEST_ACCESS_TOKEN;
  const adAccountId = process.env.META_TEST_AD_ACCOUNT_ID;

  if (!accessToken || !adAccountId) {
    return Response.json(
      { error: "META_TEST_ACCESS_TOKEN or META_TEST_AD_ACCOUNT_ID not set" },
      { status: 500 }
    );
  }

  try {
    const { data } = await axios.get(
      `https://graph.facebook.com/v19.0/act_${adAccountId}/insights`,
      {
        params: {
          fields: "spend,reach,clicks,cpc,cpm,impressions,actions",
          time_range: JSON.stringify({ since: "2026-04-26", until: "2026-05-26" }),
          access_token: accessToken,
        },
      }
    );

    return Response.json(data);
  } catch (err) {
    const metaError = err.response?.data?.error;
    return Response.json(
      { error: metaError ?? err.message },
      { status: err.response?.status ?? 500 }
    );
  }
}
