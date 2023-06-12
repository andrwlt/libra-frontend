import { Fragment, useContext } from 'react';
import { Typography, Button, Dropdown, Form } from 'antd';
import { AccountOption, Payment as PaymentType, FlexPriceValid, NumFlexPrice, PriceType } from '@atscale/libra-ui';
import { validateEmail } from 'utils/validator';
import { ContactInformation } from '@atscale/libra-ui';
import SelectWallet from 'components/Payment/SelectWallet';
import ExtensionContext from 'context';
import styled from 'styled-components';
import { useAccount, useEmail, usePay } from 'hooks';
import NetworkInfo from './NetworkInfo';

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

const { Title, Text } = Typography;

const Payment = ({
  payment,
  onPaymentSuccess,
  validateFlexPrice,
  priceType,
  numFlexPrice,
}: {
  payment: PaymentType;
  onPaymentSuccess: Function;
  validateFlexPrice: (price: NumFlexPrice) => FlexPriceValid;
  priceType: PriceType;
  numFlexPrice: NumFlexPrice;
}) => {
  const { connectedExtension } = useContext(ExtensionContext);
  const { account, onSelectAccount } = useAccount(connectedExtension);
  const { paymentError, handlePay, paying } = usePay();
  const { email, setEmail, emailError, setEmailError } = useEmail();

  const onPay = () => {
    const isEmailValid = validateEmail(email);
    if (isEmailValid !== true) {
      setEmailError(isEmailValid);
      return;
    }

    if (priceType === 'flexible') {
      const isPriceValid = validateFlexPrice(numFlexPrice);
      if (isPriceValid !== true) {
        return;
      }
    }

    if (connectedExtension && account && onPaymentSuccess) {
      handlePay({ connectedExtension, account, payment, onPaymentSuccess, email });
    }
  };

  return (
    <div style={{ width: 380, maxWidth: 380, marginLeft: 80 }}>
      {!connectedExtension ? (
        <SelectWallet />
      ) : (
        <Fragment>
          <ContactInformation
            productName={payment.productName}
            value={email}
            onChange={setEmail}
            error={emailError}
            resetError={() => setEmailError('')}
          />

          <Wrapper>
            <Form layout="vertical">
              <Title level={4}>Payment Method </Title>
              <NetworkInfo asset={payment.asset} />

              <Form.Item label="Account">
                {connectedExtension.accounts.length ? (
                  <Dropdown
                    trigger={['click']}
                    menu={{
                      items: connectedExtension.accounts.map((account) => ({
                        key: account.address,
                        label: <AccountOption account={account} noPadding />,
                      })),
                      onClick: onSelectAccount,
                    }}
                  >
                    <div onClick={(e) => e.preventDefault()}>
                      {account && <AccountOption variant="select" account={account} />}
                    </div>
                  </Dropdown>
                ) : (
                  <Text type="warning">You need to create an account to start using Libra</Text>
                )}

                <Button
                  disabled={!account}
                  style={{ marginTop: 32, marginBottom: 8 }}
                  type="primary"
                  size="large"
                  block
                  loading={paying}
                  onClick={onPay}
                >
                  Pay
                </Button>
                {paymentError && <Typography.Text type="danger">{paymentError}</Typography.Text>}
              </Form.Item>
            </Form>
          </Wrapper>
        </Fragment>
      )}
    </div>
  );
};

export default Payment;
