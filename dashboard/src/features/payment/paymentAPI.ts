import { PaymentAPI } from './types';
import requester from 'services/requester';

const paymentAPI: PaymentAPI = {
  getCharges: () => {
    return requester.get('/charges');
  },
};

export default paymentAPI;
