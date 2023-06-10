import { ConnectedExtension, Extension, extensionAPI, Payment } from '@atscale/libra-ui';
import { useEffect, useState } from 'react';
import { ExtensionDictionary } from 'types';
import { APP_NAME } from 'config';
import { Account } from '@atscale/libra-ui';
import { MenuProps, message } from 'antd';
import service from 'service';
import { getErrorMessage } from 'utils';

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
    }
  };

  useEffect(() => {
    if (connectedExtension) {
      setAccount(connectedExtension.accounts?.[0]);
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
