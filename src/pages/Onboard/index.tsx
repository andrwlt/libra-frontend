
import { Button, Row, Col, Space } from "antd";
import styled from "styled-components";
import { useState } from "react";
import { Branding, LineItem } from "../../types";
import Preview from "components/Preview";
import Checkout from "components/Checkout";
import Steps from "./Steps";
import BrandingForm from './BrandingForm';
import ProductFrom from "./ProductForm";
import Congratulation from "./Congratulation";
import logo from '../../logo.svg';

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
  'Setup your branding',
  'Add your product',
  'Start selling'
];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [branding, setBranding] = useState<Branding>({
    name: '',
  });
  const [product, setProduct] = useState<LineItem>({
    title: '',
    images: [],
  });

  const handleOnNext = () => {
    setStep(step + 1);
  };

  const handleOnBack = () => {
    setStep(step - 1);
  };

  const openDashboard = () => {

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
              step === 1 && <BrandingForm value={branding} onChange={(value: Branding) => setBranding(value)}/>
            }
            {
              step === 2 && <ProductFrom currencies={[]} value={product} onChange={(value: LineItem) => setProduct(value)}></ProductFrom>
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
          <Checkout branding={branding} items={product ? [product] : []}></Checkout>
        </Preview>
      </Content>
    </>
  );
}