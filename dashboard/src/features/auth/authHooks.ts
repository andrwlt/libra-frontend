import { useEffect } from 'react';
import { useAppSelector, useAppDispatch, useFailed } from 'app/hooks';
import {
  connectExtension,
  getExtensions,
  login,
  selectExtensionsState,
  selectConnectExtensionState,
  selectLoginState,
  logout,
  selectAuthHookState,
  resetStore,
  resetLoginState
} from './authSlice';
import { LoginHook, ConnectExtensionState, AuthHookState, AccountType } from './types';
import { EXTENSION_IDS } from 'config';

export const useExtensions = (revalidate: boolean = false) => {
  const state = useAppSelector(selectExtensionsState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!state.extensions.length || revalidate) {
      dispatch(getExtensions());
    }
  }, [dispatch, revalidate, state.extensions.length]);

  useFailed(state.getExtensionsFailed);

  return state;
};

export const useLogin = (): LoginHook => {
  const state = useAppSelector(selectLoginState);

  const dispatch = useAppDispatch();

  const handleLogin = async (account: AccountType) => {
    await dispatch(login(account));
  };

  useFailed(state.loginFailed);

  useEffect(() => {
    return () => {
      dispatch(resetLoginState());
    };
  }, [dispatch]);

  return { ...state, handleLogin };
};

export const useAuth = (): AuthHookState => {
  const state = useAppSelector(selectAuthHookState);
  return state;
};

export const useConnectExtension = (revalidate: boolean = false): ConnectExtensionState => {
  const state = useAppSelector(selectConnectExtensionState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if ((!state.connectedExtension || revalidate) && !state.connectExtensionLoading) {
      dispatch(connectExtension(EXTENSION_IDS.POLKADOT_JS));
    }
  }, [dispatch, revalidate, state.connectedExtension, state.connectExtensionLoading]);

  useFailed(state.connectExtensionFailed);

  return state;
};

export const useLogout = (): (() => void) => {
  const dispatch = useAppDispatch();

  return () => {
    dispatch(logout());
    dispatch(resetStore());
  };
};
