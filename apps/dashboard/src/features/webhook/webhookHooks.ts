import { useEffect, useCallback, useRef } from 'react';
import { useAppSelector, useAppDispatch, useFailed, useSuccess } from 'app/hooks';
import {
  selectWebhookListState,
  selectCreateWebhookState,
  getWebhooks,
  createWebhook,
  selectUpdateWebhookState,
  updateWebhook,
  deleteWebhook,
  selectDeleteWebhookState,
  resetWebhook,
  selectFirstLoadState,
} from './webhookSlice';
import {
  CreateWebhookHook,
  WebhookBase,
  WebhookResponse,
  WebhooksHookType,
  UpdateWebhookHook,
  DeleteWebhookHook,
} from './types';
import { useTranslation } from 'react-i18next';
import { LOCALE_WORKSPACE } from 'app/i18n';

export const useWebhooks = (): WebhooksHookType => {
  const state = useAppSelector(selectWebhookListState);
  const dispatch = useAppDispatch();

  const fetchWebhooks = useCallback((param = {}) => dispatch(getWebhooks(param)), [dispatch]);

  useEffect(() => {
    fetchWebhooks();
  }, [dispatch, fetchWebhooks]);

  useFailed(state.getWebhooksFailed);
  return { ...state, fetchWebhooks };
};

export const useCreateWebhook = (callback: () => void): CreateWebhookHook => {
  const { t } = useTranslation(LOCALE_WORKSPACE.WEBHOOK);
  const state = useAppSelector(selectCreateWebhookState);
  const dispatch = useAppDispatch();

  const handleCreateWebhook = (webhook: WebhookBase) => {
    dispatch(createWebhook(webhook));
  };

  useSuccess(state.createWebhookSuccess, t<string>('webhookCreatedSuccessfully'), callback);
  useFailed(state.createWebhookFailed);

  return {
    ...state,
    handleCreateWebhook,
  };
};

export const useUpdateWebhook = (callback: () => void): UpdateWebhookHook => {
  const { t } = useTranslation(LOCALE_WORKSPACE.WEBHOOK);
  const messageRef = useRef(t('webhookUpdatedSuccessfully'));

  const state = useAppSelector(selectUpdateWebhookState);
  const dispatch = useAppDispatch();

  const handleUpdateWebhook = (webhook: WebhookResponse, updatedStatus?: boolean) => {
    if (updatedStatus === true) {
      messageRef.current = t('webhookEnabledSuccessfully');
    }
    if (updatedStatus === false) {
      messageRef.current = t('webhookDisabledSuccessfully');
    }
    if (updatedStatus === undefined) {
      messageRef.current = t('webhookUpdatedSuccessfully');
    }

    dispatch(updateWebhook(webhook));
  };

  useSuccess(state.updateWebhookSuccess, messageRef, callback);
  useFailed(state.updateWebhookFailed);

  return {
    ...state,
    handleUpdateWebhook,
  };
};

export const useDeleteWebhook = (callback: () => void): DeleteWebhookHook => {
  const { t } = useTranslation(LOCALE_WORKSPACE.WEBHOOK);
  const state = useAppSelector(selectDeleteWebhookState);
  const dispatch = useAppDispatch();

  const handleDeleteWebhook = (id: string) => {
    dispatch(deleteWebhook(id));
  };

  const message = t('webhookDeletedSuccessfully');

  useSuccess(state.deleteWebhookSuccess, message, callback);
  useFailed(state.deleteWebhookFailed);

  return {
    ...state,
    handleDeleteWebhook,
  };
};

export const useResetWebhook = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetWebhook());
    };
  }, [dispatch]);
};

export const useFirstLoad = () => {
  const isFirstLoad = useAppSelector(selectFirstLoadState);
  return isFirstLoad;
};
