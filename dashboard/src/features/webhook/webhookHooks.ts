import { useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch, useFailed } from 'app/hooks';
import { selectWebhookListState, getWebhooks } from './webhookSlice';
import { WebhooksHookType } from './types';

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
