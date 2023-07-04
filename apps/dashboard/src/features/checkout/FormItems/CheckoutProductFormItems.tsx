import { Input, InputNumber, Select, Form, Space } from 'antd';
import ImageUploader from 'components/Inputs/ImageUploader';
import { useTranslation } from 'react-i18next';
import { FormItemsPropsType, PriceInputPropsType } from 'features/checkout/types';
import { ASSETS_CONFIG, isPriceTooLong } from '@atscale/libra-ui';
import { LOCALE_WORKSPACE } from 'app/i18n';
import { useCheckFieldError, useHelpText } from 'features/checkout/checkoutHooks';
import styled from 'styled-components';

const FormItem = Form.Item;

interface AssetInputProps {
  onChange?: Function;
  value?: string;
}

const AssetInput = ({ onChange, value }: AssetInputProps) => {
  return (
    <Select style={{ width: 125 }} value={value} onChange={(val) => onChange?.(val)}>
      {ASSETS_CONFIG.map((asset) => {
        return (
          <Select.Option key={asset.id} value={asset.id}>
            {asset.name}
          </Select.Option>
        );
      })}
    </Select>
  );
};

interface PriceInputProps extends PriceInputPropsType {
  onChange?: Function;
  value?: number;
}

const PriceInput = (props: PriceInputProps) => {
  const { value, onChange, onboardingMode, onPriceInputFocus, onPriceInputChange, onPriceInputBlur } = props;
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);

  const placeholder = onboardingMode ? '1' : t('pricePlaceholder');

  return (
    <InputNumber
      autoComplete="off"
      onFocus={() => {
        if (onboardingMode) {
          onPriceInputFocus?.();
        }
      }}
      onBlur={() => {
        if (onboardingMode) {
          onPriceInputBlur?.();
        }
      }}
      min={0}
      value={value}
      onChange={(val) => {
        if (onboardingMode) {
          const isPriceInput = true;
          onPriceInputChange?.(val, isPriceInput);
        }

        onChange?.(val);
      }}
      placeholder={placeholder}
      style={{ width: onboardingMode ? 'calc(100% - 88px)' : '100%' }}
    />
  );
};

const ProductPriceFormItem = (props: PriceInputPropsType) => {
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);

  return (
    <Form.Item
      label={'Price'}
      noStyle
      style={{ flexGrow: 1, paddingRight: '32px' }}
      name={['item', 'price', 'value']}
      required
      dependencies={['assetId']}
      rules={[
        () => ({
          validator(_, value) {
            if (value && isPriceTooLong(value)) {
              return Promise.reject(new Error(t<string>('decimalPathTooLong')));
            }

            return Promise.resolve();
          },
        }),
        { required: true, message: t<string>('productPriceIsRequired') },
        { type: 'number', message: t<string>('productPriceMustBeNumber') },
      ]}
    >
      <PriceInput {...props} />
    </Form.Item>
  );
};

const ProductNameFormItem = () => {
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);
  const label = t('productNameLabelOnboarding');
  const placeholder = t('productNamePlaceholderOnboarding');
  const isError = useCheckFieldError(['item', 'name']);
  const { shouldShowHelpText, onFocus, onBlur, onChange } = useHelpText(isError);

  return (
    <FormItem
      style={{ marginBottom: 32 }}
      help={shouldShowHelpText ? t('productNameHelpTextOnboarding') : undefined}
      name={['item', 'name']}
      label={label}
      rules={[{ required: true, message: t<string>('productNameIsRequired') }]}
      required
    >
      <Input
        autoComplete="off"
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value)}
      />
    </FormItem>
  );
};

export const StyledOnboardingImageFormItem = styled(Form.Item)`
  .ant-upload-wrapper {
    display: flex;
    justify-content: center;

    .ant-upload {
      margin-right: 0 !important;
    }
  }

  .ant-form-item-explain {
    text-align: center;
  }
`;

const CheckoutProductFormItems = ({ isShow }: FormItemsPropsType) => {
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);
  const isPriceInputError = useCheckFieldError(['item', 'price', 'value']);

  const {
    shouldShowHelpText: shouldShowPriceHelpText,
    onFocus: onPriceInputFocus,
    onChange: onPriceInputChange,
    onBlur: onPriceInputBlur,
  } = useHelpText(isPriceInputError);

  const isImageError = false;
  const {
    shouldShowHelpText: shouldShowImageHelpText,
    onFocus: onHoverImageInput,
    onBlur: onMouseLeaveImageInput,
  } = useHelpText(isImageError);

  const isError = useCheckFieldError(['item', 'price']);
  return (
    <Space size={60} style={{ display: isShow ? '' : 'none' }}>
      <div style={{ width: '400px' }}>
        <ProductNameFormItem />

        <FormItem
          style={{ height: 106, marginBottom: 0 }}
          label={t('priceLabelOnboarding')}
          help={shouldShowPriceHelpText ? t('priceHelpTextOnboarding') : undefined}
          required
          validateStatus={isError ? 'error' : 'success'}
        >
          <Space.Compact style={{ width: '100%' }}>
            <ProductPriceFormItem
              onboardingMode
              onPriceInputFocus={onPriceInputFocus}
              onPriceInputChange={onPriceInputChange}
              onPriceInputBlur={onPriceInputBlur}
            />

            <Form.Item name="assetId" noStyle>
              <AssetInput />
            </Form.Item>
          </Space.Compact>
        </FormItem>
      </div>

      <StyledOnboardingImageFormItem
        help={shouldShowImageHelpText ? t('productImageHelpTextOnboarding') : undefined}
        name={['item', 'image']}
        style={{ width: 340, marginBottom: 0, marginTop: 10, height: 176 }}
      >
        <ImageUploader
          onHoverImageInput={onHoverImageInput}
          onMouseLeaveImageInput={onMouseLeaveImageInput}
          label={t<string>('productImage')}
          purpose="product_image"
        />
      </StyledOnboardingImageFormItem>
    </Space>
  );
};

export default CheckoutProductFormItems;
