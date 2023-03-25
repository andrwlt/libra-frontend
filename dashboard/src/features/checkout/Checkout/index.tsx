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
import { CheckoutPreviewType, CreatingCheckoutType, UpdatingCheckoutType } from '../types';
import { useTranslation } from 'react-i18next';
import { formatCheckoutToStringPrice } from 'utils/format/balance';
import { FixedWrapper } from 'components/Common/Styled';

type CheckoutFormWrapperProps = {
  background: string;
  boxShadow: string;
};

const CheckoutFormWrapper = styled.div<CheckoutFormWrapperProps>`
  height: calc(100vh - 48px);
  display: flex;
  justify-content: flex-end;
  width: 40%;
  padding: 20px 36px 64px 64px;
  background: ${(props) => props.background};
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
  width: 60%;
  padding: 0 64px;
`;

const CheckoutContentWrapper = styled.div`
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

  const [previewingCheckout, setPreviewingCheckout] = useState<CheckoutPreviewType>(checkout);
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
          handleUpdateCheckout(formatCheckoutToStringPrice({ ...values, id }) as UpdatingCheckoutType);
        } else {
          handleCreateCheckout(formatCheckoutToStringPrice({ ...values }) as CreatingCheckoutType);
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
    <FixedWrapper>
      <ActionBar form={form} loading={isSubmitLoading} onSubmitCheckout={handleSubmit} />

      <CheckoutContentWrapper>
        <CheckoutFormWrapper background={colorBgBase} boxShadow={boxShadow}>
          <div style={{ width: '100%', maxWidth: '440px' }}>
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
        </CheckoutFormWrapper>

        <PreviewContainer>
          <Typography.Title level={4}>{t('checkout.preview')}</Typography.Title>

          <Preview style={{ margin: '0' }} width={690} height={540}>
            <CheckoutPreview previewingCheckout={previewingCheckout} />
          </Preview>
        </PreviewContainer>
      </CheckoutContentWrapper>
    </FixedWrapper>
  );
};

export default Checkout;
