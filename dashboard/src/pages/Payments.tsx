import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Table, Typography, Badge, theme, Card, Button, Result } from 'antd';
import { WalletOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Charge as ChargeDataType } from 'types';
import { truncate } from 'utils/format/address';
import { useAccount } from 'contexts/account';
import { useApi } from 'contexts/api';
import { useNavigate } from 'react-router-dom';
import subscan from 'utils/subscan';

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
    render: (hash, { asset }) => <a href={subscan.getTxUrl(asset, hash)}>{truncate(hash)}</a>,
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
    render: (address, { asset }) => <a href={subscan.getAccountUrl(asset, address)}>{truncate(address)}</a>,
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
  max-width: 1440px;
  margin: auto;
`;

export default function Payments() {
  const { getCharges, getListCheckout } = useApi();
  const [charges, setCharges] = useState<ChargeDataType[]>([]);
  const [hasCheckout, setHasCheckout] = useState(false);
  const [loading, setLoading] = useState(true);
  const { account } = useAccount();
  const navigate = useNavigate();

  const {
    token: { boxShadow },
  } = theme.useToken();

  useEffect(() => {
    const fetchCharges = async () => {
      setLoading(true);

      try {
        const [chargesData, checkoutData] = await Promise.all([getCharges(), getListCheckout()]);
        setCharges(chargesData);
        if (checkoutData.length > 0) {
          setHasCheckout(true);
        }
      } catch (err) {}

      setLoading(false);
    };

    account && fetchCharges();
  }, [account, getCharges, getListCheckout]);

  const subTitle = hasCheckout
    ? 'To accept payments from your customers, you need to share your checkout link with your customers first.'
    : 'To accept payments from your customers, you need to create a checkout first.';

  const goToCheckout = () => {
    navigate('/checkout');
  };

  const createCheckout = () => {
    navigate('/checkout/new');
  };

  return (
    <Wrapper>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px' }}>
        <Typography.Title level={4}>Payments</Typography.Title>
      </div>
      {loading || charges.length > 0 ? (
        <Table style={{ boxShadow }} loading={loading} columns={columns} dataSource={charges} rowKey="id" />
      ) : (
        <Card style={{ boxShadow }}>
          <Result
            style={{ maxWidth: '480px', margin: 'auto' }}
            icon={<WalletOutlined />}
            title="Your received payments will show here"
            subTitle={subTitle}
            extra={[
              hasCheckout ? (
                <Button type="primary" onClick={goToCheckout}>
                  Get checkout links
                </Button>
              ) : (
                <Button type="primary" onClick={createCheckout}>
                  Create checkout
                </Button>
              ),
            ]}
          ></Result>
        </Card>
      )}
    </Wrapper>
  );
}
