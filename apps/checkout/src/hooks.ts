import {
  CheckoutResponse,
  ConnectedExtension,
  Extension,
  extensionAPI,
  NumFlexPrice,
  Payment,
  priceFormatHelper,
  FlexPriceValid,
  isPriceTooLong,
} from '@atscale/libra-ui';
import { useEffect, useMemo, useState } from 'react';
import { ExtensionDictionary } from 'types';
import { APP_NAME } from 'config';
import { Account } from '@atscale/libra-ui';
import { MenuProps, message } from 'antd';
import service from 'service';
import { getErrorMessage, storageHelper } from 'utils';

export const useExtensions = () => {
  const [extensions, setExtensions] = useState<ExtensionDictionary>({});
  const [getExtensionsLoading, setGetExtensionsLoading] = useState(true);

  useEffect(() => {
    setGetExtensionsLoading(true);
    extensionAPI
      .getExtensions()
      .then((installedExtensions) => {
        if (installedExtensions) {
          const nextExtensions = installedExtensions.reduce(
            (dict, extension) => ({
              ...dict,
              [extension.id]: extension,
            }),
            {},
          );

          setExtensions(nextExtensions);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setGetExtensionsLoading(false);
      });
  }, []);

  return {
    extensions,
    getExtensionsLoading,
  };
};

export const useConnectExtension = () => {
  const [connectedExtension, setConnectedExtension] = useState<ConnectedExtension | undefined>(undefined);

  const onConnectExtension = async (extension: Extension) => {
    try {
      const connection = await extension.instant.enable(APP_NAME);
      const currentAccounts = await connection.accounts.get();

      const accounts: Account[] = currentAccounts.map((account: any) => ({
        name: account.name,
        address: account.address,
      }));

      const nextConnectedExtension = {
        ...extension,
        accounts,
        signer: connection.signer,
      };

      setConnectedExtension(nextConnectedExtension);
      storageHelper.saveWallet(extension.id);
    } catch (err: any) {
      message.error({
        content: err,
      });
    }
  };

  return { connectedExtension, onConnectExtension };
};

export const useAccount = (connectedExtension?: ConnectedExtension) => {
  const [account, setAccount] = useState<Account | undefined>(undefined);

  const onSelectAccount: MenuProps['onClick'] = ({ key }) => {
    if (connectedExtension) {
      const selectedAccount = connectedExtension.accounts.find((account) => account.address === key);
      setAccount(selectedAccount);
      storageHelper.saveAccount(selectedAccount?.address || '');
    }
  };

  useEffect(() => {
    const { accounts } = connectedExtension || {};

    if (accounts) {
      const initAccountAddress = storageHelper.getSavedAccount();
      const initFirstAccount = () => {
        setAccount(accounts[0]);
        storageHelper.saveAccount(accounts[0]?.address);
      };

      if (initAccountAddress) {
        const initAccount = accounts.find((account) => account.address === initAccountAddress);

        if (initAccount) {
          setAccount(initAccount);
        } else {
          initFirstAccount();
        }
      } else {
        initFirstAccount();
      }
    }
  }, [connectedExtension]);

  return { account, onSelectAccount };
};

export const useEmail = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  return {
    email,
    setEmail,
    emailError,
    setEmailError,
  };
};

export const usePay = () => {
  const [paymentError, setPaymentError] = useState('');
  const [paying, setPaying] = useState(false);

  const handlePay = async ({
    account,
    connectedExtension,
    payment,
    onPaymentSuccess,
    email,
  }: {
    email: string;
    payment: Payment;
    account: Account;
    connectedExtension: ConnectedExtension;
    onPaymentSuccess: Function;
  }) => {
    setPaymentError('');
    setPaying(true);

    try {
      await service.pay(payment, { ...account, signer: connectedExtension?.signer }, email);
      onPaymentSuccess();
    } catch (err: any) {
      const errorMessage = getErrorMessage(err);
      setPaymentError(errorMessage);
    } finally {
      setPaying(false);
    }
  };

  return { handlePay, paying, paymentError };
};

export const useFlexiblePrice = (checkout: CheckoutResponse) => {
  const {
    item: {
      price: { type: priceType, preset: presetPrice, minimum: minPrice, maximum: maxPrice },
    },
    assetId,
    networkId,
  } = checkout;

  const asset = { assetId, networkId };

  const { numberFlexiblePrice, numberMinPrice, numberMaxPrice } = useMemo(() => {
    if (priceType === 'fixed') {
      return {};
    } else {
      const getNumPrice = (price: string | undefined) => {
        return price ? priceFormatHelper.formatBalance(price, asset) : undefined;
      };
      return {
        numberFlexiblePrice: getNumPrice(presetPrice),
        numberMinPrice: getNumPrice(minPrice),
        numberMaxPrice: getNumPrice(maxPrice),
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceType, presetPrice, minPrice, maxPrice, assetId, networkId]);

  const [numFlexPrice, setNumFlexPrice] = useState<NumFlexPrice>(() => {
    return numberFlexiblePrice ?? null;
  });

  const [flexPriceValid, setFlexPriceValid] = useState<FlexPriceValid>(true);

  const validateFlexPrice = (price: number | null) => {
    let priceValid: FlexPriceValid = true;

    if (!price) {
      priceValid = 'Price is Required!';
    } else if (isPriceTooLong(price)) {
      priceValid = 'Decimal path is too long!';
    } else {
      if (numberMinPrice && price < numberMinPrice) {
        priceValid = `Price must be greater or equal to ${priceFormatHelper.exponentToStringDecimals(numberMinPrice)}`;
      }

      if (numberMaxPrice && price > numberMaxPrice) {
        priceValid = `Price must be less than or equal to ${priceFormatHelper.exponentToStringDecimals(
          numberMaxPrice,
        )}`;
      }
    }
    setFlexPriceValid(priceValid);
    return priceValid;
  };

  const onNumFlexPriceChange = (price: number | null) => {
    validateFlexPrice(price);

    const stringPrice = priceFormatHelper.toSmallestUnit(price || 0, asset);
    if (stringPrice) {
      const roundedPrice = priceFormatHelper.formatBalance(stringPrice, asset);
      setNumFlexPrice(roundedPrice);
    }
  };

  return {
    numFlexPrice,
    onNumFlexPriceChange,
    flexPriceValid,
    validateFlexPrice,
  };
};

export const useInitWallet = (
  extensions: ExtensionDictionary,
  getExtensionsLoading: boolean,
  onConnectExtension: (extension: Extension) => Promise<void>,
) => {
  const [initWalletLoading, setInitWalletLoading] = useState(true);

  useEffect(() => {
    if (!getExtensionsLoading) {
      const init = async () => {
        const initExtensionId = storageHelper.getSavedWallet();
        if (initExtensionId) {
          const initExtension = extensions[initExtensionId];
          if (initExtension) {
            await onConnectExtension(initExtension);
          } else {
            storageHelper.deleteSavedWallet();
            storageHelper.deleteSavedAccount();
          }

          setInitWalletLoading(false);
        } else {
          setInitWalletLoading(false);
        }
      };

      init();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getExtensionsLoading, extensions]);

  return initWalletLoading;
};
