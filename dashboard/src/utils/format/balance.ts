import { ASSET_METADATA } from 'config';
import JSBI from 'jsbi';

export function formatBalance(amount: string, asset: string) {
  const metadata = ASSET_METADATA[asset];
  
  if (metadata) {
    const scale = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(metadata.decimals));
    return JSBI.divide(JSBI.BigInt(amount), scale).toString();
  }

  return amount;
}

export function toSmallestUnit(amount: string, asset: string) {
  const metadata = ASSET_METADATA[asset];

  if (metadata) {
    const scale = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(metadata.decimals));
    return JSBI.multiply(JSBI.BigInt(amount), scale).toString();
  }

  return amount;
}
