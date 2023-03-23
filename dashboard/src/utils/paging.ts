import { DEFAULT_LIMIT } from 'config';

export const getPagingData = (data: any[]) => {
  const hasNextPage = data.length > DEFAULT_LIMIT;
  const currentPageData = hasNextPage ? data.slice(0, -1) : data;

  return { data: currentPageData, hasNextPage };
};

export const getPrevPagingData = (data: any[]) => {
  const currentPageData = data.slice(-DEFAULT_LIMIT);
  const prevPageData = data.slice(0, data.length - DEFAULT_LIMIT);
  return { data: currentPageData, prevPageData, hasPrevPage: !!prevPageData.length };
};
