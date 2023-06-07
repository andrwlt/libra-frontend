export interface GetListResponse<T> {
  data: {
    data: T[];
  };
}

export interface BasePagingParams {
  limit?: number;
  afterId?: string;
  beforeId?: string;
}

export interface PagingState {
  nextRequestBeforeId?: string;
  nextRequestAfterId?: string;
  nextPageFirstId?: string;
  prevPageLastId?: string;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

export interface GetListPayload {
  afterId?: string;
  beforeId?: string;
}
