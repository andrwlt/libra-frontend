import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Typography, Input, Form, Row, Col, Layout, theme, Skeleton, message } from 'antd';
import ProductInfo from './ProductInfo';
import PaymentDetail from './PaymentDetail';
import FooterLinks from 'components/FooterLinks';
import { createTransferTx } from 'utils/substrate';
import { Brand as BrandType, Checkout as CheckoutType } from 'types';
import { NETWORKS } from 'config';

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
  preview?: boolean;
  onCheckout?: Function;
}

export default function Checkout({
  checkout,
  preview = false,
}: CheckoutProps) {
  const {
    token: { colorBgContainer, colorBorderSecondary },
  } = theme.useToken();
  const [messageApi, contextHolder] = message.useMessage();

  const { brand, item, asset } = checkout;

  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    setEmailError('');
  }, [email]);

  const handlePay = async ({ account }: any) => {
    if (!email) {
      setEmailError('Email is required.');
      return;
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
      setEmailError('Invalid email.');
      return;
    }

    setPaying(true);

    try {
      const tx = await createTransferTx(
        NETWORKS.westend.endpoints.rpc,
        account,
        checkout.payee,
        checkout.item.price
      );

      const formData = new FormData();
      formData.append('email', email);
      formData.append('tx', tx);

      const response = await fetch(window.location.href, {
        body: formData,
        method: "post"
      });

      if (response.status === 200) {

      } else {
        throw new Error(response.statusText);
      }
    } catch (err: any) {
      messageApi.error(err.message);
    } finally {
      setPaying(false);
    }
  };

  return (
    <Wrapper style={{ minHeight: '100%' }}>
      { contextHolder }
      <Header style={ { background: colorBgContainer, borderBottom: `solid 1px ${colorBorderSecondary}` }}>
        <CheckoutLogo name={brand.name} logo={brand.logo}/>
      </Header>
      <Content>
        <FullHeightRow>
          <Col span={12} style={ { display: 'flex', justifyContent: 'flex-end' }}>
            <OrderSummary>
              <ProductInfo product={item} asset={asset}></ProductInfo>
              <FooterLinks></FooterLinks>
            </OrderSummary>
          </Col>
          <Col style={ { background: colorBgContainer, borderLeft: `solid 1px ${colorBorderSecondary}` }} span={12}>
            <PaymentFormWrapper>
              <Title level={4}>Contact information</Title>
              <Form layout='vertical'>
                <Form.Item
                  label='Email'
                  validateStatus={ emailError ? 'error' : undefined }
                >
                  <Input value={email} onInput={(e: any) => { setEmail(e.target.value) }} placeholder='john.doe@example.com'></Input>
                  { emailError && <Typography.Text type='danger'>{ emailError }</Typography.Text>}
                </Form.Item>
              </Form>
              <PaymentDetail loading={paying} checkout={checkout} onPay={handlePay}/>
            </PaymentFormWrapper>
          </Col>
        </FullHeightRow>
      </Content>
    </Wrapper>
  );
};
