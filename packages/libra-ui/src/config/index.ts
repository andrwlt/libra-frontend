import { Network, AssetConfig, ExtensionConfig } from 'app/types';

export const EXTENSION_IDS = {
  POLKADOT_JS: 'polkadot-js',
  METAMASK: 'METAMASK',
};

export const EXTENSIONS: ExtensionConfig[] = [
  {
    id: 'polkadot-js',
    name: 'Polkadot.{Js}',
    installURL: 'https://polkadot.js.org/extension/',
  },
  {
    id: 'subwallet-js',
    name: 'SubWallet',
    installURL: 'https://www.subwallet.app/download.html',
  },
  {
    id: 'talisman',
    name: 'Talisman',
    installURL: 'https://www.talisman.xyz',
  },

  {
    id: 'enkrypt',
    name: 'Enkrypt',
    installURL: 'enkrypt.com',
  },
];

export const NETWORKS_CONFIG: Network[] = [
  {
    id: 'nw_polkadot',
    name: 'Polkadot',
    type: 'substrate',
    rpc: 'wss://apps-rpc.polkadot.io',
    config: {
      ss58Prefix: 0,
    },
  },

  {
    id: 'nw_kusama',
    name: 'Kusama',
    type: 'substrate',
    rpc: 'wss://kusama-rpc.polkadot.io',
    config: {
      ss58Prefix: 2,
    },
  },
];

export const ASSETS_CONFIG: AssetConfig[] = [
  {
    id: 'ast_dot',
    symbol: 'dot',
    name: 'Polkadot',
    decimals: 10,
    logoUrl: 'https://avatars.githubusercontent.com/u/33775474?s=200&v=4',
    networks: [
      {
        networkId: 'nw_polkadot',
        config: {
          isNative: true,
        },
      },
    ],
  },
  {
    id: 'ast_ksm',
    symbol: 'ksm',
    name: 'Kusama',
    decimals: 12,
    logoUrl: 'https://raw.githubusercontent.com/paritytech/polkadot-staking-dashboard/master/src/img/kusama_icon.svg',
    networks: [
      {
        networkId: 'nw_kusama',
        config: {
          isNative: true,
        },
      },
    ],
  },
  {
    id: 'ast_wnd',
    symbol: 'wnd',
    name: 'Westend',
    decimals: 12,
    logoUrl: 'https://raw.githubusercontent.com/paritytech/polkadot-staking-dashboard/master/src/img/westend_icon.svg',
    networks: [
      {
        networkId: 'nw_westend',
        config: {
          isNative: true,
        },
      },
    ],
  },
];

export const GET_EXTENSIONS_MAX_RETRY = 10;
export const GET_EXTENSIONS_INTERVAL_DURATION = 500;
