import { Form, Input, InputNumber, Select, Space } from 'antd';
import ImageUploader from 'components/ImageUploader';

interface ProductFormProps {
  initialValues?: any;
  onValuesChange?: any;
}

const ProductForm = ({ initialValues = {}, onValuesChange = () => {} }: ProductFormProps) => {
  const [form] = Form.useForm();
  const handleProductImageChanged = () => {};

  return (
    <Form form={form} layout="vertical" initialValues={initialValues} onValuesChange={onValuesChange}>
      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: 1 }}>
          <Form.Item label="Name" name="name" required>
            <Input placeholder="Name of your product or service" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea placeholder="Description about your product or service" />
          </Form.Item>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '32px', justifyContent: 'center' }}>
          <ImageUploader name="Product image" onChange={handleProductImageChanged} />
        </div>
      </div>
      <Space>
        <Form.Item
          label="Price"
          name="price"
          required
          rules={[
            { required: true, message: 'Product price is required' },
            { type: 'number', message: 'Product price must be a number' },
          ]}
        >
          <InputNumber  placeholder="Price of your product or service" />
        </Form.Item>
        <Form.Item label="Asset" name="asset">
          <Select>
            <Select.Option value="wnd">WND</Select.Option>
            <Select.Option value="dot">DOT</Select.Option>
          </Select>
        </Form.Item>
      </Space>
    </Form>
  );
};

export default ProductForm;
