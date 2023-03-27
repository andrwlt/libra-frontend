import { Table, Button, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import columns from './columns';
import Loading from 'components/Common/Loading';

export default function ChargeTable(props: any) {
  const { charges, getChargesLoading, fetchCharges, chargesPaging } = props;
  const { t } = useTranslation();

  return (
    <Loading spinning={getChargesLoading}>
      <Table pagination={false} columns={columns} dataSource={charges} rowKey="id" />
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
    </Loading>
  );
}
