import { useEffect, useMemo } from 'react';
import { useAppSelector, useAppDispatch, useFailed, useSuccess } from 'app/hooks';
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
  resetConnectedExtension,
} from './authSlice';
import { LoginHook, ConnectExtensionHook, AuthHookState } from './types';
import { Network, getWalletNetworks, Account, Extension } from '@atscale/libra-ui';

export const useExtensions = (revalidate: boolean = false) => {
  const state = useAppSelector(selectExtensionsState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (revalidate) {
      dispatch(getExtensions());
    }
  }, [dispatch, revalidate, state.extensions.length]);

  const installedExtensions: { [key: string]: Extension } = useMemo(() => {
    return state.extensions.reduce(
      (dict, extension) => ({
        ...dict,
        [extension.id]: extension,
      }),
      {},
    );
  }, [state.extensions]);

  return { ...state, installedExtensions };
};

export const useLogin = (): LoginHook => {
  const state = useAppSelector(selectLoginState);

  const dispatch = useAppDispatch();

  const handleLogin = async (account: Account) => {
    await dispatch(login(account));
  };

  useFailed(state.loginFailed);

  return { ...state, handleLogin };
};

export const useAuth = (): AuthHookState => {
  const state = useAppSelector(selectAuthHookState);
  return state;
};

export const useConnectExtension1 = (onConnected: () => void): ConnectExtensionHook => {
  const state = useAppSelector(selectConnectExtensionState);
  const dispatch = useAppDispatch();

  const handleConnectExtension = () => {
    dispatch(connectExtension('polkadot-js'));
  };

  useSuccess(state.connectedExtension as any, '', onConnected);

  useFailed(state.connectExtensionFailed);

  return { ...state, handleConnectExtension };
};

export const useConnectExtension = () => {
  const state = useAppSelector(selectConnectExtensionState);
  const dispatch = useAppDispatch();

  const handleConnectExtension = (extensionId: string) => {
    dispatch(connectExtension(extensionId));
  };

  useFailed(state.connectExtensionFailed);

  return { ...state, handleConnectExtension };
};

export const useResetConnectedExtension = (open: boolean) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!open) {
      dispatch(resetConnectedExtension());
    }
  }, [dispatch, open]);
};

export const useLogout = (): (() => void) => {
  const dispatch = useAppDispatch();

  return () => {
    dispatch(logout());
    dispatch(resetStore());
  };
};

export const useNetworks = (): Network[] => {
  const { account } = useAppSelector(selectAuthHookState);

  const networks = useMemo(() => {
    if (!account) {
      return [];
    }


    return getWalletNetworks();
  }, [account]);

  return networks;
};
