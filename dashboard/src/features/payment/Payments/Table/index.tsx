import { Table, Button, Row, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import columns from './columns';
import { Fragment } from 'react';
import getTableLoaderProps from 'components/Common/TableLoader';

export default function ChargeTable(props: any) {
  const { charges, getChargesLoading, fetchCharges, chargesPaging } = props;
  const { t } = useTranslation();

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
            {t('paging.previous')}
          </Button>{' '}
          <Button
            size="small"
            onClick={() => fetchCharges()}
            disabled={!chargesPaging.hasNextPage || getChargesLoading}
          >
            {t('paging.next')}
          </Button>
        </Row>
      ) : (
        ''
      )}
    </Fragment>
  );
}
