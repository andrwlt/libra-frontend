import React from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const AfterPaymentFormItem = () => {
  const { t } = useTranslation();
  return (
    <Form.Item
      style={{ marginTop: 10 }}
      name={['afterPayment', 'redirectUrl']}
      label={t('checkout.redirectUrlLabel')}
      validateTrigger="onBlur"
      rules={[{ type: 'url', message: t<string>('checkout.invalidUrl') }]}
    >
      <Input placeholder={t<string>('checkout.redirectUrlPlaceholder')} />
    </Form.Item>
  );
};

export default AfterPaymentFormItem;
