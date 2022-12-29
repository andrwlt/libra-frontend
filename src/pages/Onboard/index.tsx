
import { Button, Row, Col, Space } from "antd";
import styled from "styled-components";
import { useState } from "react";
import Preview from "components/Preview";
import Checkout from "components/Checkout";
import Steps from "./Steps";
import BrandingForm from './BrandingForm';
import ProductFrom from "./ProductForm";
import Congratulation from "./Congratulation";
import logo from '../../logo.svg';

import { Brand, LineItem } from "../../types";

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

const NextButtonWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
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
  'Start selling'
];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [brand, setBrand] = useState<Brand>({
    name: '',
  });
  const [product, setProduct] = useState<LineItem>({
    name: '',
    price: 0,
    images: [],
  });

  const handleOnNext = () => {
    setStep(step + 1);
  };

  const handleOnBack = () => {
    setStep(step - 1);
  };

  const checkout = {
    brand,
    payee: '',
    items: [product],
    amount: product.price,
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
              step === 2 && <ProductFrom assets={[]} value={product} onChange={(value: LineItem) => setProduct(value)}></ProductFrom>
            }
            {
              step === steps.length && <Congratulation/>
            }
          </Col>
          <Col span={2}>
            <NextButtonWrapper>
              { step < steps.length && <Button type="primary" size="large" onClick={handleOnNext}>Next</Button> }
            </NextButtonWrapper>
          </Col>
        </Row>
      </Header>
      <Content>
        <Preview>
          <Checkout checkout={checkout}></Checkout>
        </Preview>
      </Content>
    </>
  );
}