import { Table, Button, Row, Avatar } from 'antd';
import getTableLoaderProps from 'components/Common/TableLoader';
import type { ColumnsType } from 'antd/es/table';
import { Charge as ChargeDataType } from 'features/payment/types';
import { ASSET_METADATA } from '@atscale/libra-ui';
import { formatCreatedDate } from 'utils/format/formatText';
import { useTranslation } from 'react-i18next';
import { LOCALE_WORKSPACE } from 'app/i18n';
import ChargeStatus from './ChargeStatus';
import { priceFormatHelper } from '@atscale/libra-ui';
import { usePageChange } from 'app/hooks';
import styled from 'styled-components';

const TableWrapper = styled.div`
  .ant-table-content {
    .amount-th,
    .icon-th {
      &::before {
        content: none !important;
      }

      white-space: nowrap;
    }

    .icon-th {
      padding-left: 0px !important;
      padding-right: 12px !important;
    }
  }
`;

export default function ChargeTable(props: any) {
  const { charges, getChargesLoading, chargesPaging } = props;
  const { onGoBack, onGoNext } = usePageChange(chargesPaging);
  const { t } = useTranslation(LOCALE_WORKSPACE.LAYOUT);
  const { t: tPayment } = useTranslation(LOCALE_WORKSPACE.PAYMENT);

  const columns: ColumnsType<ChargeDataType> = [
    {
      className: 'amount-th',
      key: 'amount',
      title: tPayment('amount'),
      align: 'right',
      width: 50,
      render: ({ asset, amount }) => {
        const assetMetadata = ASSET_METADATA[asset];
        return priceFormatHelper.getCheckoutPrice({ price: amount, asset }, assetMetadata);
      },
    },
    {
      className: 'icon-th',
      title: '',
      width: 30,
      key: 'icon',
      align: 'center',
      render: ({ asset }) => {
        const assetMetadata = ASSET_METADATA[asset];
        return (
          <Avatar src={assetMetadata.logo} size={22}>
            {asset}
          </Avatar>
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
      key: 'description',
      title: tPayment('description'),
      dataIndex: 'description',
      className: 'charge-description',
    },

    {
      key: 'Customer',
      title: tPayment('customer'),
      render: ({ receiptEmail }) => <span>{receiptEmail}</span>,
    },
    {
      key: 'created',
      title: tPayment('created'),
      render: ({ created }) => <span>{formatCreatedDate(created)}</span>,
      width: 200,
    },
  ];

  return (
    <TableWrapper>
      <Table
        pagination={false}
        columns={columns}
        dataSource={charges}
        rowKey="id"
        {...getTableLoaderProps(getChargesLoading)}
      />

      {charges.length ? (
        <Row justify="end" style={{ marginTop: 20 }}>
          {chargesPaging.hasPrevPage && (
            <Button size="small" onClick={onGoBack} disabled={getChargesLoading} style={{ marginRight: 10 }}>
              {t('previous')}
            </Button>
          )}

          {chargesPaging.hasNextPage && (
            <Button size="small" onClick={onGoNext} disabled={getChargesLoading}>
              {t('next')}
            </Button>
          )}
        </Row>
      ) : (
        ''
      )}
    </TableWrapper>
  );
}
