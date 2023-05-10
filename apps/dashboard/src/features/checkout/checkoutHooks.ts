import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch, useFailed, useSuccess, useURLQueryParams } from 'app/hooks';
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
import { useTranslation } from 'react-i18next';
import {
  CreateCheckoutHookType,
  UpdateCheckoutHookType,
  DeleteCheckoutHookType,
  CreatingCheckoutType,
  UpdatingCheckoutType,
  CheckoutDetailsState,
  UseCheckoutsReturnType,
  UseHelpTextReturnType,
} from './types';
import { FormInstance } from 'antd';
import { useNavigate } from 'react-router-dom';
import PATHS from 'router/paths';
import { LOCALE_WORKSPACE } from 'app/i18n';

export const useResetCheckout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetCheckout());
    };
  }, [dispatch]);
};

export const useCheckouts = (): UseCheckoutsReturnType => {
  const params = useURLQueryParams();
  const state = useAppSelector(selectCheckoutListState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCheckouts(params));
  }, [dispatch, params]);

  const refreshCurrentPage = () => {
    dispatch(getCheckouts(params));
  };

  useFailed(state.getCheckoutsFailed);
  return { ...state, refreshCurrentPage };
};

export const useCheckout = (id?: string): CheckoutDetailsState => {
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
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);
  const state = useAppSelector(selectCreateCheckoutState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreateCheckout = (checkout: CreatingCheckoutType) => {
    dispatch(createCheckout(checkout));
  };

  const successMess = onboardingMode ? '' : t('checkoutCreatedSuccessfully');
  const successCallback = onboardingMode ? () => {} : () => navigate(PATHS.checkout.root);

  useSuccess(state.createCheckoutSuccess, successMess, successCallback);
  useFailed(state.createCheckoutFailed);

  return {
    ...state,
    handleCreateCheckout,
  };
};

export const useUpdateCheckout = (): UpdateCheckoutHookType => {
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);
  const state = useAppSelector(selectUpdateCheckoutState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleUpdateCheckout = (checkout: UpdatingCheckoutType) => {
    dispatch(updateCheckout(checkout));
  };

  const message = t('checkoutUpdatedSuccessfully');

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

export const useDeleteCheckout = (callback: () => void): DeleteCheckoutHookType => {
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);
  const state = useAppSelector(selectDeleteCheckoutState);
  const dispatch = useAppDispatch();

  const handleDeleteCheckout = (id: string) => {
    dispatch(deleteCheckout(id));
  };

  const message = t('checkoutDeletedSuccessfully');

  useSuccess(state.deleteCheckoutSuccess, message, callback);
  useFailed(state.deleteCheckoutFailed);

  return {
    ...state,
    handleDeleteCheckout,
  };
};

export const useHelpText = (): UseHelpTextReturnType => {
  const [shouldShowHelpText, setShouldShowHelpText] = useState<any>();

  const onFocus = () => {
    if (shouldShowHelpText === undefined) {
      setShouldShowHelpText(true);
    }
  };

  const onChange = () => {
    setShouldShowHelpText(false);
  };

  return {
    onFocus,
    onChange,
    shouldShowHelpText,
  };
};
