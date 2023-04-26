import { PagingState, BasePagingParams } from 'types';
import { AxiosPromise } from 'axios';
export interface WebhookBase {
  url: string;
  description?: string;
  events: string[];
  metadata?: any;
}

export interface WebhookResponse extends WebhookBase {
  id: string;
  active: boolean;
  secret: string;
}

export interface WebhookListState {
  webhooks: WebhookResponse[];
  getWebhooksLoading: boolean;
  getWebhooksFailed: any;
  webhooksPaging: PagingState;
}

export interface UseWebhooksReturnType extends WebhookListState {
  refreshCurrentPage: () => void;
}

export interface WebhookAPI {
  getWebhooks: (params?: BasePagingParams) => AxiosPromise;
  getWebhook: (id: string) => AxiosPromise;
  createWebhook: (checkout: WebhookBase) => AxiosPromise;
  updateWebhook: (checkout: WebhookResponse) => AxiosPromise;
  deleteWebhook: (id: string) => AxiosPromise;
}

export interface CreateWebhookState {
  createWebhookLoading: boolean;
  createWebhookSuccess: any;
  createWebhookFailed: any;
}

export interface CreateWebhookHook extends CreateWebhookState {
  handleCreateWebhook: (webhook: WebhookBase) => void;
}

export interface UpdateWebhookState {
  updateWebhookLoading: boolean;
  updateWebhookSuccess: any;
  updateWebhookFailed: any;
}

export interface UpdateWebhookHook extends UpdateWebhookState {
  handleUpdateWebhook: (webhook: WebhookResponse, updatedStatus?: boolean) => void;
}

export interface UpdateWebhookState {
  updateWebhookLoading: boolean;
  updateWebhookSuccess: any;
  updateWebhookFailed: any;
}

export interface DeleteWebhookState {
  deleteWebhookLoading: boolean;
  deleteWebhookSuccess: any;
  deleteWebhookFailed: any;
}
export interface DeleteWebhookHook extends DeleteWebhookState {
  handleDeleteWebhook: (id: string) => void;
}
