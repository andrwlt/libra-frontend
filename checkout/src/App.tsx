import Checkout from 'components/Checkout';
import styled from 'styled-components';

const checkout = {
  id: '01ARZ3NDEKTSV4RRFFQ69G5FAV',
  brand: {
    name: 'Andrew',
  },
  item: {
    name: 'Year-end party at somewhere',
    description: '',
    price: 10000000000,
    images: [
      'https://picsum.photos/300/400.webp',
    ],
  },
  asset: 'WND',
  payee: '5ERjkQVj8M7v5UVZQ8qTbZ2qb1o5TgNXq9tXt2BsWF9jBpDu',
  status: 'active',
};

const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

function App() {
  return (
    <AppWrapper className="App">
      <Checkout checkout={checkout}/>
    </AppWrapper>
  );
}

export default App;