import { Network, AssetConfig, ExtensionConfig } from 'app/types';
import { StatemintAssetTransfer } from './extrinsics';

export const EXTENSIONS: ExtensionConfig[] = [
  {
    id: 'polkadot-js',
    name: 'Polkadot.{Js}',
    installURL: 'https://polkadot.js.org/extension/',
    logo: 'https://avatars.githubusercontent.com/u/33775474?s=280&v=4',
  },
  {
    id: 'subwallet-js',
    name: 'SubWallet',
    installURL: 'https://www.subwallet.app/download.html',
    logo: 'https://1570604715-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-Lh39Kwxa1xxZM9WX_Bs%2Ficon%2FiETEgi1ykXUQRW63vPnL%2FLogo%3DWhite%2C%20Background%3DGradient.jpg?alt=media&token=46c5dafa-ce09-4576-bcd9-a5c796786f1a',
  },
  {
    id: 'talisman',
    name: 'Talisman',
    installURL: 'https://www.talisman.xyz',
    logo: 'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/vsgo8bn1iof4ryzk3gkf',
  },
];

export const NETWORKS_CONFIG: Network[] = [
  {
    id: 'nw_polkadot',
    name: 'Polkadot',
    type: 'substrate',
    logoUrl: 'https://files.libra.atscale.xyz/file_01H3KVQANXKGZAT7249XNR60CN',
    rpc: 'wss://apps-rpc.polkadot.io',
    config: {
      ss58Prefix: 0,
    },
  },
  {
    id: 'nw_statemint',
    name: 'Polkadot Asset Hub',
    logoUrl: 'https://files.libra.atscale.xyz/file_01H3V843RZK7G9EVQN3HGY5TRM',
    type: 'substrate',
    rpc: 'wss://polkadot-asset-hub-rpc.polkadot.io',
    config: {
      ss58Prefix: 0,
    },
  },
  {
    id: 'nw_kusama',
    name: 'Kusama',
    logoUrl: 'https://raw.githubusercontent.com/paritytech/polkadot-staking-dashboard/master/src/img/kusama_icon.svg',
    type: 'substrate',
    rpc: 'wss://kusama-rpc.polkadot.io',
    config: {
      ss58Prefix: 2,
    },
  },
  {
    id: 'nw_westendmint',
    name: 'Westend Asset Hub',
    logoUrl: 'https://files.libra.atscale.xyz/file_01H3V843RZK7G9EVQN3HGY5TRM',
    type: 'substrate',
    rpc: 'wss://westmint-rpc-tn.dwellir.com',
    config: {
      ss58Prefix: 42,
    },
  },
];

export const ASSETS_CONFIG: AssetConfig[] = [
  {
    id: 'ast_dot',
    symbol: 'dot',
    name: 'Polkadot',
    decimals: 10,
    logoUrl: 'https://files.libra.atscale.xyz/file_01H3KVQANXKGZAT7249XNR60CN',
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
  {
    id: 'ast_usdt',
    symbol: 'usdt',
    name: 'USDT',
    decimals: 6,
    logoUrl: 'https://files.libra.atscale.xyz/file_01H3KT8SM33882ADRJACER8TMJ',
    networks: [
      {
        networkId: 'nw_statemint',
        config: {
          isNative: false,
          tokenId: 1984,
          transferMethod: StatemintAssetTransfer,
        },
      },
    ],
  },
  {
    id: 'ast_lusd',
    symbol: 'lusd',
    name: 'Libra USD',
    decimals: 6,
    logoUrl: 'https://files.libra.atscale.xyz/file_01H3KT8SM33882ADRJACER8TMJ',
    networks: [
      {
        networkId: 'nw_westendmint',
        config: {
          isNative: false,
          tokenId: 1995,
          transferMethod: StatemintAssetTransfer,
        },
      },
    ],
  },
];

export const GET_EXTENSIONS_MAX_RETRY = 10;
export const GET_EXTENSIONS_INTERVAL_DURATION = 500;
