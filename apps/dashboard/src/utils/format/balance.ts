import { NumberPriceCheckoutResponse, CheckoutResponse } from '@atscale/libra-ui';
import { priceFormatHelper } from '@atscale/libra-ui';

export const formatCheckoutToNumberPrice = (checkout: CheckoutResponse): NumberPriceCheckoutResponse => {
  const { item, assetId, networkId } = checkout;

  return {
    ...checkout,
    item: {
      ...item,
      price: priceFormatHelper.formatBalance(item.price, { assetId, networkId }),
    },
  };
};

export const formatCheckoutToStringPrice = (checkout: any) => {
  const { item, assetId, networkId } = checkout;
  return {
    ...checkout,
    item: {
      ...item,
      price: priceFormatHelper.toSmallestUnit(item.price ?? 0, { assetId, networkId }),
    },
  };
};
