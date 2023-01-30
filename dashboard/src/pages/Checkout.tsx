import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Table, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import { Checkout as CheckoutDataType } from 'types';
import shortStr from 'utils/shortStr';

import api from 'services/api';
import { useAccount } from 'contexts/account';

const columns: ColumnsType<CheckoutDataType> = [
  {
    title: 'URL',
    dataIndex: 'id',
    render: (id) => (
      <Typography.Link style={{ width: '240px' }} copyable ellipsis>
        {`${process.env.REACT_APP_CHECKOUT_URL}/${id}`}
      </Typography.Link>
    ),
  },
  {
    title: 'Name',
    dataIndex: 'item',
    align: 'left',
    render: (item) => <Typography>{item?.name}</Typography>,
  },
  {
    title: 'Price',
    dataIndex: 'item',
    align: 'right',
    render: (item) => <Typography>{item?.price}</Typography>,
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

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function Checkout() {
  const [checkoutList, setCheckoutList] = useState<CheckoutDataType[]>([]);
  const [loading, setLoading] = useState(false);
  const { account } = useAccount();

  useEffect(() => {
    const fetchCheckoutList = async () => {
      setLoading(true);

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

  return (
    <Wrapper>
      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={checkoutList}
        title={() => (
          <TableHeader>
            <Typography.Title level={3}>Payments</Typography.Title>
            <Link to="/checkout/new">
              <Button type="primary" shape="round">
                Create checkout
              </Button>
            </Link>
          </TableHeader>
        )}
      />
    </Wrapper>
  );
}
