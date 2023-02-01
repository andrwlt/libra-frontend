export interface ExtensionConfig {
  id: string;
  name: string;
  logo: string;
  installURL: string;
}

export interface Extension extends ExtensionConfig {
  enable: (appName: string) => Promise<any>;
  accounts?: any;
}

export interface ConnectedExtension extends ExtensionConfig {
  signer: any;
  accounts: any[];
}

export interface ExtensionsContextInterface {
  extensions: Extension[];
  isReady: boolean;
  connectExtension: (name: string) => Promise<void>;
  isConnecting: boolean;
  connectedExtension: ConnectedExtension | null;
}
