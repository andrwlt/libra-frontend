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

  getCheckoutPerformance() {
    // return requester.get(`/checkout/${id}/performance`);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            views: 5,
            sales: 5,
            revenue: { value: 20000000.05550 },
          },
        });
      }, 1000);
    });
  },

  getCheckoutPayments(id) {
    // return requester.get(`/checkout/${id}/charges`);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            data: [
              {
                id: 'ckt_01h48db4q8jp8phj9mn232ph02',
                from: '5GuZ9RJ3Bmoy2NtiUP9eYe2oHRYnpMrk6S3MXuMBAduFr36P',
                to: '5GuZ9RJ3Bmoy2NtiUP9eYe2oHRYnpMrk6S3MXuMBAduFr36P',
                amount: 1,
                assetId: 'ast_dot',
                description: 'example_abc@gmail.com + test to USDT checkout',
                networkId: 'nw_polkadot',
                created: '2023-07-01T09:42:59.559Z',
                status: 'succeeded',
                receiptEmail: 'example_abc@gmail.com',
              },
              {
                id: 'ckt_01h48db4q8jp8phj9mn232ph02',
                from: '5GuZ9RJ3Bmoy2NtiUP9eYe2oHRYnpMrk6S3MXuMBAduFr36P',
                to: '5GuZ9RJ3Bmoy2NtiUP9eYe2oHRYnpMrk6S3MXuMBAduFr36P',
                amount: 2,
                assetId: 'ast_dot',
                description: 'example_abc@gmail.com + test to USDT checkout 123213',
                networkId: 'nw_polkadot',
                created: '2023-07-01T09:42:59.559Z',
                status: 'failed',
                receiptEmail: 'example_abc@gmail.com',
              },
            ],
          },
        });
      }, 1000);
    });
  },
};

export default checkoutAPI;
