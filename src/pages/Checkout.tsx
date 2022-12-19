import { useEffect, useState } from "react";
import Checkout from "../components/Checkout";
import api from "../api";
import { LineItem } from "../types";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default function CheckoutPage() {
  const [branding, setBranding] = useState({
    name: '',
  });
  const [items, setItems] = useState<LineItem[]>([]);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      const checkoutData = await api.getCheckoutData();
      setBranding(checkoutData.branding);
      setItems(checkoutData.items);
    };

    fetchCheckoutData();
  }, []);

  return (
    <Wrapper>
      <Checkout branding={branding} items={items}></Checkout>
    </Wrapper>
  );
}
