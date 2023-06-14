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
  branding: { name: 'Test' },
  item: {
    name: 'Hung Test Kusama',
    price: {
      type: 'flexible',
      value: '100000000000',
      minimum: '5000000000',
      maximum: '15000000000',
      preset: '6000000000',
    },
  },
  networkId: 'nw_kusama',
  assetId: 'ast_ksm',
  payee: '5F4n3N5t3GGWmWDvrSoQryhXGQ8AayBmUUA2juS12bwdT6yJ',
  afterPayment: { type: 'message', config: { message: '' } },
  active: true,
  created: '12313',
  checkoutType: 'Donate',
};

function App() {
  const { getExtensionsLoading, extensions } = useExtensions();
  const { connectedExtension, onConnectExtension } = useConnectExtension();
  const { numFlexPrice, onNumFlexPriceChange, flexPriceValid, validateFlexPrice } = useFlexiblePrice(checkout);
  return (
    <AppWrapper className="App">
      {getExtensionsLoading ? (
        <Loading isFullPage />
      ) : (
        <ExtensionContext.Provider value={{ extensions, onConnectExtension, connectedExtension }}>
          <CheckoutComponent
            flexPriceValid={flexPriceValid}
            validateFlexPrice={validateFlexPrice}
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
