import { useEffect } from 'react';
import { useAppSelector, useAppDispatch, useFailed, useSuccess } from 'app/hooks';
import {
  getCheckouts,
  getCheckoutDetails,
  selectCheckoutListState,
  selectCheckoutDetailsState,
  createCheckout,
  selectCreateCheckoutState,
  selectUpdateCheckoutState,
  updateCheckout,
  resetCheckout,
} from 'features/checkout/checkoutSlice';
import { CheckoutType, CreateCheckoutHookType, UpdateCheckoutHookType } from './types';
import { FormInstance } from 'antd';
import { useNavigate } from 'react-router-dom';
import PATHS from 'router/paths';
import { useTranslation } from 'react-i18next';

export const useResetCheckout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetCheckout());
    };
  }, [dispatch]);
};

export const useCheckouts = () => {
  const state = useAppSelector(selectCheckoutListState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCheckouts());
  }, [dispatch]);

  useFailed(state.getCheckoutsFailed);

  return state;
};

export const useCheckout = (id?: string) => {
  const state = useAppSelector(selectCheckoutDetailsState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getCheckoutDetails(id));
    }
  }, [dispatch, id]);

  useFailed(state.getCheckoutFailed);
  return state;
};

export const useCreateCheckout = (onboardingMode = false): CreateCheckoutHookType => {
  const { t } = useTranslation();
  const state = useAppSelector(selectCreateCheckoutState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreateCheckout = (checkout: CheckoutType) => {
    dispatch(createCheckout(checkout));
  };

  const successMess = onboardingMode ? '' : t('checkout.checkoutCreatedSuccessfully');
  const successCallback = onboardingMode ? () => {} : () => navigate(PATHS.checkout.root);

  useSuccess(state.createCheckoutSuccess, successMess, successCallback);
  useFailed(state.createCheckoutFailed);

  return {
    ...state,
    handleCreateCheckout,
  };
};

export const useUpdateCheckout = (): UpdateCheckoutHookType => {
  const { t } = useTranslation();
  const state = useAppSelector(selectUpdateCheckoutState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleUpdateCheckout = (checkout: CheckoutType) => {
    dispatch(updateCheckout(checkout));
  };

  const message = t('checkout.checkoutUpdatedSuccessfully');

  useSuccess(state.updateCheckoutSuccess, message, () => navigate(PATHS.checkout.root));
  useFailed(state.updateCheckoutFailed);

  return {
    ...state,
    handleUpdateCheckout,
  };
};

export const useReinitCheckoutForm = (form: FormInstance, update: Function) => {
  const { checkout } = useCheckout();

  useEffect(() => {
    if (checkout) {
      form.setFieldsValue(checkout);
      update(checkout);
    }
  }, [checkout, form, update]);
};
