import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, theme, message } from 'antd';
import styled from 'styled-components';
import Preview from 'components/Preview';
import Checkout from 'components/Checkout';
import { useAccount } from 'contexts/account';
import { useApi } from 'contexts/api';
import { ActionBar } from './components/ActionBar';
import { Checkout as CheckoutType } from 'types';
import ConfigurationForm from './components/ConfigurationForm';

const Wrapper = styled.div``;

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
  width: 60%;
  padding: 0 64px;
`;

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
  asset: 'wnd',
};

export default function CheckoutConfig() {
  const {
    token: { boxShadow, colorBgBase },
  } = theme.useToken();

  const { account } = useAccount();
  const { createCheckout, getCheckout, updateCheckout } = useApi();

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
    const fetchCheckout = async (checkoutId: string) => {
      const checkout = await getCheckout(checkoutId);
      if (checkout) {
        setCheckout(checkout);
      }
    };

    account && id && fetchCheckout(id);
  }, [account, id]);

  const handleSave = async () => {
    setLoading(true);

    if (id) {
      try {
        await updateCheckout(id, checkout);
        message.success('Checkout updated');
        navigate('/checkout');
      } catch (err) {
        message.error('Fail to update checkout');
      }
    } else {
      try {
        await createCheckout(checkout);
        message.success('Checkout created');
        navigate('/checkout');
      } catch (err) {
        message.error('Fail to create checkout');
      }
    }

    setLoading(false);
  };

  const handleConfigChanged = (value: any) => {
    setCheckout(value);
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
          <ConfigurationForm checkout={checkout} onChange={handleConfigChanged} />
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
