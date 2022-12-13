import { Currency } from "../types";
import { useEffect, useState } from "react";
import { Form, Input, InputNumber, Select, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const currencies: Currency[] = [
  {
    id: '0',
    network: 'polkadot',
    symbol: 'DOT',
    logo: '',
  },
  {
    id: '1',
    network: 'polkadot',
    symbol: 'USDT',
    logo: '',
  },
];

interface ProductFormProps {
  onInput: Function;
};

export default function LineItemForm({ onInput }: ProductFormProps) {
  const [form, setForm] = useState({
    title: '',
    image: '',
    price: '',
    currency: currencies[0],
  });

  const onFormFieldInput = (e: any) => {
    const { name, value } = e.target;
    const updatedForm = {
      ...form,
      [name]: value,
    };
    setForm(updatedForm);
  };

  const onPriceChanged = (value: string) => {
    setForm({
      ...form,
      price: value,
    });
  };

  const onCurrencyChanged = (value: string) => {
    const currency = currencies.find(item => item.id === value);
    if (currency) {
      setForm({
        ...form,
        currency,
      });
    }
  };

  useEffect(() => {
    onInput(form);
  }, [form]);

  return (
    <Form layout='vertical'>
      <Form.Item required label="Title">
        <Input name='title' value={form.title} onInput={onFormFieldInput} placeholder=".eg Crypto 101 class" />
      </Form.Item>
      <Form.Item label="Price">
        <Input.Group compact>
          <InputNumber name='price' value={form.price} onInput={onPriceChanged} style={ { width: 'calc(100% - 80px)'}}/>
          <Select value={form.currency.id} onChange={onCurrencyChanged} defaultValue="0" style={ { width: '80px'}}>
            { currencies.map((currency) => <Option key={currency.id} value={currency.id}>{currency.symbol}</Option>)}
          </Select>
        </Input.Group>
      </Form.Item>
      <Form.Item label="Images" valuePropName="fileList">
        <Upload listType="picture-card">
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}></div>
          </div>
        </Upload>
      </Form.Item>
    </Form>
  );
}

