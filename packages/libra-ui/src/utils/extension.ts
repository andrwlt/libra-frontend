import { EXTENSION_IDS, GET_EXTENSIONS_MAX_RETRY, GET_EXTENSIONS_INTERVAL_DURATION } from 'config';
import { Extension, ExtensionId, GetExtensionResult } from 'app/types';

function hasInjectedWeb3() {
  const { ethereum, injectedWeb3 } = window as any;
  return ethereum || injectedWeb3;
}

const hasInjectedWallet = (id: ExtensionId) => {
  const { ethereum, injectedWeb3 } = window as any;

  if (id === 'METAMASK') return ethereum;
  if (id === 'polkadot-js') return injectedWeb3;
};

const getExtensions = (): Extension[] => {
  const { injectedWeb3, ethereum }: any = window;

  const extensions: Extension[] = [];

  const polkadot = injectedWeb3?.[EXTENSION_IDS.POLKADOT_JS];
  if (injectedWeb3) {
    extensions.push({ id: 'polkadot-js', instant: polkadot });
  }

  if (ethereum) {
    extensions.push({ id: 'METAMASK', instant: ethereum });
  }

  return extensions;
};

const getExtension = (id: ExtensionId): GetExtensionResult => {
  const { injectedWeb3, ethereum }: any = window;

  if (id === 'polkadot-js') {
    const polkadot = injectedWeb3?.[EXTENSION_IDS.POLKADOT_JS];
    return { id: 'polkadot-js', instant: polkadot };
  }

  if (id === 'METAMASK') {
    return { id: 'METAMASK', instant: ethereum };
  }
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
        if (hasInjectedWallet(id)) {
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
