import { Input, InputNumber, Select, Form, Space } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import ImageUploader from 'components/ImageUploader';

export interface ProductFormValues {
  name: string;
  description?: string;
  image?: string;
  price: number | null;
  asset: string;
}

export interface ProductFormProps {
  onChange: (values: Partial<ProductFormValues>) => void;
  values: ProductFormValues;
}

export default function ProductFrom({ values, onChange }: ProductFormProps) {
  const handleProductImageChanged = () => {};
  const [form] = Form.useForm();

  const handleValuesChanged = (changedValues: Partial<ProductFormValues>) => {
    onChange && onChange(changedValues);
  };

  const handlePriceChange = (price: number | null) => {
    onChange && onChange({ price: price || 0 });
  };

  const handleAssetChange = (asset: string) => {
    onChange && onChange({ asset });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      initialValues={values}
      onValuesChange={handleValuesChanged}
    >
      <Space size="large">
        <div style={{ width: '320px' }}>
          <FormItem
            name="name"
            label="What product do you want to sell?"
            rules={[{ required: true, message: 'Product name is required' }]}
            required
          >
            <Input placeholder="Eg. Meditation course, a book, ..."></Input>
          </FormItem>
          <FormItem label="What is price of your product?" required>
            <Input.Group compact>
              <InputNumber
                value={values.price}
                onChange={handlePriceChange}
                placeholder="Eg. 1 DOT, 10 USDT, ..."
                style={{ width: 'calc(100% - 88px)' }}
              />
              <Select value={values.asset} style={{ width: '88px' }} onChange={handleAssetChange}>
                <Select.Option value="wnd">WND</Select.Option>
                <Select.Option value="dot">DOT</Select.Option>
              </Select>
            </Input.Group>
          </FormItem>
        </div>
        <ImageUploader size={240} name="Product image" onChange={handleProductImageChanged} />
      </Space>
    </Form>
  );
}
