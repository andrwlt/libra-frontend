import { Table, Button, Row, Space, Avatar } from 'antd';
import { Fragment } from 'react';
import getTableLoaderProps from 'components/Common/TableLoader';
import type { ColumnsType } from 'antd/es/table';
import { Charge as ChargeDataType } from 'features/payment/types';
import { ASSET_METADATA } from 'config';
import { getCheckoutPrice, formatCreatedDate } from 'utils/format/formatText';
import { useTranslation } from 'react-i18next';
import { LOCALE_WORKSPACE } from 'app/i18n';
import ChargeStatus from './ChargeStatus';

export default function ChargeTable(props: any) {
  const { charges, getChargesLoading, fetchCharges, chargesPaging } = props;
  const { t } = useTranslation(LOCALE_WORKSPACE.LAYOUT);
  const { t: tPayment } = useTranslation(LOCALE_WORKSPACE.PAYMENT);

  const columns: ColumnsType<ChargeDataType> = [
    {
      key: 'amount',
      title: tPayment('amount'),
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
      width: 300,
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
    <Fragment>
      <Table
        pagination={false}
        columns={columns}
        dataSource={charges}
        rowKey="id"
        {...getTableLoaderProps(getChargesLoading)}
      />

      {charges.length ? (
        <Row justify="end" style={{ marginTop: 20 }}>
          <Button
            size="small"
            onClick={() => fetchCharges({ isGoNext: false })}
            disabled={!chargesPaging.hasPrevPage || getChargesLoading}
            style={{ marginRight: 10 }}
          >
            {t('previous')}
          </Button>{' '}
          <Button
            size="small"
            onClick={() => fetchCharges()}
            disabled={!chargesPaging.hasNextPage || getChargesLoading}
          >
            {t('next')}
          </Button>
        </Row>
      ) : (
        ''
      )}
    </Fragment>
  );
}
