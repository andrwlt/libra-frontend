import { Input, Form, Space } from 'antd';
import ImageUploader from 'components/Inputs/ImageUploader';
import { useTranslation } from 'react-i18next';
import { FormItemsPropsType } from 'features/checkout/types';

const FormItem = Form.Item;

const BrandingNameFormItem = ({ onboardingMode }: FormItemsPropsType) => {
  const { t } = useTranslation();

  const placeholder = onboardingMode ? t('checkout.brandNamePlaceholderOnboading') : t('checkout.brandNamePlaceholder');
  const label = onboardingMode ? t('checkout.brandNameLabelOnboading') : t('checkout.brandNameLabel');

  return (
    <FormItem
      name={['branding', 'name']}
      style={{ width: '320px' }}
      label={label}
      rules={[{ required: true, message: t<string>('checkout.brandNameIsRequired') }]}
    >
      <Input placeholder={placeholder} />
    </FormItem>
  );
};

const CheckoutBrandingFormItems = ({ isShow, onboardingMode = false }: FormItemsPropsType) => {
  const { t } = useTranslation();

  return (
    <>
      {onboardingMode ? (
        <Space size="large" style={{ display: isShow ? '' : 'none' }}>
          <ImageUploader size={240} label={t<string>('checkout.brandLogo')} />
          <BrandingNameFormItem />
        </Space>
      ) : (
        <>
          <BrandingNameFormItem />
          <Form.Item label="Logo">
            <ImageUploader label={t<string>('checkout.brandLogo')} />
          </Form.Item>
        </>
      )}
    </>
  );
};

export default CheckoutBrandingFormItems;
