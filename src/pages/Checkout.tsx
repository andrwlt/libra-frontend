import { useState } from "react";
import styled from "styled-components";
import Checkout from "../components/Checkout";

const Wrapper = styled.div`
  display: flex;
  padding: 32px;
`;

export default function CheckoutPage() {
  const [branding, setBranding] = useState({
    name: 'Andrew',
  });
  const [items, setItems] = useState([]);

  return (
    <Wrapper>
      <Checkout branding={branding} items={items}></Checkout>
    </Wrapper>
  );
}
