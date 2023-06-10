import { Extension, ConnectedExtension, Account } from '@atscale/libra-ui';
import { AxiosPromise } from 'axios';

export interface ExtensionsContextInterface {
  extensions: Extension[];
  isReady: boolean;
  connectExtension: (name: string) => Promise<void>;
  isConnecting: boolean;
  connectedExtension: ConnectedExtension | null;
}

export interface ExtensionState {
  extensions: any[];
  getExtensionsLoading: boolean;
  getExtensionsFailed: any;
}

export interface ConnectExtensionState {
  connectedExtension?: ConnectedExtension;
  connectExtensionLoading: boolean;
  connectExtensionFailed: any;
}

export interface ConnectExtensionHook extends ConnectExtensionState {
  handleConnectExtension: () => void;
}

export interface LoginState {
  loginLoading: boolean;
  loginFailed: any;
  loginSuccess: any;
}

export interface LoginHook extends LoginState {
  handleLogin: (account: Account) => Promise<void>;
}

export interface AuthPersitState {
  token: string | undefined;
  libraConnectedAccount?: Account;
  refreshToken: undefined | string;
}

export interface AuthHookState {
  token: string | undefined;
  loginLoading: boolean;
  account?: Account;
}

export interface AuthAPI {
  getSignature(extension: ConnectedExtension, address: string): Promise<any>;
  signIn(data: LoginPayload): AxiosPromise;
  getExtensions(): Promise<Extension[]>;
}

export interface LoginPayload {
  signature: string;
  address: string;
  message: string;
  addressType: 'evm' | 'substrate';
}
