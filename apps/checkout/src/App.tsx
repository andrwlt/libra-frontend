import { Checkout } from '@atscale/libra-ui';

import styled from 'styled-components';

const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

function App() {
  return (
    <AppWrapper className="App">
      <Checkout previewMode={false} previewingCheckout={(window as any).checkout}></Checkout>
    </AppWrapper>
  );
}

export default App;
