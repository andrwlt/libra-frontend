import requester from 'services/requester';
import { DEFAULT_LIMIT } from 'config';

const webhookAPI = {
  getWebhooks({ limit = DEFAULT_LIMIT, ...rest }: any) {
    return requester.get('/webhooks', { params: { limit, ...rest } } as any);
  },

  getWebhook: (id: string) => {
    return requester.get(`/webhooks/${id}`);
  },

  createWebhook(webhook: any) {
    return requester.post('/webhooks', webhook);
  },

  updateWebhook(webhook: any) {
    return requester.put(`/webhooks/${webhook.id}`, webhook);
  },

  deleteWebhook(id: string) {
    return requester.delete(`/webhooks/${id}`);
  },
};

export default webhookAPI;
