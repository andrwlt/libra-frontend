import { Input, Form, Space } from 'antd';
import ImageUploader from 'components/Inputs/ImageUploader';
import { useTranslation } from 'react-i18next';
import { FormItemsPropsType } from 'features/checkout/types';
import { LOCALE_WORKSPACE } from 'app/i18n';
import { useCheckFieldError, useHelpText } from 'features/checkout/checkoutHooks';
import { StyledOnboardingImageFormItem } from './CheckoutProductFormItems';

const FormItem = Form.Item;

const BrandingNameFormItem = ({ onboardingMode }: FormItemsPropsType) => {
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);
  const isFieldError = useCheckFieldError(['branding', 'name']);
  const { shouldShowHelpText, onFocus, onChange, onBlur } = useHelpText(isFieldError);

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
      <Input
        autoComplete="off"
        placeholder={placeholder}
        onFocus={onboardingMode ? onFocus : () => {}}
        onChange={onboardingMode ? (e) => onChange(e.target.value) : () => {}}
        onBlur={onboardingMode ? onBlur : () => {}}
      />
    </FormItem>
  );
};

const CheckoutBrandingFormItems = ({ isShow, onboardingMode = false }: FormItemsPropsType) => {
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);
  const label = t('brandLogo');

  const isFieldError = false;
  const { shouldShowHelpText, onFocus: onHoverImageInput, onBlur: onMouseLeaveImageInput } = useHelpText(isFieldError);
  return (
    <>
      {onboardingMode ? (
        <Space size={60} style={{ display: isShow ? '' : 'none' }}>
          <StyledOnboardingImageFormItem
            style={{ width: 230, height: 176, marginBottom: 0 }}
            name={['branding', 'logo']}
            help={shouldShowHelpText ? t('brandLogoHelpTextOnboarding') : undefined}
          >
            <ImageUploader
              label={label}
              purpose="brand_logo"
              onHoverImageInput={onHoverImageInput}
              onMouseLeaveImageInput={onMouseLeaveImageInput}
            />
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

          <FormItem name="checkoutType" label="Action Name">
            <Input autoComplete="off" placeholder={'Pay'} />
          </FormItem>
        </>
      )}
    </>
  );
};

export default CheckoutBrandingFormItems;
