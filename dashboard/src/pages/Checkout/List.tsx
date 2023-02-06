import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Typography, Button, Row, Col, Card, Result, theme } from 'antd';
import { ShopOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Checkout as CheckoutDataType } from 'types';
import { useNavigate } from 'react-router-dom';
import SharableURL from 'components/SharableURL';

import api from 'services/api';
import { useAccount } from 'contexts/account';

const Wrapper = styled.div`
  padding: 32px;
`;

const Loading = () => (
  <Row gutter={16}>
    <Col span={8}>
      <Card loading></Card>
    </Col>
    <Col span={8}>
      <Card loading></Card>
    </Col>
    <Col span={8}>
      <Card loading></Card>
    </Col>
  </Row>
);

export default function ListCheckout() {
  const [checkoutList, setCheckoutList] = useState<CheckoutDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const { account } = useAccount();
  const navigate = useNavigate();

  const {
    token: { boxShadow, colorError },
  } = theme.useToken();

  useEffect(() => {
    const fetchCheckoutList = async () => {
      try {
        const data = await api.getCheckoutList(account);
        setCheckoutList(data);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };

    if (account) {
      fetchCheckoutList();
    }
  }, [account]);

  const createCheckout = () => {
    navigate('/checkout/new');
  };

  const editCheckout = (id?: string) => {
    navigate(`/checkout/${id}/edit`, { state: { id } });
  };

  const deleteCheckout = (id?: string) => {
    console.log(id);
  };

  const hasCheckout = checkoutList && checkoutList.length > 0;

  return (
    <Wrapper>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '32px' }}>
        <Typography.Title style={{ margin: 0 }} level={4}>
          Checkout
        </Typography.Title>

        {hasCheckout && <Button type="primary">Create checkout</Button>}
      </div>

      {loading && <Loading />}

      {!loading && !hasCheckout && (
        <Card style={{ boxShadow }}>
          <Result
            style={{ maxWidth: '480px', margin: 'auto' }}
            icon={<ShopOutlined />}
            title="Start selling your product"
            subTitle="To start selling your product, first you need to create checkout page to receive payments from customers."
            extra={[
              <Button type="primary" onClick={createCheckout}>
                Create checkout
              </Button>,
            ]}
          ></Result>
        </Card>
      )}

      {!loading && (
        <Row gutter={16}>
          {checkoutList.map((checkout) => (
            <Col span={8} key={checkout.id}>
              <Card
                style={{ boxShadow }}
                title={checkout.item.name}
                actions={[
                  <DeleteOutlined
                    style={{ color: colorError }}
                    onClick={() => {
                      deleteCheckout(checkout.id);
                    }}
                  />,
                  <EditOutlined
                    onClick={() => {
                      editCheckout(checkout.id);
                    }}
                  />,
                ]}
              >
                <SharableURL url={`${process.env.REACT_APP_CHECKOUT_URL}/${checkout.id}`}></SharableURL>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Wrapper>
  );
}
