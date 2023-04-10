import { ASSET_METADATA } from 'config';
import JSBI from 'jsbi';

function toReverseArray(str: string) {
  const splitString = str.split('');
  const reverseArray = splitString.reverse();
  return reverseArray;
}

const getZeroLength = (stringNumber: string) => {
  const reversedArray = toReverseArray(stringNumber);
  let count = 0;

  for (const number of reversedArray) {
    if (number !== '0') {
      return count;
    }

    count += 1;
  }

  return count;
};

export function formatBalance(amount: string, asset: string): number {
  const metadata = ASSET_METADATA[asset];

  if (!metadata) {
    return Number(amount);
  }

  const { decimals } = metadata;
  const zeroLength = getZeroLength(amount);

  if (zeroLength < metadata.decimals) {
    const nextAmount = amount.slice(0, amount.length - zeroLength);
    const nextDecimals = decimals - zeroLength;

    // Incase nextAmount still too big
    const intNumberPart = nextAmount.slice(0, nextDecimals);
    const decimalNumberPart = nextAmount.slice(nextDecimals, nextAmount.length);

    const decimalNumber = Number(decimalNumberPart) / Math.pow(10, Number(decimalNumberPart.length));

    return Number(intNumberPart) + decimalNumber;
  }

  const scale = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(metadata.decimals));
  const result = JSBI.divide(JSBI.BigInt(amount), scale).toString();
  return Number(result);
}

export const getCheckoutPrice = ({ price, asset }: { price: string | number; asset: string }, assetMetadata: any) => {
  const nextPrice = typeof price !== 'number' ? formatBalance(price, asset) : price;
  const unit = assetMetadata ? assetMetadata.symbol : asset;
  const formattedPrice = nextPrice.toLocaleString('en-US', { style: 'decimal' });

  return `${formattedPrice} ${unit}`;
};
