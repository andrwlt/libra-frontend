import { Form, Input } from 'antd';
import ImageUploader from 'components/ImageUploader';

interface BrandingFormProps {
  initialValues?: any;
  onValuesChange?: any;
}

const BrandingForm = ({ initialValues = {}, onValuesChange = () => {} }: BrandingFormProps) => {
  const [form] = Form.useForm();
  const handleLogoChange = () => {};

  return (
    <Form form={form} layout="vertical" initialValues={initialValues} onValuesChange={onValuesChange}>
      <Form.Item
        label="Name"
        name={['branding', 'name']}
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
