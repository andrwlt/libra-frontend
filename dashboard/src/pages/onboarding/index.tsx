import styled from 'styled-components';
import { useState } from 'react';
import Preview from 'components/Preview';
import CheckoutPage from 'components/Checkout';
import Steps from './steps/Steps';
import BrandingForm from './steps/BrandingForm';
import ProductForm from './steps/ProductForm';
import AddWallet from './steps/AddWalletStep';
import Congratulation from './Congratulation';
import { toSmallestUnit } from 'utils/format/balance';

import api from 'services/api';
import { Checkout as CheckoutType } from 'types';
import { theme, Button } from 'antd';

const Header = styled.div`
  padding: 32px 64px;
  margin-left: auto;
  margin-right: auto;
  height: auto;
`;

const Content = styled.div`
  height: 680px;
  padding: 32px;
  margin-left: auto;
  margin-right: auto;
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
  asset: 'WND',
};

export default function Onboarding() {
  const [checkout, setCheckout] = useState(defaultCheckout);
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);
  const [checkoutURL, setCheckoutURL] = useState('');
  const {
    token: { boxShadow, colorBgLayout },
  } = theme.useToken();

  const handleBrandingChanged = (value: any) => {
    setCheckout({ ...checkout, branding: value });
  };

  const handleProductChanged = (value: any) => {
    setCheckout({
      ...checkout,
      item: {
        ...checkout.item,
        ...value,
      },
    });
  };

  const handlePayeeChanged = (value: string) => {
    console.log(value);
    setCheckout({ ...checkout, payee: value });
  };

  const handleCreateCheckout = async () => {
    setIsCreatingCheckout(true);

    // const result = await api.createCheckout({
    //   checkout: {
    //     ...checkout,
    //     item: {
    //       ...checkout.item,
    //       price: toSmallestUnit(checkout.item.price, checkout.asset),
    //     },
    //   },
    // });

    // setCheckoutURL(`${process.env.REACT_APP_CHECKOUT_URL}/${result.id}`);

    setTimeout(() => {
      setCheckoutURL(`${process.env.REACT_APP_CHECKOUT_URL}/test-checkout`);
      setIsCreatingCheckout(false);
    }, 1000);

    // setIsCreatingCheckout(false);
  };

  const steps = [
    {
      name: 'Add your product',
      component: (
        <ProductForm
          value={{
            name: checkout.item.name,
            description: checkout.item.description,
            price: checkout.item.price,
            asset: checkout.asset,
          }}
          onChange={handleProductChanged}
        />
      ),
    },
    {
      name: 'Setup your branding',
      component: <BrandingForm value={checkout.branding} onChange={handleBrandingChanged} />,
    },
    {
      name: 'Add your wallet',
      component: <AddWallet value={checkout.payee} onChange={handlePayeeChanged} />,
      nextAction: (
        <Button type="primary" onClick={handleCreateCheckout} loading={isCreatingCheckout}>
          Create checkout
        </Button>
      ),
    },
  ];

  if (checkoutURL) {
    return <Congratulation checkoutURL={checkoutURL}></Congratulation>;
  }

  return (
    <>
      <Header style={{ boxShadow }}>
        <Steps style={{ maxWidth: '1200px', margin: 'auto' }} steps={steps}></Steps>
      </Header>
      <Content style={{ background: colorBgLayout }}>
        <Preview>
          <CheckoutPage checkout={checkout}></CheckoutPage>
        </Preview>
      </Content>
    </>
  );
}
