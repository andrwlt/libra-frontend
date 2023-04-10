import { encodeAddress } from '@polkadot/util-crypto';
import { ASSET_METADATA } from '../config';

export function getSs58AddressByAsset(address: string, asset: string) {
  const metadata = ASSET_METADATA[asset];

  if (!metadata) {
    throw new Error(`Asset ${asset} is unsupported.`);
  }

  return encodeAddress(address, metadata.network.config.ss58Prefix);
}