import { Input, InputNumber, Select, Form, Space } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import ImageUploader from 'components/ImageUploader';
import { toSmallestUnit, formatBalance } from 'utils/format/balance';

interface ProductFormValue {
  name: string;
  description?: string;
  image?: string;
  price: number;
  asset: string;
}

interface ProductFormProps {
  onChange: (value: Partial<ProductFormValue>) => void;
  value: ProductFormValue;
}

export default function ProductFrom({ value, onChange }: ProductFormProps) {
  const handleProductImageChanged = () => {};
  const [form] = Form.useForm();

  const handleValuesChanged = (value: any) => {
    onChange && onChange(value);
  };

  const handlePriceChange = (value: any) => {
    onChange && onChange({ price: value });
  };

  const handleAssetChange = (value: any) => {
    console.log(value);
    onChange && onChange({ asset: value });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      onValuesChange={handleValuesChanged}
    >
      <Space size="large">
        <div style={{ width: '320px' }}>
          <FormItem name='name' label="What product do you want to sell?" required>
            <Input placeholder="Eg. Meditation course, a book, ..."></Input>
          </FormItem>
          <FormItem label="What is price of your product?" required>
            <Input.Group compact>
              <InputNumber onChange={handlePriceChange} name="price" placeholder="Eg. 1 DOT, 10 USDT, ..." style={{ width: 'calc(100% - 88px)' }} />
              <Select style={{ width: '88px' }} onChange={handleAssetChange}>
                <Select.Option value="WND">WND</Select.Option>
                <Select.Option value="DOT">DOT</Select.Option>
              </Select>
            </Input.Group>
          </FormItem>
        </div>
        <ImageUploader size={240} name="Product image" onChange={handleProductImageChanged} />
      </Space>
    </Form>
  );
}
