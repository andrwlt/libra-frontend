import { priceFormatHelper } from '@atscale/libra-ui';
import { Typography, Table, Space, Avatar, Card } from 'antd';
import { getAssetMetadata } from '@atscale/libra-ui';
import { formatCreatedDate } from 'utils/format/formatText';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { LOCALE_WORKSPACE } from 'app/i18n';
import { NextCharge } from 'features/payment/types';
import ChargeStatus from 'features/payment/Payments/Table/ChargeStatus';
import styled from 'styled-components';

const { Title } = Typography;

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div style={{ boxShadow: 'rgb(235, 238, 241) 0px -1px 0px 0px inset', width: '100%' }}>
      <Title level={4} style={{ margin: 0, paddingBottom: 12 }}>
        {title}
      </Title>
    </div>
  );
};

const PaymentTableWrapper = styled.div`
  .ant-table-content {
    .amount-th {
      &::before {
        content: none !important;
      }

      white-space: nowrap;
    }

    .status-th {
      padding-left: 3px !important;
      padding-right: 70px;
    }
  }

  .created-cell {
    min-width: 162px !important;
  }

  @media screen and (max-width: 1350px) {
    .charge-description {
      max-width: 280px;
    }
  }
`;

const LatestPayments = ({ payments }: { payments: NextCharge[] }) => {
  const { t } = useTranslation(LOCALE_WORKSPACE.PAYMENT);
  const columns: ColumnsType<NextCharge> = [
    {
      className: 'amount-th',
      key: 'amount',
      title: t('amount'),
      width: 100,
      render: ({ assetId, networkId, amount }) => {
        const asset = { assetId, networkId };
        const assetMetadata = getAssetMetadata(asset);

        return (
          <Space>
            <Avatar src={assetMetadata.logoUrl} size={24}>
              {assetMetadata.symbol}
            </Avatar>
            {priceFormatHelper.getCheckoutPrice({ price: amount, asset }, assetMetadata)}
          </Space>
        );
      },
    },
    {
      className: 'status-th',
      title: '',
      width: 30,
      key: 'status',
      align: 'left',
      render: ({ status }) => {
        return <ChargeStatus status={status} />;
      },
    },

    {
      key: 'Customer',
      title: t('customer'),
      render: ({ receiptEmail }) => <span>{receiptEmail}</span>,
    },
    {
      key: 'description',
      title: t('description'),
      dataIndex: 'description',
      className: 'charge-description',
    },
    {
      key: 'created',
      title: t('created'),
      className: 'created-cell',
      render: ({ created }) => <span>{formatCreatedDate(created)}</span>,
    },
  ];
  return (
    <Card style={{ width: '100%', marginTop: 35 }}>
      <PaymentTableWrapper>
        <SectionTitle title="Latest Payments" />
        <Table rowKey={'name'} columns={columns} dataSource={payments} pagination={false} />
      </PaymentTableWrapper>
    </Card>
  );
};

export default LatestPayments;
