import polkadotJsLogo from 'assets/polkadot-js.svg';

export const EXTENSION_IDS = {
  POLKADOT_JS: 'polkadot-js',
};

export const EXTENSIONS = [
  {
    id: EXTENSION_IDS.POLKADOT_JS,
    name: 'Polkadot.{Js}',
    logo: polkadotJsLogo,
    installURL: 'https://polkadot.js.org/extension/',
  },
];

export const GET_EXTENSIONS_MAX_RETRY = 10;
export const GET_EXTENSIONS_INTERVAL_DURATION = 500;
