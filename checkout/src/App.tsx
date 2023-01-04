import Checkout from 'components/Checkout';
import styled from 'styled-components';

const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

function App() {
  return (
    <AppWrapper className="App">
      <Checkout checkout={(window as any).checkout}/>
    </AppWrapper>
  );
}

export default App;
