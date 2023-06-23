import { PagingState, BasePagingParams, GetListResponse } from 'types';
import { AxiosPromise } from 'axios';

export interface BaseAPIKey {
  name: string;
}

export interface APIKey extends BaseAPIKey {
  id: string;
}

export interface GetAPIKeysState {
  apiKeys: APIKey[];
  getAPIKeysLoading: boolean;
  getAPIKeysFailed: any;
  apiKeysPaging: PagingState;
}

export interface CreateAPIKeyState {
  createAPIKeyLoading: boolean;
  createAPIKeySuccess: any;
  createAPIKeyFailed: any;
}

export interface UpdateAPIKeyState {
  updateAPIKeyLoading: boolean;
  updateAPIKeySuccess: any;
  updateAPIKeyFailed: any;
}

export interface DeleteAPIKeyState {
  deleteAPIKeyLoading: boolean;
  deleteAPIKeySuccess: any;
  deleteAPIKeyFailed: any;
}

export interface APIKeyState extends GetAPIKeysState, CreateAPIKeyState, UpdateAPIKeyState, DeleteAPIKeyState {
  isFirstLoad: boolean;
}

export interface APIKeyAPI {
  getAPIKeys: (params?: BasePagingParams) => AxiosPromise;
  createAPIKey: (apiKey: BaseAPIKey) => AxiosPromise;
  updateAPIKey: (apiKey: APIKey) => AxiosPromise;
  deleteAPIKey: (id: string) => AxiosPromise;
}
