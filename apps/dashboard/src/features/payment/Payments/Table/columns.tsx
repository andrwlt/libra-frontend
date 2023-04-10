import { Space, Avatar, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Charge as ChargeDataType } from 'features/payment/types';
import { ASSET_METADATA } from 'config';
import { getCheckoutPrice, formatCreatedDate } from 'utils/format/formatText';

const getChargeStatusColor = (status: string) => {
  if (status === 'succeeded') {
    return 'green';
  }

  if (status === 'failed') {
    return 'red';
  }

  return 'blue';
};

const ChargeStatus = ({ status }: { status: string }) => {
  const color = getChargeStatusColor(status);
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: 22, marginTop: 1 }}>
      <Tag color={color} style={{ textTransform: 'capitalize' }}>
        {status}
      </Tag>
    </div>
  );
};

const columns: ColumnsType<ChargeDataType> = [
  {
    key: 'amount',
    title: 'Amount',
    render: ({ asset, amount, status }) => {
      const assetMetadata = ASSET_METADATA[asset];
      return (
        <Space align="center" size={20}>
          <span>{getCheckoutPrice({ price: amount, asset }, assetMetadata)}</span>

          <Avatar src={assetMetadata.logo} size={22}>
            {asset}
          </Avatar>

          <ChargeStatus status={status} />
        </Space>
      );
    },
    width: 400,
  },

  {
    key: 'description',
    title: 'Description',
    dataIndex: 'description',
  },

  {
    key: 'Customer',
    title: 'Customer',
    render: ({ receiptEmail }) => <span>{receiptEmail}</span>,
  },
  {
    key: 'created',
    title: 'Created',
    render: ({ created }) => <span>{formatCreatedDate(created)}</span>,
    width: 200,
  },
];

export default columns;
