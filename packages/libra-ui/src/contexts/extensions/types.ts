export interface Account {
  address: string;
  name: string;
  singer?: any;
}

export interface ExtensionConfig {
  id: string;
  name: string;
  installURL: string;
}

export interface Extension extends ExtensionConfig {
  enable: (appName: string) => Promise<any>;
  accounts?: any;
}

export interface ExtensionsContextInterface {
  extensions: Extension[];
  isReady: boolean;
}