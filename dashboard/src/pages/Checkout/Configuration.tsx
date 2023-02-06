import { Typography, Tabs, theme, message } from 'antd';
import type { TabsProps } from 'antd';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Preview from 'components/Preview';
import Checkout from 'components/Checkout';
import { useAccount } from 'contexts/account';
import { useApi } from 'contexts/api';
import { ActionBar } from './ActionBar';
import { Checkout as CheckoutType } from 'types';
import { useNavigate, useParams } from 'react-router-dom';
import BrandingForm from './BrandingForm';
import ProductForm from './ProductForm';
import AfterPaymentForm from './AfterPaymentForm';

const Wrapper = styled.div``;

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
  width: 60%;
  padding: 0 64px;
`;

interface CheckoutConfigProps {
  checkout: CheckoutType;
  onChange: any;
}

const ConfigForm = ({ checkout, onChange = () => {} }: CheckoutConfigProps) => {
  const handleBrandingChange = (value: any) => {
    onChange({
      ...checkout,
      branding: value,
    });
  };

  const handleProductChange = (value: any) => {
    console.log(value);
    onChange({
      ...checkout,
      item: value,
    });
  };

  const handleAfterPaymentChange = (value: any) => {
    onChange({
      ...checkout,
      afterPayment: value,
    });
  };

  const items: TabsProps['items'] = [
    {
      key: 'product',
      label: `Product`,
      children: <ProductForm initialValues={checkout.item} onValuesChange={handleProductChange} />,
    },
    {
      key: 'branding',
      label: 'Branding',
      children: <BrandingForm initialValues={checkout.branding} onValuesChange={handleBrandingChange} />,
    },
    {
      key: 'afterPayment',
      label: `After Payment`,
      children: <AfterPaymentForm initialValues={checkout.afterPayment} onValuesChange={handleAfterPaymentChange} />,
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
  const { createCheckout, getCheckout } = useApi();

  const [checkout, setCheckout] = useState(defaultCheckout);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (account) {
      setCheckout({ ...checkout, payee: account.address });
    }
  }, [account]);

  useEffect(() => {
    if (id) {
      const fetchCheckout = async () => {
        const checkout = await getCheckout(id);
        if (checkout) {
          setCheckout(checkout);
        }
      };

      fetchCheckout();
    }
  }, [id]);

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

  const handleConfigChanged = (value: any) => {
    setCheckout(checkout);
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
          <ConfigForm checkout={checkout} onChange={handleConfigChanged} />
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
