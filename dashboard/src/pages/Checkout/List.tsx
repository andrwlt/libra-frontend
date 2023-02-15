import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Typography, Button, Row, Col, Card, Result, Space, Avatar, theme } from 'antd';
import { ShopOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Checkout as CheckoutDataType } from 'types';
import { useNavigate } from 'react-router-dom';
import CopyableField from 'components/CopyableField';
import truncate from 'utils/truncate';
import { formatBalance } from 'utils/format/balance';
import { ASSET_METADATA } from 'config';

import api from 'services/api';
import { useAccount } from 'contexts/account';

const Wrapper = styled.div`
  padding: 32px;
  max-width: 1440px;
  margin: auto;
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

function CheckoutItem({ checkout }: any) {
  const {
    token: { boxShadow, colorError },
  } = theme.useToken();
  const navigate = useNavigate();

  const editCheckout = (id?: string) => {
    navigate(`/checkout/${id}/edit`, { state: { id } });
  };

  const deleteCheckout = (id?: string) => {
    console.log(id);
  };

  const assetMetadata = ASSET_METADATA[checkout.asset];

  return (
    <Card
      style={{ boxShadow }}
      title={checkout.item.name}
      actions={[
        <DeleteOutlined
          key="delete"
          style={{ color: colorError }}
          onClick={() => {
            deleteCheckout(checkout.id);
          }}
        />,
        <EditOutlined
          key="edit"
          onClick={() => {
            editCheckout(checkout.id);
          }}
        />,
      ]}
    >
      <Space align="center">
        {assetMetadata && (
          <Avatar src={assetMetadata.logo} size="small">
            {checkout.asset}
          </Avatar>
        )}
        <Typography.Title level={3} style={{ margin: '1rem 0' }}>
          {formatBalance(checkout.item.price, checkout.asset)} {assetMetadata ? assetMetadata.symbol : checkout.asset}
        </Typography.Title>
      </Space>
      <Typography.Paragraph>{checkout.item.description}</Typography.Paragraph>
      <CopyableField text={truncate(`${process.env.REACT_APP_CHECKOUT_URL}/${checkout.id}`, { start: 32, end: 6 })} />
    </Card>
  );
}

export default function ListCheckout() {
  const [checkoutList, setCheckoutList] = useState<CheckoutDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const { account } = useAccount();
  const navigate = useNavigate();

  const {
    token: { boxShadow },
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

  const hasCheckout = checkoutList && checkoutList.length > 0;

  return (
    <Wrapper>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '32px' }}>
        <Typography.Title style={{ margin: 0 }} level={4}>
          Checkout
        </Typography.Title>

        {hasCheckout && <Button type="primary" onClick={createCheckout}>Create checkout</Button>}
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
              <Button key="create" type="primary" onClick={createCheckout}>
                Create checkout
              </Button>,
            ]}
          ></Result>
        </Card>
      )}

      {!loading && (
        <Row gutter={[32, 32]}>
          {checkoutList.map((checkout) => (
            <Col span={8} key={checkout.id}>
              <CheckoutItem checkout={checkout}></CheckoutItem>
            </Col>
          ))}
        </Row>
      )}
    </Wrapper>
  );
}
