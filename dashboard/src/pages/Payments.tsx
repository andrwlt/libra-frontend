import { useEffect, useState } from "react";
import styled from "styled-components";
import { Table, Typography, Badge, theme } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Charge as ChargeDataType } from "types";
import shortStr from "utils/shortStr";

import api from 'api';

const useChargeStatusColor = (status: string) => {
  const {token: {
    colorSuccess,
    colorPrimary,
    colorError,
  }} = theme.useToken();

  if (status === 'succeeded') {
    return colorSuccess;
  }

  if (status === 'failed') {
    return colorError;
  }

  return colorPrimary;
};
interface ChargeStatusProps {
  value: string;
}

const ChargeStatus = ({ value }: ChargeStatusProps) => {
  const color = useChargeStatusColor(value);

  return <Badge count={value} color={color} style={{ textTransform: 'capitalize' }}/>
};

const columns: ColumnsType<ChargeDataType> = [
  {
    title: 'Hash',
    dataIndex: 'hash',
    render: (hash) => <a>{shortStr(hash)}</a>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (status) => <ChargeStatus value={status}/>
  },
  {
    title: 'Customer',
    dataIndex: 'from',
    render: (address) => <a>{shortStr(address)}</a>,
  },
  {
    title: 'Amount',
    className: 'column-money',
    dataIndex: 'amount',
    align: 'right',
  },
  {
    dataIndex: 'asset',
    align: 'center',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
];

const Wrapper = styled.div`
  padding: 32px;
`;

export default function Payments() {
  const [charges, setCharges] = useState<ChargeDataType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCharges = async () => {
      setLoading(true);

      try {
        const data = await api.getCharges();
        setCharges(data);
      } catch (err) {

      }

      setLoading(false);
    };

    fetchCharges();
  }, []);



  return (
    <Wrapper>
      <Table
        loading={loading}
        columns={columns}
        dataSource={charges}
        title={() => <Typography.Title level={3}>Payments</Typography.Title>}
      />
    </Wrapper>
  );
}