export interface AssetMetadata {
  decimals: number;
  symbol: string;
  logo: string;
}

export interface Paging<T> {
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPageData: T[];
}

export interface GetListResponse<T> {
  data: {
    data: T[];
  };
}
