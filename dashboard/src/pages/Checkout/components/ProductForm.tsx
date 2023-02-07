import { Form, Input, InputNumber, Select } from 'antd';
import ImageUploader from 'components/ImageUploader';
import { useEffect } from 'react';

interface ProductFormProps {
  initialValues?: any;
  onValuesChange?: any;
}

const ProductForm = ({ initialValues = {}, onValuesChange = () => {} }: ProductFormProps) => {
  const [form] = Form.useForm();
  const handleProductImageChanged = () => {};

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

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
      <div style={{ width: '100%', display: 'flex', paddingRight: '8px' }}>
        <Form.Item
          style={{ flexGrow: 1, paddingRight: '32px' }}
          label="Price"
          name="price"
          required
          rules={[
            { required: true, message: 'Product price is required' },
            { type: 'number', message: 'Product price must be a number' },
          ]}
        >
          <InputNumber style={{ width: '100%' }} placeholder="Price of your product or service" />
        </Form.Item>
        <Form.Item label="Asset" name="asset">
          <Select style={{ width: '102px' }}>
            <Select.Option value="wnd">WND</Select.Option>
            <Select.Option value="dot">DOT</Select.Option>
          </Select>
        </Form.Item>
      </div>
    </Form>
  );
};

export default ProductForm;
