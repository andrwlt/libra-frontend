import { Input, Form, Space } from 'antd';
import ImageUploader from 'components/Inputs/ImageUploader';
import { useTranslation } from 'react-i18next';
import { FormItemsPropsType } from 'features/checkout/types';
import { LOCALE_WORKSPACE } from 'app/i18n';

const FormItem = Form.Item;

const BrandingNameFormItem = ({ onboardingMode }: FormItemsPropsType) => {
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);

  const placeholder = onboardingMode
    ? t('brandNamePlaceholderOnboarding')
    : t('brandNamePlaceholder');
  const label = onboardingMode ? t('brandNameLabelOnboarding') : t('brandNameLabel');

  return (
    <FormItem
      name={['branding', 'name']}
      style={{ width: onboardingMode ? '400px' : '100%' }}
      label={label}
      rules={[{ required: true, message: t<string>('brandNameIsRequired') }]}
    >
      <Input placeholder={placeholder} />
    </FormItem>
  );
};

const CheckoutBrandingFormItems = ({ isShow, onboardingMode = false, onFieldsChange }: FormItemsPropsType) => {
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);
  const label = t('brandLogo');

  return (
    <>
      {onboardingMode ? (
        <Space size={60} style={{ display: isShow ? '' : 'none' }}>
          <Form.Item noStyle name={['branding', 'logo']}>
            <ImageUploader label={label} purpose="brand_logo" />
          </Form.Item>

          <BrandingNameFormItem onboardingMode />
        </Space>
      ) : (
        <>
          <Form.Item
            name={['branding', 'logo']}
            style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 15, marginBottom: 10 }}
            className="upload-image--large"
          >
            <ImageUploader label={label} purpose="brand_logo" />
          </Form.Item>

          <BrandingNameFormItem />
        </>
      )}
    </>
  );
};

export default CheckoutBrandingFormItems;
