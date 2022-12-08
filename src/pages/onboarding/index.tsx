import Branding from "./Branding";
import CreateProduct from "./CreateProduct";
import { Button, Steps } from "antd";
import { Progress } from 'antd';
import styled from "styled-components";
import { useState } from "react";

const Footer = styled.div`
  display: flex;
  width: 100vw;
  position: fixed;
  justify-content: center;
  bottom: 0;
  left: 0;
  padding: 16px 32px;
  border-top: solid 1px #f7f7f7;
`;

const FooterContent = styled.div`
  display: flex;
  width: 100%;
  max-width: 1280px;
  justify-content: center;
`;

const Content = styled.div`
  height: calc(100vh - 120px);
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
`;

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [branding, setBranding] = useState(null);

  const onNext = () => {
    setStep(step + 1);
  };

  return (
    <>
      <Progress percent={((step + 1) / 4) * 100} strokeLinecap='square' showInfo={false}></Progress>
      <Content>
        {/* { step === 0 && <Branding></Branding>} */}
        { step === 0 && <CreateProduct/>}
      </Content>
      <Footer>
        <FooterContent>
          <Button type="primary" size="large" onClick={onNext}>Next</Button>
        </FooterContent>
      </Footer>
    </>
  );
}