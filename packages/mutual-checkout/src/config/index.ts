import { AssetMetadata } from '../app/types';

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
