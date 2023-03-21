import requester from 'services/requester';
import { CheckoutAPI } from './types';
import { DEFAULT_LIMIT } from 'config';

const checkoutAPI: CheckoutAPI = {
  getCheckouts({ limit = DEFAULT_LIMIT, afterId: after_id, beforeId: before_id }: any) {
    console.log('limit', limit);
    return requester.get('/checkout', { params: { limit, after_id, before_id } } as any);
  },

  getCheckout: (id) => {
    return requester.get(`/checkout/${id}`);
  },

  createCheckout(checkout) {
    return requester.post('/checkout', checkout);
  },

  updateCheckout(checkout) {
    return requester.put(`/checkout/${checkout.id}`, checkout);
  },

  deleteCheckout(id) {
    return requester.delete(`/checkout/${id}`);
  },
};

export default checkoutAPI;
