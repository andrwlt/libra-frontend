import { NumberPriceCheckoutResponse, CheckoutResponse } from '@atscale/libra-ui';
import { priceFormatHelper } from '@atscale/libra-ui';

const formatCheckoutPrice = (checkout: any, priceFormatter: Function) => {
  let { item, assetId, networkId } = checkout;
  const {
    price: { type, minimum, maximum, value, preset },
  } = item;

  const nextPrice = {
    type,
    value: value ? priceFormatter(value, { assetId, networkId }) : undefined,
    preset: preset ? priceFormatter(preset, { assetId, networkId }) : undefined,
    minimum: minimum ? priceFormatter(minimum, { assetId, networkId }) : undefined,
    maximum: maximum ? priceFormatter(maximum, { assetId, networkId }) : undefined,
  };

  return {
    ...checkout,
    item: {
      ...item,
      price: nextPrice,
    },
  };
};

export const formatCheckoutToNumberPrice = (checkout: CheckoutResponse): NumberPriceCheckoutResponse => {
  return formatCheckoutPrice(checkout, priceFormatHelper.formatBalance);
};

export const formatCheckoutToStringPrice = (checkout: any) => {
  return formatCheckoutPrice(checkout, priceFormatHelper.toSmallestUnit);
};
