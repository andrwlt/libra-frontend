import { Input, Form, Space } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import ImageUploader from 'components/ImageUploader';

interface BrandingFormValue {
  name?: string;
  logo?: any;
}

interface BrandingFormProps {
  value: BrandingFormValue;
  onChange?: (value: Partial<BrandingFormValue>) => void;
}

export default function BrandingForm({ value, onChange }: BrandingFormProps) {
  const handleChange = (updatedValues: Partial<BrandingFormValue>) => {
    onChange && onChange({ ...value, ...updatedValues });
  };

  const handleLogoChange = (e: any) => {
    onChange && onChange({ ...value, logo: e });
  };

  return (
    <Form
      layout="vertical"
      onValuesChange={handleChange}
      style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
    >
      <Space size="large">
        <ImageUploader size={240} name="Brand logo" onChange={handleLogoChange} />
        <FormItem
          name="name"
          style={{ width: '320px' }}
          label="What is your brand name?"
          rules={[{ required: true, message: 'Brand name is required' }]}
        >
          <Input placeholder="Eg. John Brand, Libra, ..."></Input>
        </FormItem>
      </Space>
    </Form>
  );
}
