import { Form, Input } from 'antd';
import ImageUploader from 'components/ImageUploader';
import { useEffect } from 'react';

interface BrandingFormProps {
  initialValues?: any;
  onValuesChange?: any;
}

const BrandingForm = ({ initialValues = {}, onValuesChange = () => {} }: BrandingFormProps) => {
  const [form] = Form.useForm();
  const handleLogoChange = () => {};

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  return (
    <Form form={form} layout="vertical" initialValues={initialValues} onValuesChange={onValuesChange}>
      <Form.Item
        label="Name"
        name='name'
        required
        rules={[{ required: true, message: 'Brand name is required!' }]}
      >
        <Input placeholder="Name of your brand" />
      </Form.Item>
      <Form.Item label="Logo">
        <ImageUploader name="Brand logo" onChange={handleLogoChange} />
      </Form.Item>
    </Form>
  );
};

export default BrandingForm;
