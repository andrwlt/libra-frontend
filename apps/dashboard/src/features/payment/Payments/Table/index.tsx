import { Table, Button, Row, Space, Avatar } from 'antd';
import { Fragment } from 'react';
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

export default function ChargeTable(props: any) {
  const { charges, getChargesLoading, chargesPaging } = props;
  const { onGoBack, onGoNext } = usePageChange(chargesPaging);
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
            <Avatar src={assetMetadata.logo} size={22}>
              {asset}
            </Avatar>
            <span>{priceFormatHelper.getCheckoutPrice({ price: amount, asset }, assetMetadata)}</span>

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
    </Fragment>
  );
}
