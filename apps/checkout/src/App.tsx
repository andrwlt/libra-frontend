import { CheckoutComponent, Loading } from '@atscale/libra-ui';
import styled from 'styled-components';
import ExtensionContext from './context';
import { useExtension } from 'hooks';
import Payment from 'components/Payment';
import { useMemo } from 'react';

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
  // const { checkout }: any = window;

  const asset = useMemo(() => {
    return {
      assetId: checkout.assetId,
      networkId: checkout.networkId,
    };
  }, []);

  const { getExtensionLoading, getExtensionFailed, extension } = useExtension(asset);

  return (
    <AppWrapper className="App">
      {getExtensionLoading ? (
        <Loading isFullPage />
      ) : (
        <ExtensionContext.Provider value={{ extension, getExtensionFailed }}>
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
