import { Button, Typography, Input, Divider, Form, Row, Col, Card, Layout, theme } from 'antd';
import styled from 'styled-components';
import Cart from './cart';
import { Branding, LineItem } from '../types';
import FooterLinks from './FooterLinks';

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

function CheckoutLogo({ name, logo }: Branding) {
  if (logo) {
    return (
      <LogoWrapper>
        <LogoImage src={logo}/>
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
  max-width: 480px;
  padding: 32px 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CustomerInfo = styled.div`
  width: 100%;
  max-width: 380px;
  padding-left: 64px;
`;

const ContactInfoForm = styled.div`
  max-width: 380px;
`;

const CheckoutButtonWrapper = styled.div`
  padding-top: 64px;
`;

const FullHeightRow = styled(Row)`
  height: 100%;
`;

interface CheckoutProps {
  branding: Branding;
  items: LineItem[];
  onCheckout?: Function;
}

export default function Checkout({ branding, items }: CheckoutProps) {
  const {
    token: { colorBgContainer, colorBorder },
  } = theme.useToken();

  return (
    <Wrapper style={{ minHeight: '100%' }}>
      <Header style={ { background: colorBgContainer, borderBottom: `solid 1px ${colorBorder}` }}>
        <CheckoutLogo name={branding.name} logo={branding.logo}/>
      </Header>
      <Content>
        <FullHeightRow>
          <Col span={12} style={ { display: 'flex', justifyContent: 'flex-end' }}>
            <OrderSummary>
              <Cart items={items}></Cart>
              <FooterLinks></FooterLinks>
            </OrderSummary>
          </Col>
          <Col style={ { background: colorBgContainer, borderLeft: `solid 1px ${colorBorder}` }} span={12}>
            <CustomerInfo>
              <ContactInfoForm>
                <Title level={4}>Contact info</Title>
                <Form layout='vertical'>
                  <Form.Item label='Email' required>
                    <Input placeholder='john.doe@example.com'></Input>
                  </Form.Item>
                </Form>
              </ContactInfoForm>
              <CheckoutButtonWrapper>
                <Button block type='primary' size='large' color='natural'>Checkout</Button>
              </CheckoutButtonWrapper>
            </CustomerInfo>
          </Col>
        </FullHeightRow>
      </Content>
    </Wrapper>
  );
};
