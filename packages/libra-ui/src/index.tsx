import CheckoutComponent from 'components/Checkout';
import { priceFormatHelper } from 'utils';
import { getNetwork, getNetworkAssets, getWalletNetworks, getAssetMetadata, getExtensionId } from 'utils/asset';
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
  Payment,
  Asset,
  ExtensionId,
  ExtensionConfig,
} from 'app/types';
import { EXTENSION_IDS, EXTENSIONS } from 'config';
import AccountOption from 'components/Checkout/Right/PaymentPreviewer/AccountOption';
import ContactInformation from 'components/Checkout/Right/PaymentPreviewer/ContactInformation';
import Loading from 'components/Common/Loading';

export {
  CheckoutComponent,
  priceFormatHelper,
  getNetwork,
  getNetworkAssets,
  getWalletNetworks,
  getAssetMetadata,
  getExtensionId,
  extensionAPI,
  EXTENSION_IDS,
  EXTENSIONS,
  AccountOption,
  ContactInformation,
  Loading,
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
};
