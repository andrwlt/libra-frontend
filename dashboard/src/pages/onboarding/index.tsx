import styled from 'styled-components';
import { useState } from 'react';
import Preview from 'components/Preview';
import CheckoutPage from 'components/Checkout';
import FullPageLoading from 'components/FullPageLoading';
import Steps from './steps/Steps';
import BrandingForm from './steps/BrandingForm';
import ProductForm from './steps/ProductForm';
import ConnectWallet from './steps/ConnectWallet';
import Congratulation from './Congratulation';
import { toSmallestUnit } from 'utils/format/balance';

import api from 'services/api';
import { Checkout as CheckoutType } from 'types';
import { theme, Button, Modal, Typography, Spin } from 'antd';
import { useExtensions } from 'contexts/extensions';
import AccountOption from 'components/account/AccountOption';

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
  const [open, setOpen] = useState(false);
  const { connectExtension, connectedExtension } = useExtensions();
  const [connectingExtension, setConnectingExtension] = useState(false);
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

  const handleConnectExtension = async () => {
    setConnectingExtension(true);

    await connectExtension('polkadot-js');

    setConnectingExtension(false);
    setOpen(true);
  };

  const handleCreateCheckout = async (account: any) => {
    setOpen(false);
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
      component: <ConnectWallet />,
      nextAction: (
        <Button type="primary" loading={connectingExtension} onClick={handleConnectExtension}>
          Connect wallet
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
      <FullPageLoading isOpen={isCreatingCheckout} message="Creating your checkout page..."></FullPageLoading>
      <Modal open={open} onCancel={() => setOpen(false)} footer={false}>
        {connectedExtension && connectedExtension.accounts.length > 0 && (
          <>
            <Typography.Title level={3}>Select an account</Typography.Title>
            <div>
              {connectedExtension.accounts.map((account: any) => (
                <AccountOption key={account.address} account={account} onClick={handleCreateCheckout} />
              ))}
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
