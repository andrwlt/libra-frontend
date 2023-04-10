import { PaymentAPI } from './types';
import requester from 'services/requester';
import { DEFAULT_LIMIT } from 'config';

const paymentAPI: PaymentAPI = {
  getCharges({ limit = DEFAULT_LIMIT, ...rest }: any) {
    return requester.get('/charges', { params: { limit, ...rest } } as any);
  },
};

export default paymentAPI;
