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
type PriceType = 'fixed' | 'flexible';
interface NumberPrice {
    type: PriceType;
    value?: number | null;
    preset?: number | null;
    minimum?: number | null;
    maximum?: number | null;
}
interface StringPrice {
    type: PriceType;
    value?: string;
    preset?: string;
    minimum?: string;
    maximum?: string;
}
interface BaseProduct {
    name: string;
    description?: string;
    image?: string;
}
interface StringPriceProduct extends BaseProduct {
    price: StringPrice;
}
interface NumberPriceProduct extends BaseProduct {
    price: NumberPrice;
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
    checkoutType?: string | null;
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
}
interface Extension {
    id: ExtensionId;
    instant: any;
}
interface ConnectedExtension extends Extension {
    signer: any;
    accounts: Account[];
}
interface ExtensionDictionary {
    [extensionId: string]: Extension;
}
type ExtensionId = 'polkadot-js' | 'subwallet-js' | 'talisman';
interface ExtensionConfig {
    id: ExtensionId;
    name: string;
    installURL: string;
    logo: string;
}
interface Payment {
    payee: string;
    amount: number;
    asset: Asset;
    productName: string;
}
type NumFlexPrice = number | null;
type FlexPriceValid = true | string;

declare const CheckoutPreview: ({ checkoutData, previewMode, isShowAfterPayment, loading, HandlePaymentComponent, onNumFlexPriceChange, numFlexPrice, flexPriceValid, validateFlexPrice, }: {
    checkoutData: Checkout | CheckoutResponse;
    previewMode?: boolean | undefined;
    isShowAfterPayment?: boolean | undefined;
    loading?: boolean | undefined;
    HandlePaymentComponent?: any;
    onNumFlexPriceChange?: ((price: NumFlexPrice) => void) | undefined;
    validateFlexPrice?: ((price: NumFlexPrice) => FlexPriceValid) | undefined;
    numFlexPrice?: NumFlexPrice | undefined;
    flexPriceValid: FlexPriceValid;
}) => JSX.Element;

declare function formatBalance(amount: string, asset: Asset): number;
declare function exponentToStringDecimals(num: number): string;
declare function toSmallestUnit(originAmount: number, asset: Asset): string | 0 | undefined;
declare const priceFormatHelper: {
    formatBalance: typeof formatBalance;
    toSmallestUnit: typeof toSmallestUnit;
    getCheckoutPrice: ({ price, asset }: {
        price: string | number;
        asset: Asset;
    }, assetMetadata: AssetMetadata) => string;
    exponentToStringDecimals: typeof exponentToStringDecimals;
};

declare const getWalletNetworks: () => Network[];
declare const getNetworkAssets: (networkId: string) => AssetMetadata[];
declare const getAssetMetadata: (asset: Asset) => AssetMetadata;
declare const getNetwork: (asset: Asset) => Network;

declare const extensionAPI: {
    getExtensions(): Promise<Extension[]>;
};

declare const EXTENSIONS: ExtensionConfig[];

interface AccountProps {
    account: {
        name: string;
        address: string;
    };
    variant?: 'default' | 'select';
    noPadding?: boolean;
}
declare function AccountInfo({ account, variant, noPadding }: AccountProps): JSX.Element;

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

interface WalletListProps {
    onSelectWallet: (id: ExtensionId) => void;
    extensionDictionary: ExtensionDictionary;
}
declare const WalletList: ({ extensionDictionary, onSelectWallet }: WalletListProps) => JSX.Element;

export { Account, AccountInfo as AccountOption, Asset, AssetMetadata, BaseCheckout, BaseProduct, Checkout, CheckoutPreview as CheckoutComponent, CheckoutResponse, ConnectedExtension, ContactInformation, EXTENSIONS, Extension, ExtensionConfig, ExtensionDictionary, ExtensionId, FlexPriceValid, _default as Loading, Network, NumFlexPrice, NumberPriceCheckoutResponse, NumberPriceProduct, Payment, PriceType, StringPriceProduct, WalletList, WalletType, extensionAPI, getAssetMetadata, getNetwork, getNetworkAssets, getWalletNetworks, priceFormatHelper };
