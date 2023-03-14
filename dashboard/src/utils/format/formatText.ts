import { CheckoutReseponse } from 'features/checkout/types';
import { formatBalance } from 'utils/format/balance';
import dayjs from 'dayjs';

export const shortStr = (str: string) => `${str.slice(0, 6)}...${str.slice(-4)}`;

export function truncate(address: string, config?: { start: number; end: number }) {
  const start = config?.start ?? 6;
  const end = config?.end ?? 6;
  return `${address.slice(0, start)} ... ${address.slice(-end)}`;
}

export const getCheckoutLink = (id: string) => {
  return `${process.env.REACT_APP_CHECKOUT_URL}/${id}`;
};

export const getCheckoutPrice = (checkout: CheckoutReseponse, assetMetadata: any) => {
  const price = formatBalance(checkout.item.price, checkout.asset);
  const unit = assetMetadata ? assetMetadata.symbol : checkout.asset;
  const formatedPrice = price.toLocaleString('en-US', {
    style: 'decimal',
  });

  return `${formatedPrice} ${unit}`;
};

export const formatCreatedDate = (date: string) => {
  return dayjs(date, 'YYYY-MM-DDTHH:mm.ss.SSSZ').format('MMM D, YYYY h:mm A');
};
