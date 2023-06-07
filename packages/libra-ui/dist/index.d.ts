import * as react from 'react';

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
interface BaseProduct {
    name: string;
    description?: string;
    image?: string;
}
interface StringPriceProduct extends BaseProduct {
    price: string;
}
interface NumberPriceProduct extends BaseProduct {
    price: number | null;
}
interface Asset {
    assetId: string;
    networkId: string;
}
interface BaseCheckout {
    branding: Brand;
    assetId: string;
    networkId: string;
    afterPayment?: AfterPayment;
    payee?: string;
}
interface Checkout extends BaseCheckout {
    item: NumberPriceProduct;
}
interface BaseCheckoutResponse extends BaseCheckout {
    id: string;
    payee: string;
    active: boolean;
    created: string;
}
interface CheckoutResponse extends BaseCheckoutResponse {
    item: StringPriceProduct;
}
interface NumberPriceCheckoutResponse extends BaseCheckoutResponse {
    item: NumberPriceProduct;
}
interface Network {
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
interface AssetMetadata extends AssetConfigInformation {
    network: AssetConfigNetwork;
}
type WalletType = 'substrate' | 'evm';
interface Account {
    address: string;
    name: string;
    type: 'METAMASK' | 'polkadot-js';
}
type ExtensionId = 'polkadot-js' | 'METAMASK';
interface Extension {
    id: ExtensionId;
    instant: any;
    accounts?: Account[];
}
interface ExtensionConfig {
    id: ExtensionId;
    name: string;
    installURL: string;
}
interface Payment {
    payee: string;
    amount: number;
    asset: Asset;
    productName: string;
}

declare const CheckoutPreview: ({ checkoutData, previewMode, isShowAfterPayment, loading, HandlePaymentComponent, }: {
    checkoutData: Checkout;
    previewMode?: boolean | undefined;
    isShowAfterPayment?: boolean | undefined;
    loading?: boolean | undefined;
    HandlePaymentComponent?: any;
}) => JSX.Element;

declare function formatBalance(amount: string, asset: Asset): number;
declare function toSmallestUnit(originAmount: number, asset: Asset): string | 0 | undefined;
declare const priceFormatHelper: {
    formatBalance: typeof formatBalance;
    toSmallestUnit: typeof toSmallestUnit;
    getCheckoutPrice: ({ price, asset }: {
        price: string | number;
        asset: Asset;
    }, assetMetadata: AssetMetadata) => string;
};

declare const getWalletNetworks: (walletType: WalletType) => Network[];
declare const getNetworkAssets: (networkId: string) => AssetMetadata[];
declare const getAssetMetadata: (asset: Asset) => AssetMetadata;
declare const getNetwork: (asset: Asset) => Network;
declare const getExtensionId: (asset: Asset) => "polkadot-js" | "METAMASK" | undefined;

declare const extensionAPI: {
    getExtensions(): Promise<Extension[]>;
    getExtension(id: ExtensionId): Promise<Extension | undefined>;
};

declare const EXTENSION_IDS: {
    POLKADOT_JS: string;
    METAMASK: string;
};
declare const EXTENSIONS: ExtensionConfig[];

interface AccountProps {
    account: {
        name: string;
        address: string;
        type: 'METAMASK' | 'polkadot-js';
    };
    variant?: 'default' | 'select';
}
declare function AccountInfo({ account, variant }: AccountProps): JSX.Element;

declare const ContactInformation: ({ productName, value, onChange, error, resetError, }: {
    productName: string;
    value: string;
    onChange: Function;
    error?: string | undefined;
    resetError?: Function | undefined;
}) => JSX.Element;

interface LoadingProps {
    message?: string;
    loading?: boolean;
    isFullPage?: boolean;
    isContentPage?: boolean;
    bordered?: boolean;
}
declare const _default: react.MemoExoticComponent<({ loading, isFullPage, isContentPage, message, bordered }: LoadingProps) => JSX.Element | null>;

export { AccountInfo as AccountOption, Asset, AssetMetadata, BaseCheckout, BaseProduct, Checkout, CheckoutPreview as CheckoutComponent, CheckoutResponse, ContactInformation, EXTENSIONS, EXTENSION_IDS, Extension, ExtensionConfig, ExtensionId, _default as Loading, Network, NumberPriceCheckoutResponse, Payment, WalletType, extensionAPI, getAssetMetadata, getExtensionId, getNetwork, getNetworkAssets, getWalletNetworks, priceFormatHelper };
