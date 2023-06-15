import { AxiosPromise } from 'axios';
import { RootState } from 'app/store';
import { BasePagingParams, PagingState } from 'types';
import { BaseCheckout, BaseProduct, CheckoutResponse, NumberPriceCheckoutResponse } from '@atscale/libra-ui';
import { NextCharge } from 'features/payment/types';

interface StringPriceProduct extends BaseProduct {
  price: string;
}

export interface CreatingCheckout extends BaseCheckout {
  item: StringPriceProduct;
}

export interface UpdatingCheckout extends StringPriceProduct {
  id: string;
}

export interface CheckoutAPI {
  getCheckouts: (params?: BasePagingParams) => Promise<any>;
  getCheckout: (id: string) => AxiosPromise;
  createCheckout: (checkout: CreatingCheckout) => AxiosPromise;
  updateCheckout: (checkout: UpdatingCheckout) => AxiosPromise;
  deleteCheckout: (id: string) => AxiosPromise;
  getCheckoutSession: (id: string) => Promise<any>;
  getCheckoutPayments: (id: string) => Promise<any>;
}

export interface CheckoutListState {
  checkouts: CheckoutResponse[];
  getCheckoutsLoading: boolean;
  getCheckoutsFailed: any;
  checkoutsPaging: PagingState;
  isFirstLoad: boolean;
}

export interface GetCheckoutState {
  checkout: NumberPriceCheckoutResponse;
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
  handleCreateCheckout: (checkout: CreatingCheckout) => void;
}

export interface UpdateCheckoutState {
  updateCheckoutLoading: boolean;
  updateCheckoutSuccess: any;
  updateCheckoutFailed: any;
}

export interface UpdateCheckoutHookType extends UpdateCheckoutState {
  handleUpdateCheckout: (checkout: UpdatingCheckout) => void;
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

export interface Performance {
  views: number;
  sales: number;
  revenue: number;
}

export interface CheckoutDetails {
  checkout: NumberPriceCheckoutResponse;
  performance: Performance;
  payments: NextCharge[];
}

export interface GetCheckoutDetailsState {
  getCheckoutDetailsLoading: boolean;
  checkoutDetails?: CheckoutDetails;
  getCheckoutDetailsFailed: any;
}

export interface PriceInputPropsType extends FormItemsPropsType {
  shouldShowHelpText?: boolean | undefined;
  onPriceInputFocus?: () => void;
  onPriceInputChange?: (value: any, isPriceInput: boolean) => void;
  onPriceInputBlur?: () => void;
}

export type AddMoreInfo = <T>(original: T, getState: () => RootState) => T;

export interface UseCheckoutsReturnType extends CheckoutListState {
  refreshCurrentPage: () => void;
}

export interface UseHelpTextReturnType {
  shouldShowHelpText: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onChange: (value: any, isPriceInput?: boolean) => void;
  setShouldShowHelpText: Function;
}
