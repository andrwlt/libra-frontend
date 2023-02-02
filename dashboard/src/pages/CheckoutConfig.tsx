import { Button, Row, Col, Space, Typography, Tabs, theme } from 'antd';
import type { TabsProps } from 'antd';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Preview from 'components/Preview';
import Checkout from 'components/Checkout';
import { useAccount } from 'contexts/account';

const Wrapper = styled.div`
  display: flex;
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  width: calc(100vw - 480px);
  padding: 0 64px;
`;

const BrandingForm = () => {
  return <></>
};

const ProductForm = () => {
  return <></>
};

const AfterPaymentForm = () => {
  return <></>
};

interface CheckoutConfigProps {
  checkout: any;
  onUpdate: Function;
}

const ConfigForm = ({ checkout, onUpdate }: CheckoutConfigProps) => {
  const items: TabsProps['items'] = [
    {
      key: 'branding',
      label: 'Branding',
      children: <BrandingForm/>,
    },
    {
      key: 'product',
      label: `Product`,
      children: <ProductForm/>,
    },
    {
      key: 'afterPayment',
      label: `After Payment`,
      children: <AfterPaymentForm/>,
    },
  ];

  return <Tabs items={items}></Tabs>
};

export default function CheckoutConfig() {
  const { token: { boxShadow, colorBgBase, colorBorder } } = theme.useToken();
  const { account } = useAccount();
  const [branding, setBranding] = useState({
    name: '',
  });
  const [item, setItem] = useState({
    name: '',
    images: [],
    price: 0,
  });

  const checkout = { branding, payee: account?.address || '', item, asset: 'WND' };

  return (
    <Wrapper style={{ display: 'flex' }}>
      
      <div
        style={{
          height: 'calc(100vh - 64px)',
          width: '480px',
          paddingLeft: '32px',
          background: colorBgBase,
          boxShadow,
        }}
      >
        <Typography.Title level={4}>New checkout</Typography.Title>
        <ConfigForm checkout={checkout} onUpdate={() => {}}/>

        <Space style={{ marginTop: '24px' }}>
          <Button>Cancel</Button>
          <Button type='primary'>
            Save
          </Button>
        </Space>
      </div>

      <PreviewContainer>
        <Typography.Title level={4}>Preview</Typography.Title>
        <Preview width={600} height={400}>
          <Checkout checkout={checkout}></Checkout>
        </Preview>
      </PreviewContainer>
    </Wrapper>
  );
}
