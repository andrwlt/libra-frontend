import React from 'react';

interface AfterPayment {
    type: 'message' | 'redirect';
    config: {
        message?: string;
        url?: string;
    };
}
interface Brand {
    name?: string;
    logo?: string;
}
interface CheckoutBaseType {
    branding: Brand;
    asset: string;
    afterPayment?: AfterPayment;
}
interface AssetMetadata {
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
interface CheckoutProductItemNumberPrice extends CheckoutProductItemBase {
    price: number | null;
}
interface CheckoutType extends CheckoutBaseType {
    payee?: string;
    item: CheckoutProductItemNumberPrice;
}

declare const CheckoutPreview: ({ checkoutData, previewMode, isShowAfterPayment, loading, }: {
    checkoutData: CheckoutType;
    previewMode?: boolean | undefined;
    isShowAfterPayment?: boolean | undefined;
    loading?: boolean | undefined;
}) => JSX.Element;

interface Props {
    children: React.ReactNode;
}
declare const LibraProviders: ({ children }: Props) => JSX.Element;

declare const ASSET_METADATA: Record<string, AssetMetadata>;

export { ASSET_METADATA, CheckoutPreview as Checkout, LibraProviders };
