import { useEffect, useCallback } from 'react';
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
  selectDeleteCheckoutState,
  deleteCheckout,
} from 'features/checkout/checkoutSlice';
import { CheckoutType, CreateCheckoutHookType, UpdateCheckoutHookType, DeleteCheckoutHookType } from './types';
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

  const fetchCheckouts = useCallback(() => dispatch(getCheckouts({})), [dispatch]);

  useEffect(() => {
    fetchCheckouts();
  }, [dispatch, fetchCheckouts]);

  useFailed(state.getCheckoutsFailed);
  return { ...state, fetchCheckouts };
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

export const useDeleteCheckout = (): DeleteCheckoutHookType => {
  const { t } = useTranslation();
  const state = useAppSelector(selectDeleteCheckoutState);
  const dispatch = useAppDispatch();

  const handleDeleteCheckout = (id: string) => {
    dispatch(deleteCheckout(id));
  };

  const message = t('checkout.checkoutDeletedSuccessfully');

  useSuccess(state.deleteCheckoutSuccess, message);
  useFailed(state.deleteCheckoutFailed);

  return {
    ...state,
    handleDeleteCheckout,
  };
};
