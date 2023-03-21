import { AxiosPromise } from 'axios';
import { PreUploadImage } from 'types';

export interface Brand {
  name?: string;
  logo?: string;
}

export interface LineItem {
  name: string;
  description?: string;
  image: string;
  price: string | null;
}

export interface CheckoutType {
  id?: string;
  branding: Brand;
  payee: string;
  asset: string;
  item: LineItem;
  afterPayment?: {
    redirectUrl: string;
  };
}

interface LineItemResponse extends LineItem {
  price: string;
}
export interface CheckoutResponse extends CheckoutType {
  id: string;
  item: LineItemResponse;
  active: boolean;
  created: string;
}

interface CheckoutParams {
  limit?: number;
  afterId?: string;
  beforeId?: string;
}
export interface CheckoutAPI {
  getCheckouts: (params?: CheckoutParams) => AxiosPromise;
  getCheckout: (id: string) => AxiosPromise;
  createCheckout: (checkout: CheckoutType) => AxiosPromise;
  updateCheckout: (checkout: CheckoutType) => AxiosPromise;
  deleteCheckout: (id: string) => AxiosPromise;
}

export interface CheckoutListState {
  checkouts: CheckoutResponse[];
  getCheckoutsLoading: boolean;
  getCheckoutsFailed: any;
  checkoutsPaging: {
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPageData: CheckoutResponse[];
  };
}

export interface CheckoutDetailsState {
  checkout: CheckoutType;
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
  handleCreateCheckout: (checkout: CheckoutType) => void;
}

export interface UpdateCheckoutState {
  updateCheckoutLoading: boolean;
  updateCheckoutSuccess: any;
  updateCheckoutFailed: any;
}

export interface UpdateCheckoutHookType extends UpdateCheckoutState {
  handleUpdateCheckout: (checkout: CheckoutType) => void;
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
    data: CheckoutResponse[];
  };
}
