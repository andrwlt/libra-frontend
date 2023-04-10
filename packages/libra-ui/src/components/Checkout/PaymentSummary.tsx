import { useState, useEffect } from 'react';
import { Button, Typography, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import AccountInfo from '../Account/AccountInfo';
import AccountConnection from '../Account';
import { createConnection, createTransferTx } from '../../utils/substrate';
import { getSs58AddressByAsset } from '../../utils/address';
import { ExtensionsProvider } from 'contexts/extensions';
import { ASSET_METADATA } from '../../config';

async function pay(payment: Payment, account: any, email: string) {
  const { payee, amount, asset, productName } = payment;
  const assetMetadata = ASSET_METADATA[asset];
  const tx = await createTransferTx(assetMetadata.network.config.rpc, account, payee, amount, asset);

  const response = await fetch(`${window.location.href}/pay`, {
    body: JSON.stringify({
      from: getSs58AddressByAsset(account.address, asset),
      to: getSs58AddressByAsset(payee, asset),
      description: `${email} + ${productName}`,
      amount,
      asset,
      tx,
      email,
    }),
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
}

interface Payment {
  payee: string;
  amount: number;
  asset: string;
  productName: string;
}

export default function PaymentSummary({
  previewMode = true,
  payment,
  onPaymentSuccess,
  onPaymentFailed,
}: {
  previewMode: boolean;
  payment: Payment;
  onPaymentSuccess: Function;
  onPaymentFailed: Function;
}) {
  const { t } = useTranslation();
  const [paying, setPaying] = useState(false);
  const [account, setAccount] = useState(null);
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  useEffect(() => {
    const assetMetadata = ASSET_METADATA[payment.asset];
    // Preload network connection to improve speed.
    createConnection(assetMetadata.network.config.rpc);
  }, []);

  const handleAccountConnected = async (account: any) => {
    setAccount(account);
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError('Email is required.');
      return false;
    }

    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email)) {
      setEmailError('Invalid email.');
      return false;
    }

    return true;
  };

  const handlePay = async () => {
    if (previewMode) {
      setPaying(true);
      setTimeout(() => {
        setPaying(false);
      }, 1000);
    } else {
      if (validateEmail()) {
        setPaying(true);

        try {
          await pay(payment, account, email);
        } catch (err) {
          onPaymentFailed(err);
        }

        setPaying(false);
      }
    }
  };

  return (
    <div style={{ width: 380, maxWidth: 380, marginLeft: 'auto' }}>
      <Typography.Title level={4} style={{ marginBottom: 12 }}>
        {t('checkout.contactInformation')}
      </Typography.Title>

      <Form layout="vertical" requiredMark={false}>
        <Form.Item label="Email" validateStatus={emailError ? 'error' : undefined}>
          <Input
            value={email}
            onInput={(e: any) => {
              setEmail(e.target.value);
            }}
            placeholder="john.doe@example.com"
          ></Input>
          {emailError && <Typography.Text type="danger">{emailError}</Typography.Text>}
        </Form.Item>
      </Form>

      <div>
        <Typography.Title level={4}>{t('checkout.paymentMethod')} </Typography.Title>

        {previewMode && (
          <AccountInfo
            variant="select"
            account={{
              name: 'Test Account',
              address: '5ERjkQVj8M7v5UVZQ8qTbZ2qb1o5TgNXq9tXt2BsWF9jBpDu',
            }}
          />
        )}

        {!previewMode && (
          <ExtensionsProvider>
            <AccountConnection onAccountConnected={handleAccountConnected}></AccountConnection>
          </ExtensionsProvider>
        )}

        {(previewMode || !!account) && (
          <Button style={{ marginTop: 32 }} type="primary" size="large" block loading={paying} onClick={handlePay}>
            {t('checkout.pay')}
          </Button>
        )}
      </div>
    </div>
  );
}
