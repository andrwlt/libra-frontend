import { AxiosPromise } from 'axios';
import { BasePagingParams, PagingState } from 'types';
import { LIMIT_PLUS_1 } from 'config';
import { getPagingData } from 'utils/paging';

type ReturnType<T> = PromiseLike<{
  data: T[];
  paging: PagingState;
}>;

type PagingHelperMethod = <T extends { id?: string }>(params: {
  request: (params: BasePagingParams) => AxiosPromise;
  searchParams?: any;
}) => ReturnType<T>;

type PagingHelper = {
  fetchData: PagingHelperMethod;
};

const pagingHelper: PagingHelper = {
  async fetchData(params) {
    const { request, searchParams = {} } = params;

    const {
      data: { data: hasMoreOneRecordData },
    } = await request({ limit: LIMIT_PLUS_1, ...searchParams });

    return getPagingData(hasMoreOneRecordData, searchParams);
  },
};

export default pagingHelper;
