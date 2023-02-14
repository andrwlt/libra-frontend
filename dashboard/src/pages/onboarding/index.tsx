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
import { formatBalance, toSmallestUnit } from 'utils/format/balance';

import api from 'services/api';
import { Checkout as CheckoutType } from 'types';
import { theme, Button, Modal, Typography } from 'antd';
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
  asset: 'wnd',
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

  const handleProductChanged = (values: any) => {
    const asset = values.asset === undefined ? checkout.asset : values.asset;
    delete values.asset;

    let price = checkout.item.price;
    if (values.price === null) price = 0;
    if (values.price) {
      price = toSmallestUnit(values.price, asset)
    };
    if (asset !== checkout.asset) {
      price = toSmallestUnit(formatBalance(price, checkout.asset), asset);
    }

    setCheckout({
      ...checkout,
      asset,
      item: {
        ...checkout.item,
        ...values,
        price,
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

    const result = await api.createCheckout({
      checkout: {
        ...checkout,
        item: {
          ...checkout.item,
          price: toSmallestUnit(checkout.item.price, checkout.asset),
        },
      },
    });

    setCheckoutURL(`${process.env.REACT_APP_CHECKOUT_URL}/${result.id}`);

    setIsCreatingCheckout(false);
  };

  const isValidCheckoutItem = checkout.item.name && checkout.item.price;

  const steps = [
    {
      name: 'Add your product',
      disabled: !isValidCheckoutItem,
      component: (
        <ProductForm
          values={{
            name: checkout.item.name,
            description: checkout.item.description,
            price: checkout.item.price === 0 ? null : formatBalance(checkout.item.price, checkout.asset),
            asset: checkout.asset,
          }}
          onChange={handleProductChanged}
        />
      ),
    },
    {
      name: 'Setup your branding',
      disabled: !checkout.branding.name,
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
