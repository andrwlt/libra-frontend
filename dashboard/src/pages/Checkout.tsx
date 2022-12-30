import { useEffect, useState } from "react";
import styled from "styled-components";
import { Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Checkout as CheckoutDataType } from "types";
import shortStr from "utils/shortStr";

import api from 'api';
import { useAccount } from "contexts/account";

const columns: ColumnsType<CheckoutDataType> = [
  {
    title: 'URL',
    dataIndex: 'id',
    render: (id) => <Typography.Link copyable ellipsis>https://checkout.golibra.xyz/{id}</Typography.Link>
  },
  {
    title: 'Name',
    dataIndex: 'item',
    align: 'center',
    render: (item) => <Typography>{item?.name}</Typography>
  },
  {
    title: 'Price',
    dataIndex: 'item',
    render: (item) => <Typography>{item?.price}</Typography>
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
  const { account } = useAccount();

  useEffect(() => {
    const fetchCheckoutList = async () => {
      setLoading(true);

      try {
        const data = await api.getCheckoutList(account);
        setCheckoutList(data);
      } catch (err) {

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
        loading={loading}
        columns={columns}
        dataSource={checkoutList}
        title={() => <Typography.Title level={3}>Checkout</Typography.Title>}
      />
    </Wrapper>
  );
}
