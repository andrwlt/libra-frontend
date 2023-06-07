import { Fragment, useContext, useState, useEffect, useCallback } from 'react';
import { Typography, Row, Button, Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';
import { AccountOption, EXTENSION_IDS, Payment as PaymentType, getNetwork, getExtensionId } from '@atscale/libra-ui';
import { validateEmail } from 'utils/validator';
import { ContactInformation } from '@atscale/libra-ui';
import NoExtension from 'components/Payment/NoExtension';
import ExtensionContext from 'context';
import { getErrorMessage, getNetworkLogo, isExtensionConnected, saveConnectedExtension } from 'utils';
import { APP_NAME } from 'config';
import service from 'service';
import type { MenuProps } from 'antd';
import styled from 'styled-components';
import { connectPolygonNetwork } from 'utils/evm';

const Wrapper = styled.div`
  .ant-skeleton,
  .ant-skeleton-button {
    width: 100% !important;
  }

  .option-skeleton {
    .ant-skeleton-button {
      height: 62px !important;
      border-radius: 8px !important;
    }
  }
`;

const POLYGON_CHAIN_ID = '0x89';

const { Title, Text } = Typography;

const Payment = ({ payment, onPaymentSuccess }: { payment: PaymentType; onPaymentSuccess: Function }) => {
  const { getExtensionFailed, extension } = useContext(ExtensionContext);
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [account, setAccount] = useState<any>(null);
  const [accounts, setAccounts] = useState<any>([]);
  const [signer, setSinger] = useState<any>();
  const [connectExtensionLoading, setConnectExtensionLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string>('');
  const [paying, setPaying] = useState(false);

  const { asset } = payment;
  const network = getNetwork(asset);
  const networkLogo = getNetworkLogo(network.id);
  const extensionId = getExtensionId(asset);
  const isPolkadotExtension = extensionId === 'polkadot-js';

  const connectExtension = useCallback(async () => {
    setConnectExtensionLoading(true);

    if (extension) {
      let accounts: any[] = [];

      if (isPolkadotExtension) {
        const result = await extension.instant.enable(APP_NAME);
        accounts = await result.accounts.get();
        accounts = accounts.map((account: any) => ({ ...account, type: EXTENSION_IDS.POLKADOT_JS }));
        setSinger(result.signer);
      } else {
        const accountsAddress = await extension.instant.request({
          method: 'eth_requestAccounts',
        });

        accounts = accountsAddress.map((address: string) => ({
          name: address,
          address,
          type: EXTENSION_IDS.METAMASK,
        }));
      }

      setAccounts(accounts);
      setAccount(accounts[0]);
      saveConnectedExtension(extension.id);
    }
    setConnectExtensionLoading(false);
  }, [isPolkadotExtension, extension]);

  useEffect(() => {
    if (extension && isExtensionConnected(extension.id)) {
      connectExtension();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extension]);

  const resetEmailError = () => {
    setEmailError('');
  };

  const handlePay = async () => {
    if (!extension) {
      return;
    }

    const isEmailValid = validateEmail(email);
    if (isEmailValid !== true) {
      setEmailError(isEmailValid);
      // return;
    }

    setPaymentError('');
    setPaying(true);

    try {
      if (!isPolkadotExtension) {
        const chainId = await extension.instant.request({
          method: 'eth_chainId',
        });

        if (chainId !== POLYGON_CHAIN_ID) {
          // await connectPolygonNetwork(extension, asset);
        }
      }

      await service.pay(payment, { ...account, signer }, email);

      onPaymentSuccess();
    } catch (err: any) {
      const errorMessage = getErrorMessage(err);
      setPaymentError(errorMessage);
    } finally {
      setPaying(false);
    }
  };

  const onSelectAccount: MenuProps['onClick'] = ({ key }) => {
    const selectedAccount = accounts.find((selectedAccount: any) => selectedAccount.address === key);
    setAccount(selectedAccount);
  };

  return (
    <div style={{ width: 430, maxWidth: 430, marginLeft: 50 }}>
      {getExtensionFailed ? (
        <NoExtension asset={asset} />
      ) : (
        <Fragment>
          <ContactInformation
            productName={payment.productName}
            value={email}
            onChange={setEmail}
            error={emailError}
            resetError={resetEmailError}
          />

          <Wrapper>
            <Title level={4}>{t('Payment Method')} </Title>

            <Row align="middle" style={{ marginTop: 12, marginBottom: 24 }}>
              <img alt="network" src={networkLogo} style={{ width: 20 }} />
              <Text style={{ marginLeft: 10 }}>{network.name} Network</Text>
            </Row>

            {isExtensionConnected(extensionId) && accounts.length ? (
              <div style={{ marginBottom: 24 }}>
                <Dropdown
                  trigger={['click']}
                  menu={{
                    items: accounts.map((account: any) => ({
                      key: account.address,
                      label: <AccountOption account={account} />,
                    })),
                    onClick: onSelectAccount,
                  }}
                >
                  <div onClick={(e) => e.preventDefault()}>
                    <AccountOption variant="select" account={account} />
                  </div>
                </Dropdown>

                <Button
                  disabled={!account}
                  style={{ marginTop: 32, marginBottom: 8 }}
                  type="primary"
                  size="large"
                  block
                  loading={paying}
                  onClick={handlePay}
                >
                  Pay
                </Button>
                {paymentError && <Typography.Text type="danger">{paymentError}</Typography.Text>}
              </div>
            ) : (
              <Row align="middle" style={{ marginTop: 20 }}>
                <Button
                  onClick={() => connectExtension()}
                  type="primary"
                  style={{ width: '100%' }}
                  loading={connectExtensionLoading}
                >
                  Connect wallet
                </Button>
              </Row>
            )}
          </Wrapper>
        </Fragment>
      )}
    </div>
  );
};

export default Payment;
