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

export interface CheckoutBaseType {
  branding: Brand;
  asset: string;
  afterPayment?: AfterPayment;
}

export interface AssetMetadata {
  decimals: number;
  symbol: string;
  logo: string;
  network: {
    name: string;
    type: 'substrate';
    config: {
      ss58Prefix: number;
      rpc: string;
    };
  };
}

interface CheckoutProductItemBase {
  name: string;
  description?: string;
  image?: string;
}

export interface CheckoutProductItemNumberPrice extends CheckoutProductItemBase {
  price: number | null;
}

export const AFTER_PAYMENT_TYPE = {
  MESSAGE: 'message',
  REDIRECT: 'redirect',
};

export interface CheckoutPreviewType extends CheckoutBaseType {
  payee?: string;
  item: CheckoutProductItemNumberPrice;
}
