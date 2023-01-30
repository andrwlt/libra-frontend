import { Button, Row, Col, Space, Typography } from 'antd';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Preview from 'components/Preview';
import Checkout from 'components/Checkout';
import Steps from './Steps';
import BrandingForm from './BrandingForm';
import ProductFrom from './ProductForm';
import Congratulation from './Congratulation';
import ConnectAccountButton from 'components/account/ConnectAccountButton';
import { toSmallestUnit } from 'utils/format/balance';
import logo from 'assets/logo.svg';

import api from 'services/api';

import { Brand, LineItem } from 'types';
import { useAccount } from 'contexts/account';
import { Link } from 'react-router-dom';

const Header = styled.div`
  max-width: 1160px;
  padding: 32px;
  margin-left: auto;
  margin-right: auto;
  height: auto;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 3%), 0 1px 6px -1px rgb(0 0 0 / 2%),
    0 2px 4px 0 rgb(0 0 0 / 2%);
`;

const LogoWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 24px;
  cursor: pointer;
`;

const NextButtonWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-start;
  box-sizing: border-box;
  justify-content: flex-end;
  padding-top: 38px;
  padding-right: 16px;
`;

const Content = styled.div`
  height: 680px;
  padding: 32px;
  margin-left: auto;
  margin-right: auto;
  background: #f0f0f0;
`;

interface ValidationResult {
  error: boolean;
  messages: Record<string, string>;
}

function validateLineItem(data: any): ValidationResult {
  let error = false;
  let messages: Record<string, string> = {};

  if (!data.name) {
    error = true;
    messages.name = 'Product name is required.';
  }

  if (!data.price) {
    error = true;
    messages.price = 'Product price is required.';
  }

  return {
    error,
    messages,
  };
}

const steps = ['Setup your brand', 'Add your product', 'Start selling'];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [brand, setBrand] = useState<Brand>({
    name: '',
  });
  const [lineItem, setLineItem] = useState<LineItem>({
    name: '',
    price: 0,
    images: [],
  });
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
  const [blur, setBlur] = useState(false);
  const [checkoutURL, setCheckoutURL] = useState('');
  const [asset] = useState('WND');
  const { account } = useAccount();
  const [loading, setLoading] = useState(false);

  const handleOnNext = () => {
    setStep(step + 1);
  };

  const handleOnBack = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    if (blur) {
      const { messages } = validateLineItem(lineItem);
      console.log(messages);
      setErrorMessages(messages);
    }
  }, [lineItem, blur]);

  const checkout = {
    branding: brand,
    payee: account?.address || '',
    item: {
      ...lineItem,
      price: toSmallestUnit(lineItem.price, asset),
    },
    asset,
    metadata: {},
    afterPayment: {},
  };

  const handleCreateCheckout = async () => {
    if (!account) return;

    const { error, messages } = validateLineItem(lineItem);

    if (error) {
      setErrorMessages(messages);
      setBlur(true);
      return;
    }

    try {
      setLoading(true);

      const result = await api.createCheckout({ account, checkout });

      setCheckoutURL(`${process.env.REACT_APP_CHECKOUT_URL}/${result.id}`);

      setStep(step + 1);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header>
        <Row>
          <Col span={6}>
            <Space direction="vertical">
              <LogoWrapper>
                <Logo src={logo} alt="logo" />
              </LogoWrapper>
              <Steps current={step} items={steps} onBack={handleOnBack} />
            </Space>
          </Col>
          <Col span={16}>
            {step === 1 && (
              <BrandingForm value={brand} onChange={(value: Brand) => setBrand(value)} />
            )}
            {step === 2 && (
              <ProductFrom
                formData={lineItem}
                asset={asset}
                errors={errorMessages}
                onChange={(value: LineItem) => setLineItem(value)}
              />
            )}
            {step === steps.length && <Congratulation checkoutURL={checkoutURL} />}
          </Col>
          <Col span={2}>
            <NextButtonWrapper>
              {step === 1 && (
                <Button shape="round" type="primary" onClick={handleOnNext}>
                  Next
                </Button>
              )}
              {step === 2 && (
                <Space direction="vertical">
                  {account && (
                    <>
                      <Button
                        shape="round"
                        type="primary"
                        disabled={!account}
                        onClick={handleCreateCheckout}
                        loading={loading}
                      >
                        Create checkout
                      </Button>
                      <Typography.Paragraph style={{ margin: 0 }}>for account</Typography.Paragraph>
                    </>
                  )}
                  <ConnectAccountButton />
                </Space>
              )}
              {step === 3 && (
                <Link to="/checkout">
                  <Button shape="round" type="primary">
                    Open dashboard
                  </Button>
                </Link>
              )}
            </NextButtonWrapper>
          </Col>
        </Row>
      </Header>
      <Content>
        <Preview>
          <Checkout preview checkout={checkout}></Checkout>
        </Preview>
      </Content>
    </>
  );
}
