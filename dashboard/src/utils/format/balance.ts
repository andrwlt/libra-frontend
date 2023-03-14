import { ASSET_METADATA } from 'config';

export function formatBalance(amount: number, asset: string) {
  const metadata = ASSET_METADATA[asset];

  return metadata ? amount / 10 ** metadata.decimals : amount;
}

export function toSmallestUnit(amount: number, asset: string) {
  const metadata = ASSET_METADATA[asset];

  return metadata ? amount * 10 ** metadata.decimals : amount;
}
