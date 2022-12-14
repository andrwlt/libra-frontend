import { Button, Typography, Input, Divider, Form } from 'antd';
import styled from 'styled-components';
import Cart from './cart';
import { Branding, LineItem } from '../types';

const { Title } = Typography;

const Wrapper = styled.div`
  width: 100%;
`;

const CheckoutHeader = styled.div`
  width: 100%;
  height: 40px;
  border-bottom: solid 1px #f7f7f7;
  padding: 0 32px;
`;

const LogoWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
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
      <Title level={5} style={{ margin: 0 }}>{name}</Title>
    </LogoWrapper>
  );
}

const CheckoutBody = styled.div`
  display: flex;
  padding: 32px;
`;

const CustomerInfo = styled.div`
  width: 50%;
  padding-right: 64px;
`;

const ContactInfoForm = styled.div`
  margin-top: 64px;
  max-width: 480px;
`;

const CartWrapper = styled.div`
  padding-left: 64px;
  width: 50%;
`;

const CheckoutButtonWrapper = styled.div`
  padding: 32px;
`;

interface CheckoutProps {
  branding: Branding;
  items: LineItem[];
  onCheckout?: Function;
}

export default function Checkout({ branding, items }: CheckoutProps) {
  return (
    <Wrapper>
      <CheckoutHeader>
        <CheckoutLogo name={branding.name} logo={branding.logo}/>
      </CheckoutHeader>
      <CheckoutBody>
        <CustomerInfo>
          <Title level={3}>Contact info</Title>
          <ContactInfoForm>
            <Form layout='vertical'>
              <Form.Item label='Email' required>
                <Input placeholder='john.doe@example.com'></Input>
              </Form.Item>
            </Form>
          </ContactInfoForm>
        </CustomerInfo>
        <Divider type='vertical'></Divider>
        <CartWrapper>
          <Cart items={items}></Cart>
          <CheckoutButtonWrapper>
            <Button block type='primary' size='large' color='natural'>Checkout</Button>
          </CheckoutButtonWrapper>
        </CartWrapper>
      </CheckoutBody>
    </Wrapper>
  );
};
