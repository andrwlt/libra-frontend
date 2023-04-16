import React, { useState, useRef, useEffect } from 'react';
import { Form, Input, Radio, Checkbox, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { AFTER_PAYMENT_TYPE } from 'features/checkout/types';
import { useCheckout } from 'features/checkout/checkoutHooks';
import { LOCALE_WORKSPACE } from 'app/i18n';

const { REDIRECT, MESSAGE } = AFTER_PAYMENT_TYPE;

const AfterPaymentFormItem = ({ onFieldsChange }: { onFieldsChange: () => void }) => {
  const form = Form.useFormInstance();
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);
  const { checkout } = useCheckout();

  const [isCustomMessage, setIsCustomMessage] = useState(false);
  const inputRef = useRef<any>(null);

  const onIsCustomMessChange = (checked: boolean) => {
    setIsCustomMessage(checked);
    if (checked) {
      const originMessage = checkout.afterPayment?.config?.message;
      form.setFieldValue(['afterPayment', 'config', 'message'], originMessage);
    } else {
      form.setFieldValue(['afterPayment', 'config', 'message'], '');
    }
    onFieldsChange();
  };

  const isMessageType = form.getFieldValue(['afterPayment', 'type']) === MESSAGE;

  useEffect(() => {
    const hasCustomMessage = !!form.getFieldValue(['afterPayment', 'config', 'message']);
    setIsCustomMessage(hasCustomMessage);
  }, [checkout, form]);

  const onAfterPaymentTypeChange = (type: string) => {
    const originType = checkout.afterPayment?.type;
    if (type === REDIRECT) {
      form.setFieldValue(['afterPayment'], originType === REDIRECT ? checkout.afterPayment : undefined);
    } else {
      const shouldReInit = originType === MESSAGE;
      form.setFieldValue(['afterPayment'], shouldReInit ? checkout.afterPayment : undefined);

      if (shouldReInit && checkout.afterPayment?.config.message) {
        setIsCustomMessage(true);
      }
    }
  };

  useEffect(() => {
    if (isCustomMessage) {
      inputRef?.current?.focus?.();
    }
  }, [isCustomMessage]);

  return (
    <Form.Item style={{ marginTop: 10 }} name={['afterPayment', 'type']}>
      <Radio.Group>
        <Row>
          <Radio value={MESSAGE} onClick={() => onAfterPaymentTypeChange(MESSAGE)}>
            {' '}
            <span style={{ margin: 0, fontWeight: 500 }}>{t('showConfirmationPage')}</span>{' '}
          </Radio>
          {isMessageType && (
            <Checkbox
              style={{ marginLeft: 25, marginTop: 10, marginBottom: isCustomMessage ? 10 : 0 }}
              checked={isCustomMessage}
              onChange={({ target: { checked } }) => {
                onIsCustomMessChange(checked);
              }}
            >
              {t('replaceDefaultMess')}
            </Checkbox>
          )}
          {isMessageType && isCustomMessage && (
            <Form.Item
              style={{ marginLeft: 25, width: '100%', marginBottom: 5 }}
              name={['afterPayment', 'config', 'message']}
            >
              <Input.TextArea ref={inputRef} />
            </Form.Item>
          )}
        </Row>
        <Row style={{ marginTop: 15 }}>
          <Radio
            value={REDIRECT}
            onClick={() => {
              setIsCustomMessage(false);
              onAfterPaymentTypeChange(REDIRECT);
            }}
          >
            <span style={{ margin: 0, fontWeight: 500 }}>{t('notShowConfirmationPage')}</span>{' '}
          </Radio>
          {!isMessageType && (
            <Form.Item
              style={{ marginTop: 5, marginLeft: 25, marginBottom: 10, width: '100%' }}
              name={['afterPayment', 'config', 'url']}
              label={t('redirectUrlLabel')}
              validateTrigger="onBlur"
              rules={[{ type: 'url', message: t<string>('invalidUrl') }]}
            >
              <Input placeholder='https://'></Input>
            </Form.Item>
          )}
        </Row>
      </Radio.Group>
    </Form.Item>
  );
};

export default AfterPaymentFormItem;
