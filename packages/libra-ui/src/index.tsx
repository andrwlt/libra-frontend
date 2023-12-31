import CheckoutComponent from 'components/Checkout';
import { priceFormatHelper, getSs58AddressByAsset, isPriceTooLong } from 'utils';
import { getNetwork, getNetworkAssets, getWalletNetworks, getAssetMetadata, getAssetNetworkConfig } from 'utils/asset';
import extensionAPI from 'utils/extension';
import {
  AssetMetadata,
  Network,
  BaseCheckout,
  Checkout,
  BaseProduct,
  CheckoutResponse,
  NumberPriceCheckoutResponse,
  WalletType,
  Extension,
  ExtensionDictionary,
  ConnectedExtension,
  Payment,
  Asset,
  ExtensionId,
  ExtensionConfig,
  Account,
  FlexPriceValid,
  NumFlexPrice,
  PriceType,
  StringPriceProduct,
  NumberPriceProduct,
  NumberPrice,
} from 'app/types';
import { EXTENSIONS, ASSETS_CONFIG } from 'config';
import AccountOption from 'components/Checkout/Right/PaymentPreviewer/AccountOption';
import ContactInformation from 'components/Checkout/Right/PaymentPreviewer/ContactInformation';
import Loading from 'components/Common/Loading';
import WalletList from 'components/Common/WalletList';

export {
  CheckoutComponent,
  priceFormatHelper,
  getNetwork,
  getNetworkAssets,
  getWalletNetworks,
  getAssetMetadata,
  getAssetNetworkConfig,
  extensionAPI,
  EXTENSIONS,
  AccountOption,
  ContactInformation,
  Loading,
  WalletList,
  getSs58AddressByAsset,
  isPriceTooLong,
  ASSETS_CONFIG,
};

export type {
  AssetMetadata,
  Network,
  BaseCheckout,
  Checkout,
  BaseProduct,
  CheckoutResponse,
  NumberPriceCheckoutResponse,
  WalletType,
  Extension,
  Payment,
  Asset,
  ExtensionId,
  ExtensionConfig,
  ExtensionDictionary,
  ConnectedExtension,
  Account,
  FlexPriceValid,
  NumFlexPrice,
  PriceType,
  StringPriceProduct,
  NumberPriceProduct,
  NumberPrice,
};
