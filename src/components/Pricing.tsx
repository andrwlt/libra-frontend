import styled from "styled-components";
import { Currency } from "../types";
import { Avatar, Typography, Space, Skeleton } from "antd";

const { Title, Paragraph } = Typography;

interface PricingProps {
  amount?: number;
  currency?: Currency;
  hasLogo?: boolean;
  isLoading?: boolean;
  size?: 'normal' | 'large';
}

const CurrencyLogo = styled(Avatar)`
  height: 20px;
  width: 20px;
  margin-bottom: 0.7em;
`;

export default function Pricing({
  amount,
  currency,
  hasLogo = false,
  size = 'large'
}: PricingProps) {
  if (size === 'large') {
    return <Space align="end" size={4}>
      <CurrencyLogo size='small' src={currency?.logo}/>
      <Title level={5} style={{ marginBottom: '0.5em' }} >{ amount }</Title>
      <Title level={5} style={{ marginBottom: '0.5em' }}>{ currency?.symbol }</Title>
    </Space>;
  }

  return <Space size={4} align="start">
    { hasLogo && <CurrencyLogo size='small' src={currency?.logo}>{currency?.symbol}</CurrencyLogo> }
    <Paragraph style={{ marginBottom: '0.5em', fontSize: '12px' }}>{ amount }</Paragraph>
    <Paragraph style={{ marginBottom: '0.5em', fontSize: '12px' }}>{ currency?.symbol }</Paragraph>
  </Space>;
}