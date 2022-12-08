import { Typography, Form, Input, Upload } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import styled from "styled-components";

const { Title } = Typography;

const Wrapper = styled.div`
  width: 100%;
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;
`;

export default function Onboarding() {
  return (
    <Wrapper>
      <Title>Welcome to Libra</Title>
      <Form layout="vertical">
        <Form.Item required label="Your business name">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Your business email">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Your business logo" valuePropName="fileList">
          <Upload listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </Wrapper>
  );
}