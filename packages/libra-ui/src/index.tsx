import CheckoutComponent from 'components/Checkout';
import { priceFormatHelper } from 'utils';
import { getNetwork, getNetworkAssets, getWalletNetworks, getAssetMetadata } from 'utils/asset';
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
} from 'app/types';
import { EXTENSIONS } from 'config';
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
  extensionAPI,
  EXTENSIONS,
  AccountOption,
  ContactInformation,
  Loading,
  WalletList,
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
};
