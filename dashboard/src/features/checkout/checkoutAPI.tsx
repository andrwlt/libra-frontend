import requester from 'services/requester';
import { CheckoutAPI } from './types';
import { DEFAULT_LIMIT } from 'config';

const fakeCheckouts = () =>
  Array.from(Array(11).keys()).map((number) => {
    return {
      id: number,
      item: { price: 123, name: 'test' },
      branding: { name: 'text' },
    };
  });

const checkoutAPI: CheckoutAPI = {
  getCheckouts({ limit = DEFAULT_LIMIT, ...rest }: any) {
    // return requester.get('/checkout', { params: { limit, ...rest } } as any);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            data: fakeCheckouts(),
          },
        });
      }, 2000);
    });
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
