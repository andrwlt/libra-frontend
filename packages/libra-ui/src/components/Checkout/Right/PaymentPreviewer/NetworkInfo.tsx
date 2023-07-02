
import { Row, Typography, Form } from 'antd';
import { Asset } from 'app/types';
import styled from 'styled-components';
import { getNetwork } from 'utils/asset';

const Wrapper = styled(Row)`
  height: 50px;
  border: 1px solid rgb(217, 217, 217);
  border-radius: 8px;
  padding: 10px;
  transition: all 0.2s;

  &:hover {
    border-color: rgb(11, 119, 255);
  }
`;

const { Text } = Typography;

const NetworkInfo = ({ asset }: { asset: Asset }) => {
  const network = getNetwork(asset);

  return (
    <Form.Item label="Network">
      <Wrapper align="middle">
        <img src={network.logoUrl} alt="icon" style={{ width: 25, objectFit: 'contain', marginRight: 7, marginLeft: 5 }} />
        <Text style={{ marginLeft: 8 }}>{network.name}</Text>
      </Wrapper>
    </Form.Item>
  );
};

export default NetworkInfo;
