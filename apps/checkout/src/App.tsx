import { CheckoutComponent, Loading } from '@atscale/libra-ui';
import styled from 'styled-components';
import ExtensionContext from './context';
import { useConnectExtension, useExtensions, useFlexiblePrice } from 'hooks';
import Payment from 'components/Payment';
import { CheckoutResponse } from '@atscale/libra-ui';

const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const checkout: CheckoutResponse = {
  id: 'ckt_01h1e8q2fxqta9y3f2tnfj2wp6',
  item: {
    name: 'Payment on Polkadot Asset Hub',
    image: 'https://files.libra.atscale.xyz/file_01H3KW22KJCV7HDNWWZ511DJY6',
    description: 'Buy me coffee',
    price: { type: 'fixed', value: '1000000' },
  },
  checkoutType: 'Donate',
  networkId: 'nw_westendmint',
  assetId: 'ast_lusd',
  branding: { name: 'Libra' },
  afterPayment: { type: 'message', config: { message: '' } },
  payee: '5FurykSxW6tXacJ3PDWMZ3MDFdJMC2e9SNvYpFNbAej4hgFD',
  active: true,
  created: '12324234',
};

function App() {
  const { getExtensionsLoading, extensions } = useExtensions();
  const { connectedExtension, onConnectExtension } = useConnectExtension();
  const { numFlexPrice, onNumFlexPriceChange } = useFlexiblePrice(checkout);
  return (
    <AppWrapper className="App">
      {getExtensionsLoading ? (
        <Loading isFullPage />
      ) : (
        <ExtensionContext.Provider value={{ extensions, onConnectExtension, connectedExtension }}>
          <CheckoutComponent
            numFlexPrice={numFlexPrice}
            onNumFlexPriceChange={onNumFlexPriceChange}
            previewMode={false}
            checkoutData={checkout}
            HandlePaymentComponent={Payment}
          ></CheckoutComponent>
        </ExtensionContext.Provider>
      )}
    </AppWrapper>
  );
}

export default App;
