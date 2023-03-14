import JSBI from 'jsbi';
import { getAssetMetadata } from './asset';

const toScale = (decimals: number): JSBI =>
  JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(decimals));

export default class AssetAmount {
  public readonly amount: JSBI;
  public readonly scale: JSBI;

  protected constructor(amount: JSBI, scale: JSBI) {
    this.amount = amount;
    this.scale = scale;
  }

  static fromRawAmount(rawAmount: string, assetSymbol: string): AssetAmount {
    const { decimals } = getAssetMetadata(assetSymbol);
    const amount = JSBI.BigInt(rawAmount);

    return new AssetAmount(amount, toScale(decimals));
  }

  static fromBaseAmount(baseAmount: string, assetSymbol: string): AssetAmount {
    const { decimals } = getAssetMetadata(assetSymbol);
    const amount = JSBI.BigInt(baseAmount);

    return new AssetAmount(amount, toScale(decimals));
  }

  toSignificant(resolution: number = 6): string {
    return JSBI.divide(this.amount, this.scale).toString(10);
  }
}
