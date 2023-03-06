import { AxiosPromise } from 'axios';

export interface PaymentAPI {
  getCharges: () => Promise<AxiosPromise>;
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
}
