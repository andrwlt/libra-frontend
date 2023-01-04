import { AssetMetadata } from 'types';
export * from './extensions';
export * from './network';

export const APP_NAME = 'Libra Checkout';

export const ASSET_METADATA: Record<string, AssetMetadata>  = {
  DOT: {
    decimals: 10,
    symbol: 'dot',
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png',
  },
  WND: {
    decimals: 12,
    symbol: 'WND',
    logo: 'https://polkadot.js.org/apps/static/westend_colour.eb7969da..svg',
  },
}