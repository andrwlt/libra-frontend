export interface AfterPayment {
  type: 'message' | 'redirect';
  config: {
    message?: string;
    url?: string;
  };
}
export interface Brand {
  name?: string;
  logo?: string;
}

export type PriceType = 'fixed' | 'flexible';

export interface BaseProduct {
  name: string;
  description?: string;
  image?: string;
  priceType: PriceType;
}

interface StringPriceProduct extends BaseProduct {
  price?: string;
  presetPrice?: string;
  minPrice?: string;
  maxPrice?: string;
}

export interface NumberPriceProduct extends BaseProduct {
  price?: number | null;
  presetPrice?: number | null;
  minPrice?: number | null;
  maxPrice?: number | null;
}

export interface Asset {
  assetId: string;
  networkId: string;
}
export interface BaseCheckout {
  branding: Brand;
  assetId: string;
  networkId: string;
  afterPayment?: AfterPayment;
  payee?: string;
}

export interface Checkout extends BaseCheckout {
  item: NumberPriceProduct;
}

interface BaseCheckoutResponse extends BaseCheckout {
  id: string;
  payee: string;
  active: boolean;
  created: string;
}

export interface CheckoutResponse extends BaseCheckoutResponse {
  item: StringPriceProduct;
}

export interface NumberPriceCheckoutResponse extends BaseCheckoutResponse {
  item: NumberPriceProduct;
}

export interface Network {
  id: string;
  name: string;
  type: 'substrate' | 'evm';
  rpc: string;
  logo?: string;
  config: {
    ss58Prefix?: number;
    chainId?: number;
  };
}

interface AssetConfigInformation {
  id: string;
  symbol: string;
  name: string;
  decimals: number;
  logoUrl: string;
}

interface AssetConfigNetwork {
  networkId: string;
  config: {
    isNative: boolean;
    tokenAddress?: string;
  };
}
export interface AssetConfig extends AssetConfigInformation {
  networks: AssetConfigNetwork[];
}

export interface AssetMetadata extends AssetConfigInformation {
  network: AssetConfigNetwork;
}

export type WalletType = 'substrate' | 'evm';

export interface Account {
  address: string;
  name: string;
}

export interface Extension {
  id: ExtensionId;
  instant: any;
}

export interface ConnectedExtension extends Extension {
  signer: any;
  accounts: Account[];
}

export interface ExtensionDictionary {
  [extensionId: string]: Extension;
}

export type ExtensionId = 'polkadot-js' | 'subwallet-js' | 'talisman' | 'enkrypt';

export interface ExtensionConfig {
  id: ExtensionId;
  name: string;
  installURL: string;
  logo: string;
}

export interface Payment {
  payee: string;
  amount: number;
  asset: Asset;
  productName: string;
}

export type NumFlexPrice = number | null;
export type FlexPriceValid = true | string;
