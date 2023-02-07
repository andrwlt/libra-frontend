import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Preview from 'components/Preview';
import CheckoutPage from 'components/Checkout';
import Steps from './components/Steps';
import Congratulation from './components/Congratulation';
import { toSmallestUnit } from 'utils/format/balance';

import api from 'services/api';
import { Checkout as CheckoutType } from 'types';

const Header = styled.div`
  padding: 32px;
  margin-left: auto;
  margin-right: auto;
  height: auto;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 3%), 0 1px 6px -1px rgb(0 0 0 / 2%), 0 2px 4px 0 rgb(0 0 0 / 2%);
`;

const Content = styled.div`
  height: 680px;
  padding: 32px;
  margin-left: auto;
  margin-right: auto;
  background: #f0f0f0;
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

  const steps = [
    {
      name: 'Setup your branding',
      component: <div>Setup your branding</div>,
    },
    {
      name: 'Add your product',
      component: <div>Add your product</div>,
    },
  ];

  return (
    <>
      <Header>
        <Steps steps={steps}></Steps>
      </Header>
      <Header />
      <Content>
        <Preview>
          <CheckoutPage checkout={checkout}></CheckoutPage>
        </Preview>
      </Content>
    </>
  );
}
