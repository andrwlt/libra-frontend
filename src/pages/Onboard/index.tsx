
import { Button, Row, Col, Space, Typography } from "antd";
import styled from "styled-components";
import { useState } from "react";
import Preview from "components/Preview";
import Checkout from "components/Checkout";
import Steps from "./Steps";
import BrandingForm from './BrandingForm';
import ProductFrom from "./ProductForm";
import Congratulation from "./Congratulation";
import ConnectAccount from "components/ConnectAccount";
import logo from '../../logo.svg';

import api from "api";

import { Brand, LineItem } from "types";

const Header = styled.div`
  max-width: 1160px;
  padding: 32px;
  margin-left: auto;
  margin-right: auto;
`;

const LogoWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 24px;
`;

const ConnectAccountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  max-width: 420px;
`;

const NextButtonWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-start;
  box-sizing: border-box;
  justify-content: flex-end;
  padding-top: 12px;
  padding-right: 16px;
`;

const Content = styled.div`
  height: 680px;
  padding: 32px;
  margin-left: auto;
  margin-right: auto;
  background: #f0f0f0;
`;

const steps = [
  'Setup your brand',
  'Add your product',
  'Connect your account',
  'Start selling'
];

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
  const [account, setAccount] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleOnNext = () => {
    setStep(step + 1);
  };

  const handleOnBack = () => {
    setStep(step - 1);
  };

  const handleCreateCheckout = async () => {
    setLoading(true);

    await api.createCheckout({
      account,
      checkout: {
        brand,
        payee: account.address,
        item: lineItem,
        asset: 'DOT',
        metadata: {},
        afterPayment: {},
      },
    });

    setLoading(false);
  };

  const handleAccountConnected = (account: any) => {
    setAccount(account);
  };

  const checkout = {
    brand,
    payee: '',
    items: [lineItem],
    amount: lineItem.price,
    asset: 'dot',
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
              <Steps
                current={step}
                items={steps}
                onBack={handleOnBack}
              />
            </Space>
          </Col>
          <Col span={16}>
            {
              step === 1 && <BrandingForm value={brand} onChange={(value: Brand) => setBrand(value)}/>
            }
            {
              step === 2 && <ProductFrom
                formData={lineItem}
                onChange={(value: LineItem) => setLineItem(value)}
              />
            }
            {
              step === 3 && <ConnectAccountWrapper>
                <Typography.Paragraph style={{ width: '100%' }} strong>
                  Choose your account to receive the payments
                </Typography.Paragraph>
                <ConnectAccount onAccountConnected={handleAccountConnected}/>
              </ConnectAccountWrapper>
            }
            {
              step === steps.length && <Congratulation/>
            }
          </Col>
          <Col span={2}>
            <NextButtonWrapper>
              { step < 3 && <Button type="primary" onClick={handleOnNext}>Next</Button> }
              { step === 3 && <Button type="primary" disabled={!account} onClick={handleCreateCheckout} loading={loading}>Create checkout</Button> }
              {
                step === 4 && <Button type="primary">Open dashboard</Button> 
              }
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