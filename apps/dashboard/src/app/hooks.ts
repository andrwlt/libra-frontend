import { useContext, useEffect, createContext, useRef, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';
import { breakpoints } from 'config';
import { LOCALE_WORKSPACE } from './i18n';

export const NotifyContext = createContext<any>({});

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
}>();

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type ReactToResult = <T extends { message?: string }>(
  result: T,
  customMess?: string | React.MutableRefObject<string>,
  callback?: (success?: T) => any,
) => any;

export const useSuccess: ReactToResult = (success, customMess, callback) => {
  const messageApi = useContext(NotifyContext);

  useEffect(() => {
    if (success) {
      if (customMess) {
        const message = typeof customMess !== 'string' ? customMess.current : customMess;
        messageApi.open({
          type: 'success',
          content: message,
        });
      }

      callback?.(success);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, customMess]);
};

export const useFailed: ReactToResult = (error, customMess, callback) => {
  const messageApi = useContext(NotifyContext);
  const { t } = useTranslation(LOCALE_WORKSPACE.LAYOUT);

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

export const useBreakpoint = () => {
  const [breakpoint, setBreakPoint] = useState('');
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    if (0 < windowSize.width && windowSize.width <= breakpoints.size.lg) {
      setBreakPoint(breakpoints.screen.lg);
    }

    if (windowSize.width > breakpoints.size.lg) {
      setBreakPoint(breakpoints.screen.xl);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [windowSize.width]);

  return breakpoint;
};
