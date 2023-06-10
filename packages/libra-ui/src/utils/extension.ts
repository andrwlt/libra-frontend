import { EXTENSIONS, GET_EXTENSIONS_MAX_RETRY, GET_EXTENSIONS_INTERVAL_DURATION } from 'config';
import { Extension } from 'app/types';

function hasInjectedWeb3() {
  const { injectedWeb3 } = window as any;
  return injectedWeb3;
}

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
};

export default extensionAPI;
