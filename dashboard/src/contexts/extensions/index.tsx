import React, { useEffect, useState } from 'react';
import { EXTENSIONS } from 'config';
import { ExtensionConfig, Extension, ExtensionsContextInterface } from './types';

const defaultExtensionsContext = {
  extensions: [],
  isReady: false,
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
  const [isReady, setIsReady] = useState(false);

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
      }}
    >
      {children}
    </ExtensionsContext.Provider>
  );
};
