import { Typography, Tabs, Form, Input, Select, theme, message } from 'antd';
import type { TabsProps } from 'antd';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Preview from 'components/Preview';
import Checkout from 'components/Checkout';
import ImageUploader from 'components/ImageUploader';
import { useAccount } from 'contexts/account';
import { useApi } from 'contexts/api';
import { ActionBar } from './ActionBar';
import { Checkout as CheckoutType } from 'types';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div``;

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
  width: 60%;
  padding: 0 64px;
`;

const BrandingForm = () => {
  const [form] = Form.useForm();
  const handleLogoChange = () => {};

  return (
    <Form layout="vertical" form={form}>
      <Form.Item label="Name" required>
        <Input placeholder="Name of your brand" />
      </Form.Item>
      <Form.Item label="Logo">
        <ImageUploader name="Brand logo" onChange={handleLogoChange} />
      </Form.Item>
    </Form>
  );
};

const ProductForm = () => {
  const [form] = Form.useForm();

  const handleProductImageChanged = () => {};

  return (
    <Form layout="vertical" form={form}>
      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: 1 }}>
          <Form.Item label="Name" required>
            <Input placeholder="Name of your product or service" />
          </Form.Item>
          <Form.Item label="Description" required>
            <Input.TextArea placeholder="Description about your product or service" />
          </Form.Item>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '32px', justifyContent: 'center' }}>
          <ImageUploader name="Product image" onChange={handleProductImageChanged} />
        </div>
      </div>
      <Form.Item label="Price" required>
        <Input placeholder="Price of your product or service" />
      </Form.Item>
      <Form.Item label="Asset" required>
        <Select defaultValue="wnd">
          <Select.Option value="wnd">WND</Select.Option>
          <Select.Option value="dot">DOT</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

const AfterPaymentForm = () => {
  const [form] = Form.useForm();

  return (
    <Form layout="vertical" form={form}>
      <Form.Item label="Redirect URL">
        <Input placeholder="Your website URL" />
      </Form.Item>
    </Form>
  );
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
      children: <BrandingForm />,
    },
    {
      key: 'product',
      label: `Product`,
      children: <ProductForm />,
    },
    {
      key: 'afterPayment',
      label: `After Payment`,
      children: <AfterPaymentForm />,
    },
  ];

  return (
    <div style={{ width: '100%', maxWidth: '480px' }}>
      <Typography.Title level={4}>New checkout</Typography.Title>
      <Tabs items={items}></Tabs>
    </div>
  );
};

const defaultCheckout: CheckoutType = {
  branding: {},
  item: {
    name: '',
    price: 0,
    images: [],
  },
  afterPayment: {
    redirectUrl: '',
  },
  payee: '',
  asset: '',
};

export default function CheckoutConfig() {
  const {
    token: { boxShadow, colorBgBase },
  } = theme.useToken();

  const { account } = useAccount();
  const { createCheckout } = useApi();

  const [checkout, setCheckout] = useState(defaultCheckout);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (account) {
      setCheckout({ ...checkout, payee: account.address });
    }
  }, [account]);

  const handleSave = async () => {
    setLoading(true);

    try {
      await createCheckout(checkout);
      message.success('Checkout created');
      navigate('/checkout');
    } catch (err) {
      message.error('Fail to create checkout');
    }

    setLoading(false);
  };

  return (
    <Wrapper>
      <ActionBar loading={loading} onSave={handleSave} />
      <div style={{ display: 'flex' }}>
        <div
          style={{
            height: 'calc(100vh - 120px)',
            display: 'flex',
            justifyContent: 'flex-end',
            width: '40%',
            padding: '0 64px',
            background: colorBgBase,
            boxShadow,
          }}
        >
          <ConfigForm
            checkout={checkout}
            onUpdate={(value: CheckoutType) => {
              setCheckout(value);
            }}
          />
        </div>
        <PreviewContainer>
          <Typography.Title level={4}>Preview</Typography.Title>
          <Preview style={{ margin: '0' }} width={600} height={400}>
            <Checkout checkout={checkout}></Checkout>
          </Preview>
        </PreviewContainer>
      </div>
    </Wrapper>
  );
}
