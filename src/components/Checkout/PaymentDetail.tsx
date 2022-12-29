import ConnectAccount from "components/ConnectAccount";
import styled from "styled-components";
import { useState } from "react";
import { Button, Typography } from "antd";
import { createTransferTx } from 'api/chain-connection';
import { NETWORKS } from "config";

const Wrapper = styled.div`

`;

export default function PaymentDetail({
  checkout,
}: any) {
  const [account, setAccount] = useState();
  const [paying, setPaying] = useState(false);

  const handleAccountConnected = (account: any) => {
    setAccount(account);
  };

  const handlePay = async (e: any) => {
    setPaying(true);
    await createTransferTx(NETWORKS.westend.endpoints.rpc, account, '5ERjkQVj8M7v5UVZQ8qTbZ2qb1o5TgNXq9tXt2BsWF9jBpDu', 1000);
    setPaying(false);
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
        loading={paying}
        onClick={handlePay}
      >Pay</Button>
    }
  </Wrapper>
}