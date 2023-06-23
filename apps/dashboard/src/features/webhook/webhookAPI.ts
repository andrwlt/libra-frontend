import requester from 'services/requester';
import { DEFAULT_LIMIT } from 'config';
import { WebhookAPI } from './types';

const webhookAPI: WebhookAPI = {
  getWebhooks({ limit = DEFAULT_LIMIT, ...rest }: any) {
    return requester.get('/webhook_endpoints', { params: { limit, ...rest } } as any);
  },

  getWebhook: (id) => {
    return requester.get(`/webhook_endpoints/${id}`);
  },

  createWebhook(webhook) {
    return requester.post('/webhook_endpoints', webhook);
  },

  updateWebhook(webhook) {
    return requester.put(`/webhook_endpoints/${webhook.id}`, webhook);
  },

  deleteWebhook(id) {
    return requester.delete(`/webhook_endpoints/${id}`);
  },
};

export default webhookAPI;
