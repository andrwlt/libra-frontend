import ConnectAccount from "components/ConnectAccount";
import styled from "styled-components";
import { useState } from "react";
import { Button, Typography } from "antd";

const Wrapper = styled.div`

`;

export default function PaymentDetail() {
  const [account, setAccount] = useState();

  const handleAccountConnected = (account: any) => {
    setAccount(account);
  };

  const handlePay = (e: any) => {
    console.log(e);
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
        onClick={handlePay}
      >Pay</Button>
    }
  </Wrapper>
}