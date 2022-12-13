import { Typography, Form, Input, Upload } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import styled from "styled-components";
import { Branding } from "../../types";

const { Title } = Typography;

const Wrapper = styled.div`
  width: 100%;
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;
`;

interface BrandingProps {
  onChange: Function;
  value: Branding;
}

export default function BrandingStep({ value, onChange }: BrandingProps) {
  return (
    <Wrapper>
      <Title level={2}>Welcome to Libra</Title>
      <Form layout="vertical">
        <Form.Item required label="Your business name">
          <Input name='name' value={value.name} placeholder="John's brand" />
        </Form.Item>
        <Form.Item label="Contact email">
          <Input name='email' value={value.email} placeholder="john@example.com" />
        </Form.Item>
        <Form.Item label="Your branding logo" valuePropName="fileList">
          <Upload listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}></div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </Wrapper>
  );
}