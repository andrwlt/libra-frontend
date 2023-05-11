import { Input, Form, Space } from 'antd';
import ImageUploader from 'components/Inputs/ImageUploader';
import { useTranslation } from 'react-i18next';
import { FormItemsPropsType } from 'features/checkout/types';
import { LOCALE_WORKSPACE } from 'app/i18n';
import { useHelpText } from 'features/checkout/checkoutHooks';
import { StyledOnboardingImageFormItem } from './CheckoutProductFormItems';

const FormItem = Form.Item;

const BrandingNameFormItem = ({ onboardingMode }: FormItemsPropsType) => {
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);
  const { shouldShowHelpText, onFocus } = useHelpText();

  const placeholder = onboardingMode ? t('brandNamePlaceholderOnboarding') : t('brandNamePlaceholder');
  const label = onboardingMode ? t('brandNameLabelOnboarding') : t('brandNameLabel');

  const style: any = {
    width: onboardingMode ? '460px' : '100%',
  };

  if (onboardingMode) {
    style.height = 106;
    style.marginBottom = 0;
  }

  return (
    <FormItem
      name={['branding', 'name']}
      extra={onboardingMode && shouldShowHelpText ? t('brandNameHelpTextOnboarding') : undefined}
      style={style}
      label={label}
      rules={[{ required: true, message: t<string>('brandNameIsRequired') }]}
    >
      <Input placeholder={placeholder} onFocus={onFocus} />
    </FormItem>
  );
};

const CheckoutBrandingFormItems = ({ isShow, onboardingMode = false }: FormItemsPropsType) => {
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);
  const label = t('brandLogo');
  const { shouldShowHelpText, onFocus: onImageInputFocus } = useHelpText();
  return (
    <>
      {onboardingMode ? (
        <Space size={60} style={{ display: isShow ? '' : 'none' }}>
          <StyledOnboardingImageFormItem
            style={{ width: 230, height: 176, marginBottom: 0 }}
            name={['branding', 'logo']}
            help={shouldShowHelpText ? t('brandLogoHelpTextOnboarding') : undefined}
          >
            <ImageUploader label={label} purpose="brand_logo" onImageInputFocus={onImageInputFocus} />
          </StyledOnboardingImageFormItem>

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
