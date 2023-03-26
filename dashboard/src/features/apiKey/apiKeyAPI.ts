import requester from 'services/requester';
import { DEFAULT_LIMIT } from 'config';

const webhookAPI = {
  getWebhooks({ limit = DEFAULT_LIMIT, ...rest }: any) {
    return requester.get('/webhook', { params: { limit, ...rest } } as any);
  },

  getWebhook: (id: string) => {
    return requester.get(`/webhook/${id}`);
  },

  createWebhook(webhook: any) {
    return requester.post('/webhook', webhook);
  },

  updateWebhook(webhook: any) {
    return requester.put(`/webhook/${webhook.id}`, webhook);
  },

  deleteWebhook(id: string) {
    return requester.delete(`/webhook/${id}`);
  },
};

export default webhookAPI;
