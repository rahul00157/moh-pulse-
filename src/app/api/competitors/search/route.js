import axios from 'axios';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim();
  const country = searchParams.get('country') || 'IN';
  const mediaType = searchParams.get('media_type') || 'ALL';

  if (!q) {
    return Response.json({ error: 'search query is required' }, { status: 400 });
  }

  const appId = process.env.META_APP_ID;
  const appSecret = process.env.META_APP_SECRET;

  if (!appId || !appSecret) {
    return Response.json({ error: 'Meta app credentials not configured' }, { status: 500 });
  }

  const accessToken = `${appId}|${appSecret}`;

  const params = {
    access_token: accessToken,
    search_terms: q,
    ad_reached_countries: `["${country}"]`,
    fields: 'id,ad_creative_body,ad_snapshot_url,ad_delivery_start_time,ad_delivery_stop_time,publisher_platforms,page_name,ad_creative_link_title',
    limit: 20,
  };

  if (mediaType !== 'ALL') {
    params.media_type = mediaType;
  }

  try {
    const { data } = await axios.get(
      'https://graph.facebook.com/v19.0/ads_archive',
      { params }
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
