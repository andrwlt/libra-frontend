import { useEffect, useState } from "react";
import Checkout from "../components/Checkout";
import api from "../api";
import styled from "styled-components";
import PaymentModal from "components/PaymentModal";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default function CheckoutPage() {
  const [checkout, setCheckout] = useState<any>(null);
  const [isPaymentModalOpened, setIsPaymentModalOpened]  = useState<boolean>(false);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      const checkoutData = await api.getCheckout();
      setCheckout(checkoutData)
    };

    fetchCheckoutData();
  }, []);

  const handleCheckout = (payload: any) => {
    setIsPaymentModalOpened(true);
  };

  return (
    <Wrapper>
      {
        checkout && <Checkout
          branding={checkout.branding}
          items={checkout.items}
          onCheckout={handleCheckout}
        />
      }
      { checkout && <PaymentModal opened={isPaymentModalOpened} orderAmount={checkout.total} currency={checkout.currency}/>}
    </Wrapper>
  );
}
