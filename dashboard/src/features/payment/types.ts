import { AxiosPromise } from 'axios';
interface PaymentParams {
  limit?: number;
  afterId?: string;
  beforeId?: string;
}

export interface PaymentAPI {
  getCharges: (params?: PaymentParams) => AxiosPromise;
}

export interface Charge {
  id: string;
  from: string;
  to: string;
  amount: number;
  asset: string;
  description: string;
  metadata: any;
  hash: string;
  created: string;
  status: 'succeeded' | 'pending' | 'failed';
}

export interface GetChargesState {
  charges: Charge[];
  getChargesLoading: boolean;
  getChargesFailed: any;
  hasCheckout: boolean;
  chargesPaging: {
    hasPrevPage: boolean;
    hasNextPage: boolean;
  };
}

export interface GetChargesResponse {
  data: {
    data: Charge[];
  };
}
