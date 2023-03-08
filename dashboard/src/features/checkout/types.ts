import { AxiosPromise } from 'axios';
import { PreUploadImage } from 'types';

export interface Brand {
  name?: string;
  logo?: string | PreUploadImage;
}

export interface LineItem {
  name: string;
  description?: string;
  images: string[] | PreUploadImage[];
  price: number | null;
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

export interface CheckoutAPI {
  getCheckouts: () => AxiosPromise;
  getCheckout: (id: string) => AxiosPromise;
  createCheckout: (checkout: CheckoutType) => AxiosPromise;
  updateCheckout: (checkout: CheckoutType) => AxiosPromise;
  deleteCheckout: (id: string) => AxiosPromise;
}

export interface CheckoutListState {
  checkouts: CheckoutType[];
  getCheckoutsLoading: boolean;
  getCheckoutsFailed: any;
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
}
