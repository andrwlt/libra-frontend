import React, { useEffect, useState } from 'react';
import { EXTENSIONS } from 'config';
import { ExtensionConfig, Extension, ExtensionsContextInterface } from './types';

const defaultExtensionsContext = {
  extensions: [],
};

export const ExtensionsContext = React.createContext<ExtensionsContextInterface>(defaultExtensionsContext);

export const useExtensions = () => React.useContext(ExtensionsContext);

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
};

export const ExtensionsProvider = ({children}: {
  children: React.ReactNode;
}) => {
  const [extensions, setExtensions] = useState<Extension[]>([]);

  useEffect(() => {
    setExtensions(getExtensions());
  }, []);

  return (
    <ExtensionsContext.Provider value={{
      extensions,
    }}>
      { children }
    </ExtensionsContext.Provider>
  )
}
