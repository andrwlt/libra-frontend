import { Asset, AssetMetadata } from 'app/types';
import { getAssetMetadata, getNetwork } from './asset';
import JSBI from 'jsbi';
import { encodeAddress } from '@polkadot/util-crypto';
import bigDecimal from 'js-big-decimal';

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

const preventFloatingPoint = (amount: number, decimal?: number) => {
  return Number(bigDecimal.round(amount, decimal || 0));
};

function toSmallestUnit(originAmount: number, asset: Asset) {
  try {
    const metadata = getAssetMetadata(asset);
    if (!metadata) {
      return 0;
    }

    let decimals = metadata.decimals;
    let amount = preventFloatingPoint(originAmount, decimals);

    if (!Number.isInteger(amount)) {
      // avoid scientific notation issue
      let decimalLength = exponentToStringDecimals(amount).split('.')[1].length;

      if (decimalLength > decimals) {
        decimalLength = 0;
      }

      decimals = decimals - decimalLength;

      amount = amount * Math.pow(10, decimalLength);

      // avoid floating point number issue
      amount = preventFloatingPoint(amount);
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
  exponentToStringDecimals,
};

export function getSs58AddressByAsset(address: string, asset: Asset) {
  const network = getNetwork(asset);

  if (!network) {
    throw new Error(`Asset ${asset.assetId} is unsupported.`);
  }

  return encodeAddress(address, network.config.ss58Prefix);
}

const MAXIMUM_DECIMAL_PATH_LENGTH = 4;

export const isPriceTooLong = (price: any) => {
  if (!price || (price && Number.isInteger(price))) {
    return false;
  }

  const decimalPath = exponentToStringDecimals(price).split('.')[1].length;

  return decimalPath > MAXIMUM_DECIMAL_PATH_LENGTH;
};
