import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Table, Typography, Badge, theme } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Charge as ChargeDataType } from 'types';
import { truncate } from 'utils/format/address';
import { useAccount } from 'contexts/account';
import { useApi } from 'contexts/api';

const useChargeStatusColor = (status: string) => {
  const {
    token: { colorSuccess, colorPrimary, colorError },
  } = theme.useToken();

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

  return <Badge count={value} color={color} style={{ textTransform: 'capitalize' }} />;
};

const columns: ColumnsType<ChargeDataType> = [
  {
    key: 'hash',
    title: 'Hash',
    dataIndex: 'hash',
    render: (hash) => <a>{truncate(hash)}</a>,
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    render: (status) => <ChargeStatus value={status} />,
  },
  {
    key: 'from',
    title: 'Customer',
    dataIndex: 'from',
    render: (address) => <a>{truncate(address)}</a>,
  },
  {
    key: 'amount',
    title: 'Amount',
    className: 'column-money',
    dataIndex: 'amount',
    align: 'right',
  },
  {
    key: 'asset',
    dataIndex: 'asset',
    align: 'center',
  },
  {
    key: 'description',
    title: 'Description',
    dataIndex: 'description',
  },
];

const Wrapper = styled.div`
  padding: 32px;
`;

export default function Payments() {
  const { getCharges } = useApi();
  const [charges, setCharges] = useState<ChargeDataType[]>([]);
  const [loading, setLoading] = useState(false);
  const { account } = useAccount();

  useEffect(() => {
    const fetchCharges = async () => {
      setLoading(true);

      try {
        const data = await getCharges();
        setCharges(data);
      } catch (err) {}

      setLoading(false);
    };

    account && fetchCharges();
  }, [account]);

  return (
    <Wrapper>
      <Table
        loading={loading}
        columns={columns}
        dataSource={charges}
        rowKey="id"
        title={() => <Typography.Title level={3}>Payments</Typography.Title>}
      />
    </Wrapper>
  );
}
