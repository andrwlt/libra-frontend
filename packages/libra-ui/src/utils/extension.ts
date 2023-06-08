import { EXTENSIONS, GET_EXTENSIONS_MAX_RETRY, GET_EXTENSIONS_INTERVAL_DURATION } from 'config';
import { Extension, ExtensionId, GetExtensionResult } from 'app/types';

function hasInjectedWeb3() {
  const { ethereum, injectedWeb3 } = window as any;
  return ethereum || injectedWeb3;
}

const hasInjectedWallet = () => {
  const { injectedWeb3 } = window as any;
  return injectedWeb3;
};

const getExtensions = (): Extension[] => {
  const { injectedWeb3 }: any = window;

  const extensions: Extension[] = [];

  EXTENSIONS.forEach((extension) => {
    const extensionInstant = injectedWeb3?.[extension.id];

    if (extensionInstant) {
      extensions.push({ id: extension.id, instant: extensionInstant });
    }
  });

  return extensions;
};

const getExtension = (id: ExtensionId): GetExtensionResult => {
  const extensions = getExtensions();
  return extensions.find((extension) => extension.id === id);
};

const extensionAPI = {
  getExtensions(): Promise<Extension[]> {
    let retryCounter = 0;

    return new Promise((resolve, reject) => {
      const retryInterval = setInterval(() => {
        if (hasInjectedWeb3()) {
          clearInterval(retryInterval);
          const extensions = getExtensions();
          resolve(extensions);
        }

        if (++retryCounter === GET_EXTENSIONS_MAX_RETRY) {
          clearInterval(retryInterval);
          reject(new Error());
        }
      }, GET_EXTENSIONS_INTERVAL_DURATION);
    });
  },

  getExtension(id: ExtensionId): Promise<Extension | undefined> {
    let retryCounter = 0;

    return new Promise((resolve, reject) => {
      const retryInterval = setInterval(() => {
        if (hasInjectedWallet()) {
          clearInterval(retryInterval);
          const extension = getExtension(id);
          resolve(extension);
        }

        if (++retryCounter === GET_EXTENSIONS_MAX_RETRY) {
          clearInterval(retryInterval);
          reject(new Error());
        }
      }, GET_EXTENSIONS_INTERVAL_DURATION);
    });
  },
};

export default extensionAPI;
