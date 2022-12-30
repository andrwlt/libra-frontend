import ConnectAccount from "components/ConnectAccount";
import styled from "styled-components";
import { useState } from "react";
import { Button, Typography } from "antd";
import { createTransferTx } from 'utils/substrate';
import { NETWORKS } from "config";
import Account from "components/account/Account";
import { Checkout as CheckoutDataType } from "types";

const Wrapper = styled.div`

`;

interface PaymentDetailProps {
  checkout: CheckoutDataType;
  preview?: boolean;
}

export default function PaymentDetail({
  checkout,
  preview = false,
}: PaymentDetailProps) {
  const [account, setAccount] = useState();
  const [paying, setPaying] = useState(false);

  const handleAccountConnected = (account: any) => {
    setAccount(account);
  };

  const handlePay = async (e: any) => {
    if (preview) {
      setPaying(true);

      setTimeout(() => {
        setPaying(false);
      }, 1000);
    }

    setPaying(true);
    await createTransferTx(NETWORKS.westend.endpoints.rpc, account, checkout.payee, checkout.item.price);
    setPaying(false);
  };

  return <Wrapper>
    <Typography.Title level={4}>Payment method</Typography.Title>
    {
      preview ?
      <Account
        variant="select"
        account={ {name: 'Test Account', address: '5ERjkQVj8M7v5UVZQ8qTbZ2qb1o5TgNXq9tXt2BsWF9jBpDu'} }
      /> :
      <ConnectAccount onAccountConnected={handleAccountConnected}/>
    }
    {
      (account || preview) && 
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