import { encodeAddress } from '@polkadot/util-crypto';
import { Asset, getNetwork } from '@atscale/libra-ui';

export function getSs58AddressByAsset(address: string, asset: Asset) {
  const network = getNetwork(asset);

  if (!network) {
    throw new Error(`Asset ${asset.assetId} is unsupported.`);
  }

  return encodeAddress(address, network.config.ss58Prefix);
}
