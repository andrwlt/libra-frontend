import { Input, InputNumber, Select, Form, Space } from 'antd';
import ImageUploader from 'components/ImageUploader';
import { useState } from 'react';

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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleValuesChanged = (changedValues: Partial<ProductFormValues>) => {
    onChange && onChange(changedValues);
  };

  const validatePrice = (price: any) => {
    if (!price) {
      setErrors({ ...errors, price: 'Product price is required' });
      return;
    }

    if (isNaN(price)) {
      setErrors({ ...errors, price: 'Product price must be a number' });
      return;
    }

    setErrors({ ...errors, price: '' });
  }

  const handlePriceChange = (price: number | null) => {
    validatePrice(price);
    onChange && onChange({ price: price || 0 });
  };

  const handlePriceFieldBlur = () => {
    validatePrice(values.price);
  };

  const handlePriceFieldInput = (price: string) => {
    validatePrice(price);
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
          <Form.Item
            name="name"
            label="What product do you want to sell?"
            validateTrigger={['onChange', 'onBlur']}
            rules={[{ required: true, message: 'Product name is required' }]}
            required
          >
            <Input placeholder="Eg. Meditation course, a book, ..."></Input>
          </Form.Item>
          <Form.Item
            label="What is price of your product?"
            required
            validateStatus={errors.price ? 'error' : undefined}
            help={errors.price}
          >
            <Input.Group compact>
              <InputNumber
                value={values.price}
                onChange={handlePriceChange}
                onInput={handlePriceFieldInput}
                onBlur={handlePriceFieldBlur}
                placeholder="Eg. 1 DOT, 10 USDT, ..."
                style={{ width: 'calc(100% - 88px)' }}
              />
              <Select value={values.asset} style={{ width: '88px' }} onChange={handleAssetChange}>
                <Select.Option value="wnd">WND</Select.Option>
                <Select.Option value="dot">DOT</Select.Option>
              </Select>
            </Input.Group>
          </Form.Item>
        </div>
        <ImageUploader size={240} name="Product image" onChange={handleProductImageChanged} />
      </Space>
    </Form>
  );
}
