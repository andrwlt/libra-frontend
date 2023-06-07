import { EXTENSION_IDS } from '@atscale/libra-ui';

const { POLKADOT_JS, METAMASK } = EXTENSION_IDS;

export const WALLET_TYPES: { [key: string]: 'substrate' | 'evm' } = {
  [POLKADOT_JS]: 'substrate',
  [METAMASK]: 'evm',
};

export const GET_EXTENSIONS_MAX_RETRY = 10;
export const GET_EXTENSIONS_INTERVAL_DURATION = 500;
