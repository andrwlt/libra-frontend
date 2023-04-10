import { AssetMetadata } from 'types';
import { ASSET_METADATA } from 'config';

export function getAssetMetadata(symbol: string): AssetMetadata {
  const metadata = ASSET_METADATA[symbol];

  if (metadata) {
    return metadata;
  }

  throw `Asset ${symbol} is not supported.`;
}
