import requester from 'services/requester';
import { CheckoutAPI } from './types';

const checkoutAPI: CheckoutAPI = {
  getCheckouts() {
    return requester.get('/checkout');
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
