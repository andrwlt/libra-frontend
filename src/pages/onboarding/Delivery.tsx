import styled from "styled-components";
import SharableURL from "../../components/SharableURL";
import { Typography, Form, Input } from "antd";

const { Title } = Typography;

const Wrapper = styled.div`
  max-width: 540px;
  margin-left: auto;
  margin-right: auto;
`;

const defaultEmail = `Hi Alice,

Thank you for purchasing!

Order details here

Kind regards
John Doe
`;

export default function Delivery() {
  return (
    <Wrapper>
      <Form layout="vertical">
        <Form.Item label="Redirect URL">
          <Input placeholder="https://golibra.xyz/thank-you" />
        </Form.Item>
        <Form.Item required label="Checkout success email" valuePropName="fileList">
          <Input.TextArea rows={12} defaultValue={defaultEmail} />
        </Form.Item>
      </Form>
    </Wrapper>
  );
}