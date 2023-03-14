import { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Typography, theme, Form, Tabs } from 'antd';
import CheckoutPreview from 'components/Checkout/CheckoutPreview';
import { ActionBar } from './ActionBar';
import {
  useCheckout,
  useCreateCheckout,
  useUpdateCheckout,
  useResetCheckout,
  useReinitCheckoutForm,
} from 'features/checkout/checkoutHooks';
import CheckoutBrandingFormItems from 'features/checkout/FormItems/CheckoutBrandingFormItems';
import CheckoutProductFormItems from 'features/checkout/FormItems/CheckoutProductFormItems';
import AfterPaymentFormItem from 'features/checkout/FormItems/AfterPaymentFormItem';
import type { TabsProps } from 'antd';
import Preview from 'components/Checkout/Previewer';
import { useDeboundCallback } from 'app/hooks';
import { CheckoutType } from '../types';
import { useTranslation } from 'react-i18next';

type CheckoutFormWraperProps = {
  background: string;
  boxShadow: string;
};

const CheckoutFormWraper = styled.div<CheckoutFormWraperProps>`
  height: calc(100vh - 120px);
  display: flex;
  justify-content: flex-end;
  width: 40%;
  padding: 0 64px;
  background: ${(props) => props.background};
  boxshadow: ${(props) => props.boxShadow};
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
  width: 60%;
  padding: 0 64px;
`;

const CheckoutContentWraper = styled.div`
  display: flex;
`;

const PRODUCT_STEP_KEY = 'product';
const BRANDING_STEP_KEY = 'branding';
const AFTER_PAYMENT_STEP_KEY = 'afterPayment';

const Checkout = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { checkout, getCheckoutLoading } = useCheckout(id);
  const { handleCreateCheckout, createCheckoutLoading } = useCreateCheckout();
  const { handleUpdateCheckout, updateCheckoutLoading } = useUpdateCheckout();

  const [previewingCheckout, setPreviewingCheckout] = useState<CheckoutType>(checkout);
  const [form] = Form.useForm();

  useReinitCheckoutForm(form, setPreviewingCheckout);
  useResetCheckout();

  const onFieldsChange = useDeboundCallback(() => {
    setPreviewingCheckout(form.getFieldsValue());
  });

  const [activeStep, setActiveStep] = useState<string>('product');

  const {
    token: { boxShadow, colorBgBase },
  } = theme.useToken();

  const handleSubmit = async () => {
    form
      .validateFields()
      .then((values) => {
        if (id) {
          handleUpdateCheckout({ ...values, id });
        } else {
          handleCreateCheckout(values);
        }
      })
      .catch((error) => {
        const firstError = error.errorFields[0];

        if (firstError.name[0] === 'item' && activeStep !== PRODUCT_STEP_KEY) {
          setActiveStep(PRODUCT_STEP_KEY);
        }

        if (firstError.name[0] === 'branding' && activeStep !== BRANDING_STEP_KEY) {
          setActiveStep(BRANDING_STEP_KEY);
        }

        if (firstError.name[0] === 'afterPayment' && activeStep !== AFTER_PAYMENT_STEP_KEY) {
          setActiveStep(AFTER_PAYMENT_STEP_KEY);
        }
      });
  };

  const isSubmitLoading = createCheckoutLoading || updateCheckoutLoading;

  const items: TabsProps['items'] = [
    {
      forceRender: true,
      key: PRODUCT_STEP_KEY,
      label: t('checkout.product'),
      children: <CheckoutProductFormItems />,
    },
    {
      key: BRANDING_STEP_KEY,
      label: t('checkout.branding'),
      children: <CheckoutBrandingFormItems />,
      forceRender: true,
    },
    {
      key: AFTER_PAYMENT_STEP_KEY,
      label: t('checkout.afterPayment'),
      children: <AfterPaymentFormItem />,
      forceRender: true,
    },
  ];

  return (
    <div>
      <ActionBar form={form} loading={isSubmitLoading} onSubmitCheckout={handleSubmit} />

      <CheckoutContentWraper>
        <CheckoutFormWraper background={colorBgBase} boxShadow={boxShadow}>
          <div style={{ width: '100%', maxWidth: '480px' }}>
            <Typography.Title level={4}>{t('checkout.newCheckout')}</Typography.Title>

            <Form
              disabled={getCheckoutLoading || isSubmitLoading}
              layout="vertical"
              initialValues={checkout}
              form={form}
              onFieldsChange={onFieldsChange}
            >
              <Tabs activeKey={activeStep} onChange={setActiveStep} items={items} />
            </Form>
          </div>
        </CheckoutFormWraper>

        <PreviewContainer>
          <Typography.Title level={4}>{t('checkout.preview')}</Typography.Title>

          <Preview style={{ margin: '0' }} width={600} height={400}>
            <CheckoutPreview previewingCheckout={previewingCheckout} />
          </Preview>
        </PreviewContainer>
      </CheckoutContentWraper>
    </div>
  );
};

export default Checkout;
