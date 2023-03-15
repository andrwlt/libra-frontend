import { Input, Form, Space } from 'antd';
import ImageUploader from 'components/Inputs/ImageUploader';
import { useTranslation } from 'react-i18next';
import { FormItemsPropsType } from 'features/checkout/types';

const FormItem = Form.Item;

const BrandingNameFormItem = ({ onboardingMode }: FormItemsPropsType) => {
  const { t } = useTranslation();

  const placeholder = onboardingMode ? t('checkout.brandNamePlaceholderOnboarding') : t('checkout.brandNamePlaceholder');
  const label = onboardingMode ? t('checkout.brandNameLabelOnboarding') : t('checkout.brandNameLabel');

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

const CheckoutBrandingFormItems = ({ isShow, onboardingMode = false, onFieldsChange }: FormItemsPropsType) => {
  const { t } = useTranslation();
  const label = t('checkout.brandLogo');

  return (
    <>
      {onboardingMode ? (
        <Space size="large" style={{ display: isShow ? '' : 'none' }}>
          <Form.Item noStyle name={['branding', 'logo']}>
            <ImageUploader size={240} label={label} purpose="brand_logo" onFieldsChange={onFieldsChange} />
          </Form.Item>

          <BrandingNameFormItem />
        </Space>
      ) : (
        <>
          <BrandingNameFormItem />
          <Form.Item label="Logo" name={['branding', 'logo']}>
            <ImageUploader label={label} purpose="brand_logo" onFieldsChange={onFieldsChange} />
          </Form.Item>
        </>
      )}
    </>
  );
};

export default CheckoutBrandingFormItems;
