import BrandingStep from "./Branding";
import CreateProduct from "./CreateProduct";
import { Button, Steps } from "antd";
import styled from "styled-components";
import { useState } from "react";
import Delivery from "./Delivery";
import { Branding } from "../../types";
import Congratulation from "./Congratulation";


const Header = styled.div`
  max-width: 1160px;
  padding: 32px;
  margin-left: auto;
  margin-right: auto;
`;

const Footer = styled.div`
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
  justify-content: center;
  display: flex;
  padding: 16px 32px;
  border-top: solid 1px #f7f7f7;
`;

const FooterContent = styled.div`
  display: flex;
  width: 100%;
  max-width: 1440px;
  padding: 0 32px;
  justify-content: center;
`;

const Content = styled.div`
  height: calc(100vh - 120px);
  max-width: 1440px;
  padding: 0 32px;
  margin-left: auto;
  margin-right: auto;
`;

const steps = [
  {
    title: 'Branding',
  },
  {
    title: 'Product',
  },
  {
    title: 'Delivery',
  },
  {
    title: 'Done',
  },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [branding, setBranding] = useState<Branding>({
    name: 'John&Doe',
  });

  const onNext = () => {
    setStep(step + 1);
  };

  const openDashboard = () => {

  };

  return (
    <>
      <Header>
        <Steps
          size="small"
          current={step}
          items={steps}
        />
      </Header>
      <Content>
        { step === 0 && <BrandingStep value={branding} onChange={(value: Branding) => setBranding(value)}></BrandingStep>}
        { step === 1 && <CreateProduct branding={branding}/>}
        { step === 2 && <Delivery/>}
        { step === 3 && <Congratulation/>}
      </Content>
      <Footer>
        <FooterContent>
          { step < 3 && <Button type="primary" size="large" onClick={onNext}>Next</Button>}
          { step === 3 && <Button type="primary" size="large" onClick={openDashboard}>Open dashboard</Button>}
        </FooterContent>
      </Footer>
    </>
  );
}