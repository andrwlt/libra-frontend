import { useEffect, useState } from "react";
import Checkout from "../components/Checkout";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default function CheckoutPage() {
  const [checkout, setCheckout] = useState<any>(null);

  return (
    <Wrapper>
      {
        checkout && <Checkout checkout={checkout}/>
      }
    </Wrapper>
  );
}
