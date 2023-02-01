import React, { useEffect, useState } from 'react';
import { EXTENSIONS, APP_NAME } from 'config';
import { ExtensionConfig, Extension, ConnectedExtension, ExtensionsContextInterface } from './types';
import { message } from 'antd';

const defaultExtensionsContext = {
  extensions: [],
  isReady: false,
  isConnecting: false,
  connectExtension: async () => {},
  connectedExtension: null,
};

const MAX_RETRY = 10;

export const ExtensionsContext =
  React.createContext<ExtensionsContextInterface>(defaultExtensionsContext);

export const useExtensions = () => React.useContext(ExtensionsContext);

function hasInjectedWeb3() {
  return !!(window as any).injectedWeb3;
}

function getExtensions(): Extension[] {
  const { injectedWeb3 }: any = window;
  const extensions: Extension[] = [];

  if (!injectedWeb3) {
    return [];
  }

  EXTENSIONS.forEach((config: ExtensionConfig) => {
    if (injectedWeb3[config.id]) {
      extensions.push({
        ...config,
        ...injectedWeb3[config.id],
      });
    }
  });

  return extensions;
}

export const ExtensionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [extensions, setExtensions] = useState<Extension[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedExtension, setConnectedExtension] = useState<null | ConnectedExtension>(null);
  const [isReady, setIsReady] = useState(false);

  const connectExtension = async (extensionId: string): Promise<null | any> => {
    setIsConnecting(true);

    if (isReady) {
      const extension = extensions.find(ext => ext.id === extensionId);

      if (extension) {
        try {
          const connection = await extension.enable(APP_NAME);
          const accounts = await connection.accounts.get();
          setConnectedExtension({
            ...extension,
            accounts,
            signer: connection.signer,
          });
        } catch (err) {
          message.error(`${err}`);
        }
      }
    }

    setIsConnecting(false);
  };

  // Retry until the extensions is injected to browser
  let retryCounter = 0;
  let retryInterval: ReturnType<typeof setInterval>;

  useEffect(() => {
    retryInterval = setInterval(() => {
      if (hasInjectedWeb3()) {
        setExtensions(getExtensions());
        setIsReady(true);
        clearInterval(retryInterval);
      }

      if (++retryCounter === MAX_RETRY) {
        setIsReady(true);
        clearInterval(retryInterval);
      }
    }, 500);

    return () => clearInterval(retryInterval);
  }, []);

  return (
    <ExtensionsContext.Provider
      value={{
        extensions,
        isReady,
        connectExtension,
        isConnecting,
        connectedExtension,
      }}
    >
      {children}
    </ExtensionsContext.Provider>
  );
};
