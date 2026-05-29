import axios from 'axios';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim();
  const country = searchParams.get('country') || 'IN';
  const mediaType = searchParams.get('media_type') || 'ALL';

  if (!q) {
    return Response.json({ error: 'search query is required' }, { status: 400 });
  }

  if (!process.env.META_APP_ID || !process.env.META_APP_SECRET) {
    return Response.json({ error: 'META_APP_ID or META_APP_SECRET not configured' }, { status: 500 });
  }

  // App access token format for Meta Graph API
  const access_token = `${process.env.META_APP_ID}|${process.env.META_APP_SECRET}`;

  const params = {
    access_token,
    search_terms: q,
    ad_reached_countries: JSON.stringify([country]),
    fields: [
      'id',
      'ad_creative_body',
      'ad_snapshot_url',
      'ad_delivery_start_time',
      'ad_delivery_stop_time',
      'publisher_platforms',
      'page_name',
      'ad_creative_link_title',
    ].join(','),
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

    // Surface actionable message for common permission error
    if (metaError?.code === 200) {
      return Response.json(
        {
          error: {
            message:
              'Meta Ads Library API access is blocked. Enable "Ads Library API" in your Meta App Dashboard under Products, then request access at developers.facebook.com.',
            original: metaError,
          },
        },
        { status: 403 }
      );
    }

    return Response.json(
      { error: metaError ?? err.message },
      { status: err.response?.status ?? 500 }
    );
  }
}
