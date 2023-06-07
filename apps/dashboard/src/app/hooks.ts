import { useContext, useEffect, createContext, useRef, useState, useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';
import { breakpoints, PAGING_PARAM } from 'config';
import { LOCALE_WORKSPACE } from './i18n';
import { useSearchParams } from 'react-router-dom';
import { PagingState } from 'types';

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

export const useDebounceCallback = (callback: Function, timeout = 200) => {
  const timeoutRef = useRef<any>(null);

  const handleCallback = (value?: any) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => callback(value), timeout);
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

export const useURLQueryParams = (extraParams?: string[]) => {
  const [searchParams] = useSearchParams();

  const beforeId = searchParams.get('beforeId') ?? undefined;
  const afterId = searchParams.get('afterId') ?? undefined;

  const urlQueryParams = useMemo(() => {
    return (extraParams || []).reduce(
      (params, extraParamKey) => ({
        ...params,
        [extraParamKey]: searchParams.get(extraParamKey),
      }),
      { beforeId, afterId },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beforeId, afterId, searchParams]);

  return urlQueryParams;
};

const { BEFORE_ID, AFTER_ID } = PAGING_PARAM;

export const usePageChange = (pagingState: PagingState) => {
  const [, setSearchParams] = useSearchParams();
  const { nextRequestAfterId, nextRequestBeforeId } = pagingState;

  const onGoNext = () => {
    if (nextRequestAfterId) {
      setSearchParams((params) => {
        params.delete(BEFORE_ID);
        params.set(AFTER_ID, nextRequestAfterId);
        return params;
      });
    }
  };

  const onGoBack = () => {
    if (nextRequestBeforeId) {
      setSearchParams((params) => {
        params.delete(AFTER_ID);
        params.set(BEFORE_ID, nextRequestBeforeId);
        return params;
      });
    }
  };

  const goToFirstPage = () => {
    setSearchParams((params) => {
      params.delete(AFTER_ID);
      params.delete(BEFORE_ID);
      return params;
    });
  };

  return { onGoNext, onGoBack, goToFirstPage };
};
