import { PaymentAPI } from './types';
import requester from 'services/requester';
import { DEFAULT_LIMIT } from 'config';

const paymentAPI: PaymentAPI = {
  getCharges({ limit = DEFAULT_LIMIT, afterId: after_id, beforeId: before_id }: any) {
    return requester.get('/charges', { params: { limit, after_id, before_id } } as any);
  },
};

export default paymentAPI;
