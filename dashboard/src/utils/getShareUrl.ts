function buildQueryStr(params: Record<string, string | boolean | undefined>) {
  const omitted = Object.keys(params).reduce((result, key) => {
    if (!!params[key]) {
      return { ...result, [key]: params[key] };
    }
    return result;
  }, {});
  return new URLSearchParams(omitted).toString();
}

function getFacebookShareUrl({ url, text, hashtags }: ShareUrlParams): string {
  const queryStr = buildQueryStr({
    u: url,
    quote: text,
    hashtag: hashtags,
  });
  return `https://www.facebook.com/sharer/sharer.php?${queryStr}`;
}

function getTwitterShareUrl({ text, url, hashtags }: ShareUrlParams): string {
  const queryStr = buildQueryStr({ text, url, hashtags });
  return `https://twitter.com/intent/tweet/?${queryStr}`;
}

function getLinkedInShareUrl({ url }: ShareUrlParams): string {
  const queryStr = buildQueryStr({
    url,
    mini: true,
  });
  return `https://www.linkedin.com/shareArticle?${queryStr}`;
}

interface ShareUrlParams {
  url?: string;
  title?: string;
  text?: string;
  hashtags?: string;
}

export default function getShareUrl(sharer: string, params: ShareUrlParams): string {
  switch (sharer) {
    case 'facebook':
      return getFacebookShareUrl(params);
    case 'twitter':
      return getTwitterShareUrl(params);
    case 'linkedin':
      return getLinkedInShareUrl(params);
    default:
      throw new Error(`Sharer ${sharer} is unsupported.`);
  }
}
