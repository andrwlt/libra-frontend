import ConnectAccount from "components/ConnectAccount";
import styled from "styled-components";
import { useState } from "react";
import { Button, Typography } from "antd";
import { NETWORKS } from "config";
import Account from "components/account/Account";
import { Checkout as CheckoutDataType } from "types";

const Wrapper = styled.div`

`;

interface PaymentDetailProps {
  loading?: boolean;
  checkout: CheckoutDataType;
  onPay?: Function;
}

export default function PaymentDetail({
  loading = false,
  checkout,
  onPay,
}: PaymentDetailProps) {
  const [account, setAccount] = useState();

  const handleAccountConnected = (account: any) => {
    setAccount(account);
  };

  return <Wrapper>
    <Typography.Title level={4}>Payment method</Typography.Title>
    <ConnectAccount onAccountConnected={handleAccountConnected}/>
    {
      account && 
      <Button
        style={{ marginTop: '24px' }}
        type='primary'
        size='large'
        block
        loading={loading}
        onClick={() => { onPay && onPay({ account })}}
      >Pay</Button>
    }
  </Wrapper>
}