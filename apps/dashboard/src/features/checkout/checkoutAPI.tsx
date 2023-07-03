import requester from 'services/requester';
import { CheckoutAPI } from './types';
import { DEFAULT_LIMIT } from 'config';

const checkoutAPI: CheckoutAPI = {
  getCheckouts({ limit = DEFAULT_LIMIT, ...rest }: any) {
    return requester.get('/checkout', { params: { limit, ...rest } } as any);
  },

  getCheckout: (id) => {
    return requester.get(`/checkout/${id}`);
  },

  createCheckout(checkout) {
    return requester.post('/checkout', { ...checkout, asset: '' });
  },

  updateCheckout(checkout) {
    return requester.put(`/checkout/${checkout.id}`, { ...checkout, asset: '' });
  },

  deleteCheckout(id) {
    return requester.delete(`/checkout/${id}`);
  },

  getCheckoutPerformance(id) {
    return requester.get(`/checkout/${id}/performance`);
  },

  getCheckoutPayments(id) {
    return requester.get(`/checkout/${id}/charges`);
  },
};

export default checkoutAPI;
