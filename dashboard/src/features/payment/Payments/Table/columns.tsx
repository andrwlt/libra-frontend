import { Space, Avatar, Badge, theme } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Charge as ChargeDataType } from 'features/payment/types';
import { truncate } from 'utils/format/formatText';
import subscan from 'utils/subscan';
import { ASSET_METADATA } from 'config';
import { formatBalance } from 'utils/format/balance';

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

const ChargeStatus = ({ status }: { status: string }) => {
  const color = useChargeStatusColor(status);
  return <Badge count={status} color={color} style={{ textTransform: 'capitalize' }} />;
};

const columns: ColumnsType<ChargeDataType> = [
  {
    key: 'hash',
    title: 'Hash',
    render: ({ asset, hash }) => <a href={subscan.getTxUrl(asset, hash)}>{truncate(hash)}</a>,
  },
  {
    key: 'status',
    title: 'Status',
    render: ({ status }) => <ChargeStatus status={status} />,
  },
  {
    key: 'from',
    title: 'Customer',
    render: ({ asset, from }) => <a href={subscan.getAccountUrl(asset, from)}>{truncate(from)}</a>,
  },
  {
    key: 'amount',
    title: 'Amount',
    render: ({ asset, amount }) => {
      const assetMetadata = ASSET_METADATA[asset];
      return (
        <Space align="center">
          {assetMetadata && (
            <Avatar src={assetMetadata.logo} size="small">
              {asset}
            </Avatar>
          )}
          <span>
            {' '}
            {formatBalance(amount, asset)} {ASSET_METADATA[asset].symbol}
          </span>
        </Space>
      );
    },
  },
  {
    key: 'description',
    title: 'Description',
    render: ({ receiptEmail }) => <span style={{ color: '#4096ff', cursor: 'pointer' }}>{receiptEmail}</span>,
  },
];

export default columns;
