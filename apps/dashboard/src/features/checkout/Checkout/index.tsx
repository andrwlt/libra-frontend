import { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Typography, theme, Form, Tabs } from 'antd';
import { ActionBar } from './ActionBar';
import {
  useCheckout,
  useCreateCheckout,
  useUpdateCheckout,
  useResetCheckout,
  useReInitCheckoutForm,
} from 'features/checkout/checkoutHooks';
import CheckoutBrandingFormItems from 'features/checkout/FormItems/CheckoutBrandingFormItems';
import ProductFormItems from 'features/checkout/Checkout/Form/ProductFormItems';
import AfterPaymentFormItem from 'features/checkout/FormItems/AfterPaymentFormItem';
import type { TabsProps } from 'antd';
import Previewer from 'components/Checkout/Previewer';
import { useDebounceCallback } from 'app/hooks';
import { CreatingCheckout, UpdatingCheckout } from 'features/checkout/types';
import { Checkout, CheckoutComponent, NumberPrice, getNetworkAssets } from '@atscale/libra-ui';
import { useTranslation } from 'react-i18next';
import { formatCheckoutToStringPrice } from 'utils/format/balance';
import { FixedWrapper } from 'components/Common/Styled';
import { breakpoints } from 'config';
import { AFTER_PAYMENT_TYPE } from 'config';
import RedirectPreviewer from 'components/Checkout/RedirectPreviewer';
import { LOCALE_WORKSPACE } from 'app/i18n';

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

const CheckoutDetails = () => {
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);
  const { id } = useParams();
  const { checkout, getCheckoutLoading } = useCheckout(id);
  const { handleCreateCheckout, createCheckoutLoading } = useCreateCheckout();
  const { handleUpdateCheckout, updateCheckoutLoading } = useUpdateCheckout();

  const [previewingCheckout, setPreviewingCheckout] = useState<Checkout>(checkout);
  const [form] = Form.useForm();

  useReInitCheckoutForm(form, setPreviewingCheckout);
  useResetCheckout();

  const onFieldsChange = useDebounceCallback((changedFields: any) => {
    if (changedFields) {
      const { value, name } = changedFields[0];
      const isNetworkChanged = name?.[0] === 'networkId';
      if (isNetworkChanged) {
        const assets = getNetworkAssets(value);
        form.setFieldValue(['assetId'], assets?.[0]?.id);

        const price: NumberPrice = form.getFieldValue(['item', 'price']);

        Object.entries(price).forEach(([name, fieldValue]) => {

          if (name !== 'type' && fieldValue) {
            form.setFieldValue(['item', 'price', name], undefined);
          }
        });
      }
    }

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
        let { afterPayment, item } = values;

        if (afterPayment.type === AFTER_PAYMENT_TYPE.MESSAGE && !afterPayment.config) {
          afterPayment.config = { message: '' };
        }

        const nextItem = {
          ...item,
        };

        if (nextItem.priceType === 'fixed') {
          delete nextItem.minPrice;
          delete nextItem.maxPrice;
          delete nextItem.presetPrice;
        } else {
          delete item.price;
        }

        if (id) {
          handleUpdateCheckout(
            formatCheckoutToStringPrice({ ...values, item: nextItem, afterPayment, id }) as UpdatingCheckout,
          );
        } else {
          handleCreateCheckout(
            formatCheckoutToStringPrice({ ...values, item: nextItem, afterPayment }) as CreatingCheckout,
          );
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
      label: t('product'),
      children: <ProductFormItems onFieldsChange={onFieldsChange} />,
    },
    {
      key: BRANDING_STEP_KEY,
      label: t('branding'),
      children: <CheckoutBrandingFormItems />,
      forceRender: true,
    },
    {
      key: AFTER_PAYMENT_STEP_KEY,
      label: t('afterPayment'),
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
              autoComplete="off"
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
            {t('preview')}
          </Typography.Title>

          <Previewer style={{ margin: '0', marginTop: '30' }}>
            {showRedirectPreviewer ? (
              <RedirectPreviewer />
            ) : (
              <CheckoutComponent
                flexPriceValid={true}
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

export default CheckoutDetails;
