import requester from 'services/requester';
import { CheckoutAPI } from './types';
import { DEFAULT_LIMIT } from 'config';
import { NextCharge } from 'features/payment/types';

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

  getCheckoutSession(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            views: 250,
            sales: 120,
            revenue: 2000,
          },
        });
      }, 1000);
    });
  },

  getCheckoutPayments(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data: NextCharge[] = [
          {
            id: 'Fake_id_1',
            from: '',
            to: '',
            amount: 1,
            assetId: 'ast_dot',
            networkId: 'nw_polkadot',
            created: '',
            status: 'succeeded',
            description: '',
            receiptEmail: 'example@gmail.com',
          },
          {
            id: 'Fake_id_2',
            from: '',
            to: '',
            amount: 2,
            assetId: 'ast_dot',
            networkId: 'nw_polkadot',
            created: '',
            status: 'succeeded',
            description: '',
            receiptEmail: 'example@gmail.com',
          },
          {
            id: 'Fake_id_3',
            from: '',
            to: '',
            amount: 3,
            assetId: 'ast_dot',
            networkId: 'nw_polkadot',
            created: '',
            status: 'succeeded',
            description: '',
            receiptEmail: 'example@gmail.com',
          },
        ];
        resolve({ data });
      }, 1000);
    });
  },
};

export default checkoutAPI;
