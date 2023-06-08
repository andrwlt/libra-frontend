import polkadotJsLogo from 'assets/polkadot-js.svg';
import subwalletLogo from 'assets/subwallet-logo.jpeg';
import talismanLogo from 'assets/talisman-logo.png';
import enkryptLogo from 'assets/enkrypt-logo.jpeg';

import { ExtensionId } from '@atscale/libra-ui';

export const getExtensionLogo = (id: ExtensionId) => {
  switch (id) {
    case 'polkadot-js':
      return polkadotJsLogo;

    case 'subwallet-js':
      return subwalletLogo;

    case 'talisman':
      return talismanLogo;

    case 'enkrypt':
      return enkryptLogo;

    default:
      return polkadotJsLogo;
  }
};
