import { CheckoutComponent, Loading } from '@atscale/libra-ui';
import styled from 'styled-components';
import ExtensionContext from './context';
import { useConnectExtension, useExtensions } from 'hooks';
import Payment from 'components/Payment';

const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const checkout: any = {
  id: 'ckt_01h1e8q2fxqta9y3f2tnfj2wp6',
  branding: { name: 'Test' },
  item: { name: 'Hung Test Kusama', price: '1000000' },
  asset: 'ksm',
  networkId: 'nw_kusama',
  assetId: 'ast_ksm',
  payee: '5F4n3N5t3GGWmWDvrSoQryhXGQ8AayBmUUA2juS12bwdT6yJ',
  afterPayment: { type: 'message', config: { message: '' } },
};

function App() {
  const { getExtensionsLoading, extensions } = useExtensions();
  const { connectedExtension, onConnectExtension } = useConnectExtension();

  return (
    <AppWrapper className="App">
      {getExtensionsLoading ? (
        <Loading isFullPage />
      ) : (
        <ExtensionContext.Provider value={{ extensions, onConnectExtension, connectedExtension }}>
          <CheckoutComponent
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
