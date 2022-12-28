import styled from "styled-components";
import { Typography, Divider, Button } from "antd";
import Pricing from "components/Pricing";
import { Currency } from "types";
import { useState } from "react";

const { Title } = Typography;

const Wrapper = styled.div`

`;

const Line = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 16px;
  margin-top: -8px;
  display: flex;
  justify-content: space-between;
`;

const Header = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
`;

const Footer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-top: 48px;
  padding-bottom: 16px;
`;

interface PaymentDetailProps {
  orderAmount: number;
  currency: Currency;
  onPaymentSuccess?: Function;
}

export default function PaymentDetail({
  orderAmount,
  currency,
  onPaymentSuccess,
}: PaymentDetailProps) {
  const [estimatedGasFee] = useState<number>(0.0001);
  const [loading, setLoading] = useState<boolean>(false);

  const handlePay = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onPaymentSuccess && onPaymentSuccess();
    }, 2000);
  };

  return <Wrapper>
    <Header>
      <Title level={4}>Payment confirmation</Title>
    </Header>

    <Line>
      <Title level={5}>Order amount:</Title>
      <Pricing amount={orderAmount} currency={currency}></Pricing>
    </Line>
    <Line>
      <Title level={5}>Estimated gas fee:</Title>
      <Pricing amount={estimatedGasFee} currency={currency}></Pricing>
    </Line>
    <Divider></Divider>
    <Line>
      <Title level={5}>Total:</Title>
      <Pricing amount={estimatedGasFee + orderAmount} currency={currency}></Pricing>
    </Line>
    <Footer>
      <Button loading={loading} onClick={handlePay} type="primary" size="large" block>Pay</Button>
    </Footer>
  </Wrapper>
}