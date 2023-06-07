import { Asset, getNetwork } from '@atscale/libra-ui';
import PolkadotNetWorkIcon from 'assets/polkadot-network.svg';
import KusamaNetWorkIcon from 'assets/kusama-network.svg';
import PolygonNetWorkIcon from 'assets/polygon-network.svg';

export const saveConnectedExtension = (extensionId: string): void => {
  localStorage.setItem(extensionId, 'connected');
};

export const isExtensionConnected = (extensionId?: string): boolean => {
  if (!extensionId) return false;
  const isConnected = localStorage.getItem(extensionId) === 'connected';

  return isConnected;
};

export const getErrorMessage = (err: any) => {
  if (err.message === 'Cancelled') {
    return '';
  }

  if (err.message === 'InsufficientBalance') {
    return 'Oops! It seems your balance is not sufficient to process the payment.';
  }

  return 'Oops! Something went wrong. Please contact help@golibra.xyz to get the supports.';
};

export const getNetworkLogo = (nextworkId: string) => {
  switch (nextworkId) {
    case 'nw_polkadot':
      return PolkadotNetWorkIcon;

    case 'nw_kusama':
      return KusamaNetWorkIcon;

    case 'nw_polygon':
      return PolygonNetWorkIcon;

    default:
      break;
  }
};
