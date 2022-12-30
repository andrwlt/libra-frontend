import { useEffect, useState } from "react";
import styled from "styled-components";
import { Table, Typography, Badge, theme } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Checkout as CheckoutDataType } from "types";
import shortStr from "utils/shortStr";

import api from 'api';

const useCheckoutStatusColor = (status: string) => {
  const {token: {
    colorSuccess,
  }} = theme.useToken();

  return colorSuccess;
};
interface CheckoutStatusProps {
  value: string;
}

const CheckoutStatus = ({ value }: CheckoutStatusProps) => {
  const color = useCheckoutStatusColor(value);

  return <Badge count={value} color={color} style={{ textTransform: 'capitalize' }}/>
};

const columns: ColumnsType<CheckoutDataType> = [
  {
    title: 'URL',
    dataIndex: 'id',
    render: (id) => <Typography.Link copyable ellipsis>https://checkout.golibra.xyz/{id}</Typography.Link>
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (status) => <CheckoutStatus value={status}/>
  },
  {
    title: 'Name',
    dataIndex: 'items',
    align: 'center',
    render: (items) => <Typography>{items[0]?.name}</Typography>
  },
  {
    title: 'Price',
    dataIndex: 'amount',
    align: 'right',
  },
  {
    dataIndex: 'asset',
  },
  {
    title: 'Wallet',
    dataIndex: 'payee',
    render: (address) => <a>{shortStr(address)}</a>,
  },
];

const Wrapper = styled.div`
  padding: 32px;
`;

export default function Checkout() {
  const [checkoutList, setCheckoutList] = useState<CheckoutDataType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCheckoutList = async () => {
      setLoading(true);

      try {
        const data = await api.getCheckoutList();
        setCheckoutList(data);
      } catch (err) {

      }

      setLoading(false);
    };

    fetchCheckoutList();
  }, []);

  return (
    <Wrapper>
      <Table
        loading={loading}
        columns={columns}
        dataSource={checkoutList}
        title={() => <Typography.Title level={3}>Checkout</Typography.Title>}
      />
    </Wrapper>
  );
}
