import { CheckoutResponseAfterConvertingPrice, CheckoutResponseType } from 'features/checkout/types';
import { priceFormatHelper } from '@atscale/libra-ui';

export const formatCheckoutToNumberPrice = (checkout: CheckoutResponseType): CheckoutResponseAfterConvertingPrice => {
  const { item, asset } = checkout;
  return {
    ...checkout,
    item: {
      ...item,
      price: priceFormatHelper.formatBalance(item.price, asset),
    },
  };
};

export const formatCheckoutToStringPrice = (checkout: any) => {
  const { item, asset } = checkout;
  return {
    ...checkout,
    item: {
      ...item,
      price: priceFormatHelper.toSmallestUnit(item.price ?? 0, asset),
    },
  };
};
