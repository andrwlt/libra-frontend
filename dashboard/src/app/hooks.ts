import { useContext, useEffect, createContext, useRef } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';

export const NotifyContext = createContext<any>({});

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
}>();

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type ReactToResult = <T extends { message?: string }>(
  result: T,
  customMess?: string,
  callback?: (success?: T) => any,
) => any;

export const useSuccess: ReactToResult = (success, customMess, callback) => {
  const messageApi = useContext(NotifyContext);

  useEffect(() => {
    if (success) {
      if (customMess) {
        messageApi.open({
          type: 'success',
          content: customMess,
        });
      }

      callback?.(success);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, customMess]);
};

export const useFailed: ReactToResult = (error, customMess, callback) => {
  const messageApi = useContext(NotifyContext);
  const { t } = useTranslation();

  useEffect(() => {
    if (error) {
      messageApi.open({
        type: 'error',
        content: customMess || error?.message || t('defaultErrorMessage'),
      });
      callback?.(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);
};

export const useDeboundCallback = (callback: Function, timeout = 200) => {
  const timeoutRef = useRef<any>(null);

  const handleCallback = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(callback, timeout);
  };

  return handleCallback;
};
