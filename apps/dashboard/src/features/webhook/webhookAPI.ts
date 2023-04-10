import requester from 'services/requester';
import { DEFAULT_LIMIT } from 'config';
import { WebhookAPI } from './types';

const webhookAPI: WebhookAPI = {
  getWebhooks({ limit = DEFAULT_LIMIT, ...rest }: any) {
    return requester.get('/webhook-endpoints', { params: { limit, ...rest } } as any);
  },

  getWebhook: (id) => {
    return requester.get(`/webhook-endpoints/${id}`);
  },

  createWebhook(webhook) {
    return requester.post('/webhook-endpoints', webhook);
  },

  updateWebhook(webhook) {
    return requester.put(`/webhook-endpoints/${webhook.id}`, webhook);
  },

  deleteWebhook(id) {
    return requester.delete(`/webhook-endpoints/${id}`);
  },
};

export default webhookAPI;
