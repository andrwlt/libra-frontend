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
  const { t } = useTranslation();
  const state = useAppSelector(selectCreateWebhookState);
  const dispatch = useAppDispatch();

  const handleCreateWebhook = (webhook: WebhookBase) => {
    dispatch(createWebhook(webhook));
  };

  useSuccess(state.createWebhookSuccess, t<string>('webhook.webhookCreatedSuccessfully'), callback);
  useFailed(state.createWebhookFailed);

  return {
    ...state,
    handleCreateWebhook,
  };
};

export const useUpdateWebhook = (callback: () => void): UpdateWebhookHook => {
  const { t } = useTranslation();
  const messageRef = useRef(t('webhook.webhookUpdatedSuccessfully'));

  const state = useAppSelector(selectUpdateWebhookState);
  const dispatch = useAppDispatch();

  const handleUpdateWebhook = (webhook: WebhookResponse, updatedStatus?: boolean) => {
    if (updatedStatus === true) {
      messageRef.current = t('webhook.webhookEnabledSuccessfully');
    }
    if (updatedStatus === false) {
      messageRef.current = t('webhook.webhookDisabledSuccessfully');
    }
    if (updatedStatus === undefined) {
      messageRef.current = t('webhook.webhookUpdatedSuccessfully');
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
  const { t } = useTranslation();
  const state = useAppSelector(selectDeleteWebhookState);
  const dispatch = useAppDispatch();

  const handleDeleteWebhook = (id: string) => {
    dispatch(deleteWebhook(id));
  };

  const message = t('webhook.webhookDeletedSuccessfully');

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
