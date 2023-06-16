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

  getSecretKey() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          'sk_test_51MlDPXBGOx8LdIXKJBdiq4bA4PMgcJ6E2eSLqJaf1dt5zNfYO2J1KSZ7h9mxJXmSBKfUZlhddeEq9c7ID1Anw7xR002ECkZAiA',
        );
      }, 1000);
    });
  },
};

export default webhookAPI;
