import { useState, useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch, useFailed, useSuccess, useURLQueryParams } from 'app/hooks';
import {
  getCheckouts,
  getCheckout,
  selectCheckoutListState,
  selectCheckoutState,
  createCheckout,
  selectCreateCheckoutState,
  selectUpdateCheckoutState,
  updateCheckout,
  resetCheckout,
  selectDeleteCheckoutState,
  deleteCheckout,
  selectCheckoutDetailsState,
  getCheckoutDetails,
} from 'features/checkout/checkoutSlice';
import { useTranslation } from 'react-i18next';
import {
  CreateCheckoutHookType,
  UpdateCheckoutHookType,
  DeleteCheckoutHookType,
  CreatingCheckout,
  UpdatingCheckout,
  UseCheckoutsReturnType,
  UseHelpTextReturnType,
} from './types';
import { FormInstance, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import PATHS from 'router/paths';
import { LOCALE_WORKSPACE } from 'app/i18n';
import { getAssetMetadata } from '@atscale/libra-ui';

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

export const useCheckout = (id?: string) => {
  const state = useAppSelector(selectCheckoutState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getCheckout(id));
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

  const handleCreateCheckout = (checkout: CreatingCheckout) => {
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

  const handleUpdateCheckout = (checkout: UpdatingCheckout) => {
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

export const useReInitCheckoutForm = (form: FormInstance, update: Function) => {
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

export const useHelpText = (isError?: boolean): UseHelpTextReturnType => {
  const [shouldShowHelpText, setShouldShowHelpText] = useState<any>();
  const isFieldTouchedRef = useRef<any>(null);

  const form = Form.useFormInstance();

  const onFocus = () => {
    if (!isError) {
      setShouldShowHelpText(true);
      isFieldTouchedRef.current = true;
    }
  };

  const isEmpty = (value: any) => {
    return value === null || value === undefined || value === '';
  };

  const isPriceTooSmall = (value: number) => {
    const assetId = form.getFieldValue(['assetId']);
    const networkId = form.getFieldValue(['networkId']);
    const { decimals } = getAssetMetadata({ assetId, networkId });
    const smallestPrice = 1 / Math.pow(10, decimals);

    return value === 0 || (value && value < smallestPrice);
  };

  const onChange = (value: any, isPriceInput = false) => {
    if (isEmpty(value) || (isPriceInput && isPriceTooSmall(value))) {
      if (shouldShowHelpText) {
        setShouldShowHelpText(false);
      }
    } else {
      if (!shouldShowHelpText) {
        setShouldShowHelpText(true);
      }
    }
  };

  const onBlur = () => {
    if (!isError) {
      setShouldShowHelpText(false);
    }
  };

  return {
    onFocus,
    onChange,
    shouldShowHelpText,
    onBlur,
    setShouldShowHelpText,
  };
};

export const useCheckFieldError = (fieldName: string[]) => {
  const form = Form.useFormInstance();
  const fieldErrors = form.getFieldError(fieldName);

  return !!fieldErrors.length;
};

export const useCheckoutDetails = (id?: string) => {
  const state = useAppSelector(selectCheckoutDetailsState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getCheckoutDetails(id));
    }
  }, [dispatch, id]);

  useFailed(state.getCheckoutDetailsFailed);
  return state;
};
