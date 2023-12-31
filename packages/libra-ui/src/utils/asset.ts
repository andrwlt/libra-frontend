import { AssetMetadata, Asset, Network, AssetConfigNetwork } from 'app/types';
import { ASSETS_CONFIG, NETWORKS_CONFIG } from 'config';

export const getWalletNetworks = () => {
  return NETWORKS_CONFIG;
};

export const getNetworkAssets = (networkId: string) => {
  return ASSETS_CONFIG.reduce((assets: AssetMetadata[], asset) => {
    const { networks } = asset;
    const matchedNetwork = networks.find((netWork) => netWork.networkId === networkId);

    if (matchedNetwork) {
      return [...assets, { ...asset, network: matchedNetwork }];
    } else {
      return assets;
    }
  }, []);
};

export const getAssetMetadata = (asset: Asset) => {
  const assets = getNetworkAssets(asset.networkId);
  const assetMetadata = assets.find(({ id }) => id === asset.assetId);
  const initAssetMetadata: AssetMetadata = {
    id: '',
    symbol: '',
    name: '',
    decimals: 0,
    logoUrl: '',
    network: {
      networkId: '',
      config: {
        isNative: false,
      },
    },
  };

  return assetMetadata ?? initAssetMetadata;
};

export const getNetwork = (asset: Asset) => {
  const netWork = NETWORKS_CONFIG.find(({ id }) => id === asset.networkId);
  const initNetwork: Network = { id: '', name: '', type: 'substrate', rpc: '', config: {} };
  return netWork ?? initNetwork;
};

export const getAssetNetworkConfig = ({ assetId, networkId }: Asset): AssetConfigNetwork => {
  const asset = ASSETS_CONFIG.find((asset) => asset.id === assetId);
  if (!asset) {
    throw new Error(`Invalid asset id ${assetId}`);
  }

  const networkConfig = asset.networks.find((config) => config.networkId === networkId);

  if (!networkConfig) {
    throw new Error(`Asset ${assetId} is not available on network ${networkId}.`);
  }

  return networkConfig;
};
