import { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Typography, theme, Form, Tabs } from 'antd';
import { Checkout as CheckoutPreview } from '@atscale/libra-ui';
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
import Previewer from 'components/Checkout/Previewer';
import { useDeboundCallback } from 'app/hooks';
import { CheckoutPreviewType, CreatingCheckoutType, UpdatingCheckoutType } from '../types';
import { useTranslation } from 'react-i18next';
import { formatCheckoutToStringPrice } from 'utils/format/balance';
import { FixedWrapper } from 'components/Common/Styled';
import { breakpoints } from 'config';
import { AFTER_PAYMENT_TYPE } from 'features/checkout/types';
import RedirectPreviewer from 'components/Checkout/RedirectPreviewer';

type CheckoutFormWrapperProps = {
  background: string;
  boxShadow: string;
};

const CheckoutFormWrapper = styled.div<CheckoutFormWrapperProps>`
  height: calc(100vh - 48px);
  display: flex;
  justify-content: flex-end;
  width: 40%;
  padding: 20px 46px 64px 64px;
  background: ${(props) => props.background};

  @media only screen and ${breakpoints.device.aboveLg} {
    width: 35%;
    padding-left: 24px;
    padding-right: 36px;
  }
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 56px);
  width: 60%;
  padding: 0 48px;
  background-color: rgb(246, 248, 250);

  @media only screen and ${breakpoints.device.aboveLg} {
    width: 65%;
  }
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
        const errorStep = error.errorFields?.[0]?.name?.[0];
        if (errorStep === 'item' && activeStep !== PRODUCT_STEP_KEY) {
          setActiveStep(PRODUCT_STEP_KEY);
        }

        if (errorStep === 'branding' && activeStep !== BRANDING_STEP_KEY) {
          setActiveStep(BRANDING_STEP_KEY);
        }

        if (errorStep === 'afterPayment' && activeStep !== AFTER_PAYMENT_STEP_KEY) {
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
      children: <AfterPaymentFormItem onFieldsChange={onFieldsChange} />,
      forceRender: true,
    },
  ];

  const isShowAfterPayment = activeStep === AFTER_PAYMENT_STEP_KEY;
  const isRedirectType = previewingCheckout?.afterPayment?.type === AFTER_PAYMENT_TYPE.REDIRECT;
  const showRedirectPreviewer = isShowAfterPayment && isRedirectType;

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
          <Typography.Title level={4} style={{ marginBottom: 30 }}>
            {t('checkout.preview')}
          </Typography.Title>

          <Previewer style={{ margin: '0', marginTop: '30' }}>
            {showRedirectPreviewer ? (
              <RedirectPreviewer />
            ) : (
              <CheckoutPreview
                loading={getCheckoutLoading}
                checkoutData={previewingCheckout}
                isShowAfterPayment={isShowAfterPayment}
              />
            )}
          </Previewer>
        </PreviewContainer>
      </CheckoutContentWrapper>
    </FixedWrapper>
  );
};

export default Checkout;