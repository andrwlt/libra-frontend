import { DEFAULT_LIMIT, NULL_VALUE } from 'config';
import { PagingState } from 'types';

const getLastItemId = (data: any[]) => data[data.length - 1]?.id;
const getFirstItemId = (data: any[]) => data[0]?.id;

export const getPagingData = (hasOneMoreRecordData: any[], params: any): { paging: PagingState; data: any[] } => {
  let hasNextPage, hasPrevPage, data, nextPageFirstId, prevPageLastId, nextRequestAfterId, nextRequestBeforeId;

  if (params.beforeId) {
    hasPrevPage = hasOneMoreRecordData.length > DEFAULT_LIMIT;
    hasNextPage = true;
    data = hasOneMoreRecordData.slice(-DEFAULT_LIMIT);
    prevPageLastId = hasNextPage && getFirstItemId(hasOneMoreRecordData);
    nextPageFirstId = params.beforeId;
  } else {
    hasPrevPage = !!params.afterId;
    hasNextPage = hasOneMoreRecordData.length > DEFAULT_LIMIT;
    data = hasOneMoreRecordData.slice(0, DEFAULT_LIMIT);
    prevPageLastId = params.afterId;
    nextPageFirstId = hasNextPage && getLastItemId(hasOneMoreRecordData);
  }

  nextRequestAfterId = hasNextPage && getLastItemId(data);
  nextRequestBeforeId = hasPrevPage && getFirstItemId(data);

  return {
    data,
    paging: {
      hasNextPage,
      hasPrevPage,
      nextPageFirstId,
      prevPageLastId,
      nextRequestAfterId,
      nextRequestBeforeId,
    },
  };
};

export const getExistProps = (item: any) => {
  return Object.entries(item).reduce((acc, [key, val]) => {
    if ((val === false || val === 0 || !!val) && val !== NULL_VALUE) {
      return {
        ...acc,
        [key]: val,
      };
    }

    return acc;
  }, {});
};
