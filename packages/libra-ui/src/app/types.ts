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

export interface NumberPrice {
  type: PriceType;
  value?: number | null;
  preset?: number | null;
  minimum?: number | null;
  maximum?: number | null;
}

export interface StringPrice {
  type: PriceType;
  value?: string;
  preset?: string;
  minimum?: string;
  maximum?: string;
}

export interface BaseProduct {
  name: string;
  description?: string;
  image?: string;
}

export interface StringPriceProduct extends BaseProduct {
  price: StringPrice;
}

export interface NumberPriceProduct extends BaseProduct {
  price: NumberPrice;
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
  metadata: {
    actionName?: string | null;
  };
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
  logoUrl?: string;
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

interface SubstrateExtrinsicParam {
  name: string;
  required: boolean;
}

export interface SubstrateExtrinsic {
  module: string;
  method: string;
  params: SubstrateExtrinsicParam[];
}

export interface AssetConfigNetwork {
  networkId: string;
  config: {
    isNative: boolean;
    tokenAddress?: string;
    tokenId?: number;
    transferMethod?: SubstrateExtrinsic;
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

export type ExtensionId = 'polkadot-js' | 'subwallet-js' | 'talisman';

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
