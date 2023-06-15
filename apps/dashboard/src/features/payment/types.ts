import { AxiosPromise } from 'axios';
import { GetListPayload, PagingState } from 'types';
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

export interface NextCharge {
  id: string;
  from: string;
  to: string;
  amount: number;
  assetId: string;
  description: string;
  networkId: string;
  created: string;
  status: 'succeeded' | 'pending' | 'failed';
  receiptEmail: string;
}

export interface GetChargesState {
  charges: Charge[];
  getChargesLoading: boolean;
  getChargesFailed: any;
  hasCheckout: boolean;
  firstCheckoutAsset: string;
  isFirstLoad: boolean;
  chargesPaging: PagingState;
}

export interface GetChargesPayload extends GetListPayload {
  status?: string;
  'created[gte]'?: string;
  'created[lte]'?: string;
}
