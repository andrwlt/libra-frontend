import { useState } from 'react';
import styled from 'styled-components';
import { Typography, Input, Form, Row, Col, Layout, theme, Skeleton, Select } from 'antd';
import ProductInfo from './ProductInfo';
import PaymentDetail from './PaymentDetail';
import FooterLinks from '../FooterLinks';
import { Brand as BrandType, Checkout as CheckoutType } from 'types';


import getImageUrl from 'utils/getImageUrl';

const { Header, Content } = Layout;

const { Title } = Typography;

const LogoWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 14px;
`;

const LogoImage = styled.img`
  height: 24px;
`;

function CheckoutLogo({ name, logo }: BrandType) {
  if (!name && !logo) {
    return <LogoWrapper>
      <Skeleton.Button style={{ marginTop: '16px' }} active/>
    </LogoWrapper>
  }

  if (logo) {
    return (
      <LogoWrapper>
        <LogoImage src={getImageUrl(logo)} alt="brand logo"/>
      </LogoWrapper>
    );
  }

  return (
    <LogoWrapper>
      <Title style={{ margin: 0 }} level={5}>{name}</Title>
    </LogoWrapper>
  );
}

const Wrapper = styled(Layout)`
  width: 100%;
  height: 100%;
`;

const OrderSummary = styled.div`
  width: 100%;
  max-width: 460px;
  padding: 32px;
  padding-right: 64px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PaymentFormWrapper = styled.div`
  width: 100%;
  max-width: 460px;
  padding: 32px;
  padding-left: 64px;
`;

const FullHeightRow = styled(Row)`
  height: 100%;
`;

interface CheckoutProps {
  checkout: CheckoutType,
  onCheckout?: Function;
}

export default function Checkout({ checkout, onCheckout }: CheckoutProps) {
  const { brand, items } = checkout;
  const {
    token: { colorBgContainer, colorBorderSecondary },
  } = theme.useToken();

  const [email, setEmail] = useState<string>('');

  return (
    <Wrapper style={{ minHeight: '100%' }}>
      <Header style={ { background: colorBgContainer, borderBottom: `solid 1px ${colorBorderSecondary}` }}>
        <CheckoutLogo name={brand.name} logo={brand.logo}/>
      </Header>
      <Content>
        <FullHeightRow>
          <Col span={12} style={ { display: 'flex', justifyContent: 'flex-end' }}>
            <OrderSummary>
              <ProductInfo product={items[0]} asset='dot'></ProductInfo>
              <FooterLinks></FooterLinks>
            </OrderSummary>
          </Col>
          <Col style={ { background: colorBgContainer, borderLeft: `solid 1px ${colorBorderSecondary}` }} span={12}>
            <PaymentFormWrapper>
              <Title level={4}>Contact information</Title>
              <Form layout='vertical'>
                <Form.Item label='Email' required>
                  <Input value={email} onInput={(e: any) => { setEmail(e.target.value) }} placeholder='john.doe@example.com'></Input>
                </Form.Item>
              </Form>
              <PaymentDetail checkoutData={checkout}/>
            </PaymentFormWrapper>
          </Col>
        </FullHeightRow>
      </Content>
    </Wrapper>
  );
};
