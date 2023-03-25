import { Table, Button, Row } from 'antd';
import columns from './columns';

export default function ChargeTable(props: any) {
  const { charges, getChargesLoading, fetchCharges, chargesPaging } = props;

  return (
    <div>
      <Table
        size="small"
        pagination={false}
        loading={getChargesLoading}
        columns={columns}
        dataSource={charges}
        rowKey="id"
      />
      {charges.length ? (
        <Row justify="end" style={{ marginTop: 20 }}>
          <Button
            size="small"
            onClick={() => fetchCharges({ isGoNext: false })}
            disabled={!chargesPaging.hasPrevPage || getChargesLoading}
            style={{ marginRight: 10 }}
          >
            Previous
          </Button>{' '}
          <Button
            size="small"
            onClick={() => fetchCharges()}
            disabled={!chargesPaging.hasNextPage || getChargesLoading}
          >
            Next
          </Button>
        </Row>
      ) : (
        ''
      )}
    </div>
  );
}
