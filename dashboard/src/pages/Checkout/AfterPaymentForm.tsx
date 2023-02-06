import { Form, Input } from 'antd';

interface AfterPaymentFormProps {
  initialValues?: any;
  onValuesChange?: any;
}

const AfterPaymentForm = ({ initialValues = {}, onValuesChange = () => {} }: AfterPaymentFormProps) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical" initialValues={initialValues} onValuesChange={onValuesChange}>
      <Form.Item
        name="redirectUrl"
        label="Redirect URL"
        validateTrigger='onBlur'
        rules={[{ type: 'url', message: 'Invalid URL' }]}
      >
        <Input placeholder="Your website URL" />
      </Form.Item>
    </Form>
  );
};

export default AfterPaymentForm;
