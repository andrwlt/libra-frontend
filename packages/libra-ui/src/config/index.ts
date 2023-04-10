import { AssetMetadata } from '../app/types';

export const APP_NAME = 'libra-checkout';

export const ASSET_METADATA: Record<string, AssetMetadata> = {
  dot: {
    decimals: 10,
    symbol: 'DOT',
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png',
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
    logo: 'https://raw.githubusercontent.com/paritytech/polkadot-staking-dashboard/master/src/img/kusama_icon.svg',
    network: {
      name: 'Kusama',
      type: 'substrate',
      config: {
        ss58Prefix: 2,
        rpc: 'wss://apps-rpc.polkadot.io',
      },
    },
  },
  wnd: {
    decimals: 12,
    symbol: 'WND',
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
