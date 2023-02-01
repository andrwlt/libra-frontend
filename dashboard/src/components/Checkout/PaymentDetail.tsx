import styled from 'styled-components';
import { useState } from 'react';
import { Button, Typography } from 'antd';
import Account from 'components/account/Account';

const Wrapper = styled.div``;

export default function PaymentDetail({ checkout, preview = false }: any) {
  const [paying, setPaying] = useState(false);

  const handlePay = async (e: any) => {
    setPaying(true);

    setTimeout(() => {
      setPaying(false);
    }, 1000);
  };

  return (
    <Wrapper>
      <Typography.Title level={4}>Payment method</Typography.Title>
      <Account
        variant="select"
        account={{
          name: 'Test Account',
          address: '5ERjkQVj8M7v5UVZQ8qTbZ2qb1o5TgNXq9tXt2BsWF9jBpDu',
        }}
      />
      <Button style={{ marginTop: '24px' }} type="primary" size="large" block loading={paying} onClick={handlePay}>
        Pay
      </Button>
    </Wrapper>
  );
}
