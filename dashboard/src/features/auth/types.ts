import { AxiosPromise } from 'axios';

export interface AccountType {
  address: string;
  genesisHash: string;
  name: string;
  type: string;
}

export interface ExtensionConfig {
  id: string;
  name: string;
  logo: string;
  installURL: string;
}

export interface Extension extends ExtensionConfig {
  enable: (appName: string) => Promise<any>;
  accounts?: AccountType[];
}

export interface ConnectedExtension extends ExtensionConfig {
  signer: any;
  accounts: AccountType[];
}

export interface ExtensionsContextInterface {
  extensions: Extension[];
  isReady: boolean;
  connectExtension: (name: string) => Promise<void>;
  isConnecting: boolean;
  connectedExtension: ConnectedExtension | null;
}

export interface ExtensionState {
  extensions: Extension[];
  getExtensionsLoading: boolean;
  getExtensionsFailed: any;
}

export interface ConnectExtensionState {
  connectedExtension: ConnectedExtension | any;
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
  handleLogin: (account: AccountType) => Promise<void>;
}

export interface AuthPersitState {
  accountDictionary: {
    [accountAddress: string]: string;
  };
  libraConnectedAccount: any;
}

export interface AuthHookState {
  token: string | undefined;
  loginLoading: boolean;
  account: any;
}

export interface AuthAPI {
  getSignater(extension: ConnectedExtension, address: string): Promise<any>;
  signIn(data: LoginPayload): AxiosPromise;
  getExtensions(): Promise<any>;
}

export interface LoginPayload {
  signature: string;
  address: string;
  message: string;
}
