import { AssetMetadata } from '../app/types';

export const APP_NAME = 'libra-checkout';

export const ASSET_METADATA: Record<string, AssetMetadata> = {
  dot: {
    decimals: 10,
    symbol: 'DOT',
    code: 'dot',
    logo: 'https://raw.githubusercontent.com/paritytech/polkadot-staking-dashboard/master/src/img/dot_icon.svg',
    network: {
      name: 'Polkadot',
      type: 'substrate',
      config: {
        ss58Prefix: 0,
        rpc: 'wss://apps-rpc.polkadot.io',
      },
    },
  },
  ksm: {
    decimals: 12,
    symbol: 'KSM',
    code: 'ksm',
    logo: 'https://raw.githubusercontent.com/paritytech/polkadot-staking-dashboard/master/src/img/kusama_icon.svg',
    network: {
      name: 'Kusama',
      type: 'substrate',
      config: {
        ss58Prefix: 2,
        rpc: 'wss://kusama-rpc.polkadot.io',
      },
    },
  },
  wnd: {
    decimals: 12,
    symbol: 'WND',
    code: 'wnd',
    logo: 'https://raw.githubusercontent.com/paritytech/polkadot-staking-dashboard/master/src/img/westend_icon.svg',
    network: {
      name: 'Westend',
      type: 'substrate',
      config: {
        ss58Prefix: 42,
        rpc: 'wss://westend-rpc.polkadot.io',
      },
    },
  },
};

export const EXTENSIONS = [
  {
    id: 'polkadot-js',
    name: 'Polkadot.{Js}',
    installURL: 'https://polkadot.js.org/extension/',
  },
];
