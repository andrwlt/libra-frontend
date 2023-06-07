import { Asset, AssetMetadata } from 'app/types';
import { getAssetMetadata } from './asset';
import JSBI from 'jsbi';

function toReverseArray(str: string) {
  const splitString = str.split('');
  const reverseArray = splitString.reverse();
  return reverseArray;
}

const getDecimalsShouldBeDecrease = (stringNumber: string) => {
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

function formatBalance(amount: string, asset: Asset): number {
  const metadata = getAssetMetadata(asset);

  if (!metadata) {
    return Number(amount);
  }

  const { decimals } = metadata;
  const decimalsShouldBeDecrease = getDecimalsShouldBeDecrease(amount);

  if (decimalsShouldBeDecrease < metadata.decimals) {
    const nextAmount = amount.slice(0, amount.length - decimalsShouldBeDecrease);
    const nextDecimals = decimals - decimalsShouldBeDecrease;

    const isUnderOne = nextAmount.length <= nextDecimals;

    if (isUnderOne) {
      return Number(nextAmount) / Math.pow(10, Number(nextDecimals));
    }

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

function exponentToStringDecimals(num: number) {
  if (num < 0.000001) {
    let numChunks: any[] = [];
    numChunks = num.toString().split('e');

    let numOfZeroes = Math.abs(numChunks[1]) - 1;
    let decimalNumber = '';
    let zeroes = '';
    let int = numChunks[0];

    for (let i = 0; i < int.length; i++) {
      int = int.replace('.', '');
    }

    for (let i = 0; i < numOfZeroes; i++) {
      zeroes += '0';
    }

    return '0.' + zeroes + int;
  } else {
    return num.toString();
  }
}

function toSmallestUnit(originAmount: number, asset: Asset) {
  try {
    const metadata = getAssetMetadata(asset);
    if (!metadata) {
      return 0;
    }

    let amount = originAmount;
    let decimals = metadata?.decimals;

    if (!Number.isInteger(amount)) {
      // avoid scientific notation issue
      const decimalLength = exponentToStringDecimals(amount).split('.')[1].length;
      decimals = decimals - decimalLength;
      amount = amount * Math.pow(10, decimalLength);
    }

    const scale = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(decimals));
    const stringNumber = JSBI.multiply(JSBI.BigInt(amount), scale).toString();

    return stringNumber;
  } catch (err) {
    console.log('err', err);
  }
}

export const getCheckoutPrice = (
  { price, asset }: { price: string | number; asset: Asset },
  assetMetadata: AssetMetadata,
) => {
  const nextPrice = typeof price !== 'number' ? formatBalance(price, asset) : price;
  const unit = assetMetadata ? assetMetadata.symbol : asset;
  const formattedPrice = nextPrice.toLocaleString('en-US', {
    style: 'decimal',
    maximumFractionDigits: assetMetadata.decimals,
  });

  return `${formattedPrice} ${unit}`;
};

export const priceFormatHelper = {
  formatBalance,
  toSmallestUnit,
  getCheckoutPrice,
};
