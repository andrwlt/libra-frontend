import { AxiosPromise } from 'axios';
import { Paging, PagingParams } from 'types';
import { DEFAULT_LIMIT } from 'config';
import { getPagingData } from 'utils/paging';

type ReturnType<T> = PromiseLike<{
  data: T[];
  paging: Paging<T>;
}>;

type PagingHelperFunction = <T extends { id?: string }>(params: {
  paging: Paging<T>;
  request: (params: PagingParams) => AxiosPromise;
  data: T[];
  searchParams?: any;
}) => ReturnType<T>;

type PagingHelper = {
  refreshAfterDeleting: PagingHelperFunction;
  goNext: PagingHelperFunction;
  goBack: PagingHelperFunction;
  refreshCurrentPage: PagingHelperFunction;
  getFirstPage: PagingHelperFunction;
};

const pagingHelper: PagingHelper = {
  async refreshCurrentPage(params) {
    const {
      paging: { hasPrevPage, prevPageData },
      request,
      searchParams = {},
    } = params;

    const afterId = prevPageData[prevPageData.length - 1]?.id;

    const response = await request({
      afterId,
      limit: DEFAULT_LIMIT + 1,
      ...searchParams,
    });

    const { data: nextData, hasNextPage } = getPagingData(response.data.data);

    return {
      data: nextData,
      paging: {
        hasNextPage,
        hasPrevPage,
        prevPageData,
      },
    };
  },

  async goNext(params) {
    const { request, data, searchParams = {} } = params;
    const afterId = data[data.length - 1]?.id;

    const {
      data: { data: nextPageData },
    } = await request({ afterId, limit: DEFAULT_LIMIT + 1, ...searchParams });

    const { hasNextPage, data: nextData } = getPagingData(nextPageData);

    return {
      data: nextData,
      paging: {
        hasNextPage,
        hasPrevPage: !!data.length,
        prevPageData: data,
      },
    };
  },

  async goBack(params) {
    const {
      request,
      paging: { prevPageData },
      searchParams = {},
    } = params;

    const beforeId = prevPageData[0]?.id;

    const {
      data: { data: nextPrevPageData },
    } = await request({ beforeId, ...searchParams });

    return {
      data: prevPageData,
      paging: {
        hasNextPage: true,
        hasPrevPage: nextPrevPageData.length,
        prevPageData: nextPrevPageData,
      },
    };
  },

  async getFirstPage(params) {
    const { request, searchParams = {} } = params;

    const {
      data: { data: firstPageData },
    } = await request({ limit: DEFAULT_LIMIT + 1, ...searchParams });

    const { hasNextPage, data: nextData } = getPagingData(firstPageData);

    return {
      data: nextData,
      paging: {
        hasNextPage,
        hasPrevPage: false,
        prevPageData: [],
      },
    };
  },

  async refreshAfterDeleting(params) {
    const {
      paging: { hasPrevPage },
      data,
    } = params;

    const isDeletedTheLastItem = data.length === 1;

    if (isDeletedTheLastItem) {
      if (!hasPrevPage) {
        return {
          data: [],
          paging: {
            hasNextPage: false,
            hasPrevPage: false,
            prevPageData: [],
          },
        };
      } else {
        const { data, paging } = await this.goBack(params);
        return {
          data,
          paging: {
            ...paging,
            hasNextPage: false,
          },
        };
      }
    } else {
      return await this.refreshCurrentPage(params);
    }
  },
};

export default pagingHelper;
