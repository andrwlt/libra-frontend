import { AxiosPromise } from 'axios';
import { RootState } from 'app/store';
import { PagingParams, Paging } from 'types';

export interface Brand {
  name?: string;
  logo?: string;
}

interface CheckoutProductItemBase {
  name: string;
  description?: string;
  image?: string;
}

export interface CheckoutProductItemStringPrice extends CheckoutProductItemBase {
  price: string;
}

export interface CheckoutProductItemNumberPrice extends CheckoutProductItemBase {
  price: number | null;
}

export interface CheckoutBaseType {
  branding: Brand;
  asset: string;
  afterPayment?: {
    redirectUrl: string;
  };
}

export interface CheckoutPreviewType extends CheckoutBaseType {
  item: CheckoutProductItemNumberPrice;
}

export interface CreatingCheckoutType extends CheckoutBaseType {
  item: CheckoutProductItemStringPrice;
}

export interface UpdatingCheckoutType extends CheckoutProductItemStringPrice {
  id: string;
}

export interface CheckoutResponseBase {
  id: string;
  branding: Brand;
  payee: string;
  asset: string;
  afterPayment?: {
    redirectUrl: string;
  };
  active: boolean;
  created: string;
}

export interface CheckoutResponseType extends CheckoutResponseBase {
  item: CheckoutProductItemStringPrice;
}

export interface CheckoutResponseAfterConvertingPrice extends CheckoutResponseBase {
  item: CheckoutProductItemNumberPrice;
}

export interface CheckoutAPI {
  getCheckouts: (params?: PagingParams) => AxiosPromise;
  getCheckout: (id: string) => AxiosPromise;
  createCheckout: (checkout: CreatingCheckoutType) => AxiosPromise;
  updateCheckout: (checkout: UpdatingCheckoutType) => AxiosPromise;
  deleteCheckout: (id: string) => AxiosPromise;
}

export interface CheckoutListState {
  checkouts: CheckoutResponseType[];
  getCheckoutsLoading: boolean;
  getCheckoutsFailed: any;
  checkoutsPaging: Paging<CheckoutResponseType>;
}

export interface CheckoutDetailsState {
  checkout: CheckoutResponseAfterConvertingPrice;
  getCheckoutLoading: boolean;
  getCheckoutFailed: any;
}

export interface CreateCheckoutState {
  createCheckoutLoading: boolean;
  createCheckoutSuccess: any;
  createCheckoutFailed: any;
  checkoutURL: string;
}

export interface CreateCheckoutHookType extends CreateCheckoutState {
  handleCreateCheckout: (checkout: CreatingCheckoutType) => void;
}

export interface UpdateCheckoutState {
  updateCheckoutLoading: boolean;
  updateCheckoutSuccess: any;
  updateCheckoutFailed: any;
}

export interface UpdateCheckoutHookType extends UpdateCheckoutState {
  handleUpdateCheckout: (checkout: UpdatingCheckoutType) => void;
}
export interface DeleteCheckoutState {
  deleteCheckoutLoading: boolean;
  deleteCheckoutSuccess: any;
  deleteCheckoutFailed: any;
}
export interface DeleteCheckoutHookType extends DeleteCheckoutState {
  handleDeleteCheckout: (id: string) => void;
}

export interface FormItemsPropsType {
  onboardingMode?: boolean;
  isShow?: boolean;
  onFieldsChange?: () => void;
}

export interface GetCheckoutsResponse {
  data: {
    data: CheckoutResponseType[];
  };
}

export type AddMoreInfo = <T>(original: T, getState: () => RootState) => T;
