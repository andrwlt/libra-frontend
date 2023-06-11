import { NumberPriceCheckoutResponse, CheckoutResponse } from '@atscale/libra-ui';
import { priceFormatHelper } from '@atscale/libra-ui';

export const formatCheckoutToNumberPrice = (checkout: CheckoutResponse): NumberPriceCheckoutResponse => {
  let { item, assetId, networkId } = checkout;

  return {
    ...checkout,
    item: {
      ...item,
      price: item.price ? priceFormatHelper.formatBalance(item.price, { assetId, networkId }) : undefined,
      presetPrice: item.presetPrice
        ? priceFormatHelper.formatBalance(item.presetPrice, { assetId, networkId })
        : undefined,
      minPrice: item.minPrice ? priceFormatHelper.formatBalance(item.minPrice, { assetId, networkId }) : undefined,
      maxPrice: item.maxPrice ? priceFormatHelper.formatBalance(item.maxPrice, { assetId, networkId }) : undefined,
    },
  };
};

export const formatCheckoutToStringPrice = (checkout: any) => {
  const { item, assetId, networkId } = checkout;
  return {
    ...checkout,
    item: {
      ...item,
      price: item.price && priceFormatHelper.toSmallestUnit(item.price, { assetId, networkId }),
      presetPrice: item.presetPrice && priceFormatHelper.toSmallestUnit(item.presetPrice, { assetId, networkId }),
      minPrice: item.minPrice && priceFormatHelper.toSmallestUnit(item.minPrice, { assetId, networkId }),
      maxPrice: item.maxPrice && priceFormatHelper.toSmallestUnit(item.maxPrice, { assetId, networkId }),
    },
  };
};
