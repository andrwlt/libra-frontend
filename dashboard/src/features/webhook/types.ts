import { Paging } from 'types';

export interface WebhookBase {
  url: string;
  secret: string;
  events: string[];
}

export interface WebhookResponse extends WebhookBase {
  id: string;
  active: boolean;
  metadata?: any;
}

export interface WebhookListState {
  webhooks: WebhookResponse[];
  getWebhooksLoading: boolean;
  getWebhooksFailed: any;
  webhooksPaging: Paging<WebhookResponse>;
}

export interface WebhooksHookType extends WebhookListState {
  fetchWebhooks: (params?: { isGoNext?: boolean }) => void;
}
