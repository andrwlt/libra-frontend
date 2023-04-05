import { ASSET_METADATA } from 'config';
import { CheckoutResponseAfterConvertingPrice, CheckoutResponseType } from 'features/checkout/types';
import JSBI from 'jsbi';

export function formatBalance(amount: string, asset: string): number {
  const metadata = ASSET_METADATA[asset];

  if (metadata) {
    const scale = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(metadata.decimals));
    return Number(JSBI.divide(JSBI.BigInt(amount), scale).toString());
  }

  return Number(amount);
}

export function toSmallestUnit(amount: number, asset: string) {
  const metadata = ASSET_METADATA[asset];

  let result = amount.toString();

  if (metadata) {
    const scale = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(metadata.decimals));
    result = JSBI.multiply(JSBI.BigInt(amount), scale).toString();
  }

  return result;
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
