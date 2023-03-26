import requester from 'services/requester';
import { DEFAULT_LIMIT } from 'config';
import { WebhookAPI } from './types';

const webhookAPI: WebhookAPI = {
  getWebhooks({ limit = DEFAULT_LIMIT, ...rest }: any) {
    return requester.get('/webhooks', { params: { limit, ...rest } } as any);
  },

  getWebhook: (id) => {
    return requester.get(`/webhooks/${id}`);
  },

  createWebhook(webhook) {
    return requester.post('/webhooks', webhook);
  },

  updateWebhook(webhook) {
    return requester.put(`/webhooks/${webhook.id}`, webhook);
  },

  deleteWebhook(id) {
    return requester.delete(`/webhooks/${id}`);
  },
};

export default webhookAPI;
