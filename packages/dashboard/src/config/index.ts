import { AssetMetadata } from 'types';
export * from './extensions';
export * from './network';

export const APP_NAME = 'Libra Checkout';
export const CONNECTED_ACCOUNT = 'libra-connected-account';

export const ASSET_METADATA: Record<string, AssetMetadata> = {
  dot: {
    decimals: 10,
    symbol: 'DOT',
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png',
  },
  wnd: {
    decimals: 12,
    symbol: 'WND',
    logo: 'https://raw.githubusercontent.com/paritytech/polkadot-staking-dashboard/master/src/img/westend_icon.svg',
  },
};

export const LOGIN_MESSAGE = 'libra-checkout-login';
export const DEFAULT_LIMIT = 10;

export const PAYMENT_STATUS = {
  SUCCEEDED: 'succeeded',
  PENDING: 'pending',
  FAILED: 'failed',
};

export const NULL_VALUE = 'null';

const size = {
  lg: 1200,
  aboveLg: 1300,
  xl: 1680,
};

const device = {
  aboveLg: `(max-width: ${size.aboveLg}px)`,
  lg: `(max-width: ${size.lg}px)`,
};

export const breakpoints = {
  size,
  device,
  screen: {
    xl: 'XL',
    lg: 'LG',
  },
};
