import { Tag } from 'antd';

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

export default ChargeStatus;
