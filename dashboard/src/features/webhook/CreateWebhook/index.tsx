import { Form, Row } from 'antd';
import { FixedWrapper } from 'components/Common/Styled';

import Left from './Left';
import Right from './Right';

const Index = () => {
  const [form] = Form.useForm();

  return (
    <FixedWrapper>
      <Row style={{ height: 'calc(100vh)' }}>
        <Left />
        <Right />
      </Row>
    </FixedWrapper>
  );
};

export default Index;
