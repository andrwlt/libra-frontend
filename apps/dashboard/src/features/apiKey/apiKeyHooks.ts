import { useEffect } from 'react';
import { useAppSelector, useAppDispatch, useFailed, useSuccess, useURLQueryParams } from 'app/hooks';
import {
  selectAPIKeyListState,
  selectCreateAPIKeyState,
  getAPIKeys,
  createAPIKey,
  selectUpdateAPIKeyState,
  updateAPIKey,
  deleteAPIKey,
  selectDeleteAPIKeyState,
  resetAPIKey,
  selectFirstLoadState,
  resetFirstLoad,
} from './apiKeySlice';
import { BaseAPIKey, APIKey } from './types';
import { useTranslation } from 'react-i18next';
import { LOCALE_WORKSPACE } from 'app/i18n';

export const useAPIKeys = () => {
  const params = useURLQueryParams();
  const state = useAppSelector(selectAPIKeyListState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAPIKeys(params));
  }, [dispatch, params]);

  const refreshCurrentPage = () => {
    dispatch(getAPIKeys(params));
  };

  useFailed(state.getAPIKeysFailed);
  return { ...state, refreshCurrentPage };
};

export const useCreateAPIKey = (callback: () => void) => {
  const { t } = useTranslation(LOCALE_WORKSPACE.API_KEY);
  const state = useAppSelector(selectCreateAPIKeyState);
  const dispatch = useAppDispatch();

  const handleCreateAPIKey = (apiKey: BaseAPIKey) => {
    dispatch(createAPIKey(apiKey));
  };

  useSuccess(state.createAPIKeySuccess, t<string>('apiKeyCreatedSuccessfully'), callback);
  useFailed(state.createAPIKeyFailed);

  return {
    ...state,
    handleCreateAPIKey,
  };
};

export const useUpdateAPIKey = (callback: () => void) => {
  const { t } = useTranslation(LOCALE_WORKSPACE.API_KEY);

  const state = useAppSelector(selectUpdateAPIKeyState);
  const dispatch = useAppDispatch();

  const handleUpdateAPIKey = (apiKey: APIKey) => {
    dispatch(updateAPIKey(apiKey));
  };

  useSuccess(state.updateAPIKeySuccess, t('apiKeyUpdatedSuccessfully') as string, callback);
  useFailed(state.updateAPIKeyFailed);

  return {
    ...state,
    handleUpdateAPIKey,
  };
};

export const useDeleteAPIKey = (callback: () => void) => {
  const { t } = useTranslation(LOCALE_WORKSPACE.API_KEY);
  const state = useAppSelector(selectDeleteAPIKeyState);
  const dispatch = useAppDispatch();

  const handleDeleteAPIKey = (id: string) => {
    dispatch(deleteAPIKey(id));
  };

  const message = t('apiKeyDeletedSuccessfully');

  useSuccess(state.deleteAPIKeySuccess, message, callback);
  useFailed(state.deleteAPIKeyFailed);

  return {
    ...state,
    handleDeleteAPIKey,
  };
};

export const useResetAPIKey = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetAPIKey());
    };
  }, [dispatch]);
};

export const useAPIKeyFirstLoad = () => {
  const isAPIKeyFirstLoad = useAppSelector(selectFirstLoadState);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    return () => {
      dispatch(resetFirstLoad());
    };
  }, [dispatch]);

  return isAPIKeyFirstLoad;
};
