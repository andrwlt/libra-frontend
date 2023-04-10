import { ASSET_METADATA } from 'config';
import { CheckoutResponseAfterConvertingPrice, CheckoutResponseType } from 'features/checkout/types';
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

export function toSmallestUnit(originAmount: number, asset: string) {
  const metadata = ASSET_METADATA[asset];
  let amount = originAmount;
  let decimals = metadata?.decimals;

  if (!Number.isInteger(amount)) {
    const decimalLength = amount.toString().split('.')[1].length;
    decimals = decimals - decimalLength;
    amount = amount * Math.pow(10, decimalLength);
  }

  let stringNumber = amount.toString();

  if (metadata) {
    const scale = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(decimals));
    stringNumber = JSBI.multiply(JSBI.BigInt(amount), scale).toString();
  }

  return stringNumber;
}

export const formatCheckoutToNumberPrice = (checkout: CheckoutResponseType): CheckoutResponseAfterConvertingPrice => {
  const { item, asset } = checkout;
  return {
    ...checkout,
    item: {
      ...item,
      price: formatBalance(item.price, asset),
    },
  };
};

export const formatCheckoutToStringPrice = (checkout: any) => {
  const { item, asset } = checkout;
  return {
    ...checkout,
    item: {
      ...item,
      price: toSmallestUnit(item.price ?? 0, asset),
    },
  };
};
