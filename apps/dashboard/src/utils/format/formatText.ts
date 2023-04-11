import { formatBalance } from 'utils/format/balance';
import dayjs from 'dayjs';

export const shortStr = (str: string) => `${str.slice(0, 6)}...${str.slice(-4)}`;

export function truncate(address: string, config?: { start: number; end: number }) {
  if (!address) return '';

  const start = config?.start ?? 6;
  const end = config?.end ?? 6;
  return `${address.slice(0, start)} ... ${address.slice(-end)}`;
}

export const getCheckoutLink = (id: string) => {
  return `${process.env.REACT_APP_CHECKOUT_URL}/${id}`;
};

export const getCheckoutPrice = ({ price, asset }: { price: string | number; asset: string }, assetMetadata: any) => {
  const nextPrice = typeof price !== 'number' ? formatBalance(price, asset) : price;
  const unit = assetMetadata ? assetMetadata.symbol : asset;
  const formattedPrice = nextPrice.toLocaleString('en-US', {
    style: 'decimal',
    maximumFractionDigits: assetMetadata.decimals,
  });

  return `${formattedPrice} ${unit}`;
};

export const formatCreatedDate = (date: string) => {
  return dayjs(date, 'YYYY-MM-DDTHH:mm.ss.SSSZ').format('MMM D, YYYY h:mm A');
};
