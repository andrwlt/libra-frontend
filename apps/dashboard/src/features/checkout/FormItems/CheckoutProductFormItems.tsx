import { Input, InputNumber, Select, Form, Space } from 'antd';
import ImageUploader from 'components/Inputs/ImageUploader';
import { useTranslation } from 'react-i18next';
import { FormItemsPropsType, PriceInputPropsType } from 'features/checkout/types';
import { ASSET_METADATA } from '@atscale/libra-ui';
import type { AssetMetadata } from '@atscale/libra-ui';
import { LOCALE_WORKSPACE } from 'app/i18n';
import { useCheckFieldError, useHelpText } from 'features/checkout/checkoutHooks';
import styled from 'styled-components';

const FormItem = Form.Item;

interface AssetInputProps {
  onChange?: Function;
  value?: string;
  onboardingMode?: boolean;
}

const AssetInput = ({ onChange, value, onboardingMode }: AssetInputProps) => {
  const assetOptions = [ASSET_METADATA.ksm, ASSET_METADATA.dot];
  return (
    <Select style={{ width: onboardingMode ? '88px' : '102px' }} value={value} onChange={(val) => onChange?.(val)}>
      {assetOptions.map((asset: AssetMetadata) => {
        return (
          <Select.Option key={asset.code} value={asset.code}>
            {asset.symbol}
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
  const { onboardingMode } = props;
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);

  return (
    <Form.Item
      label={'Price'}
      noStyle={!!onboardingMode}
      style={{ flexGrow: 1, paddingRight: '32px' }}
      name={['item', 'price']}
      required
      dependencies={['asset']}
      rules={[
        ({ getFieldValue }) => ({
          validator(_, value) {
            const asset = getFieldValue(['asset']);

            const { decimals } = ASSET_METADATA[asset];
            const smallestPrice = 1 / Math.pow(10, decimals);

            if (value === 0 || (value && value < smallestPrice)) {
              return Promise.reject(new Error(t<string>('priceTooSmall')));
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

const ProductNameFormItem = ({ onboardingMode }: FormItemsPropsType) => {
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);
  const label = onboardingMode ? t('productNameLabelOnboarding') : t('productNameLabel');
  const placeholder = onboardingMode ? t('productNamePlaceholderOnboarding') : t('productNamePlaceholder');
  const isError = useCheckFieldError(['item', 'name']);
  const { shouldShowHelpText, onFocus, onBlur, onChange } = useHelpText(isError);

  return (
    <FormItem
      style={{ marginBottom: onboardingMode ? 32 : 24 }}
      help={onboardingMode && shouldShowHelpText ? t('productNameHelpTextOnboarding') : undefined}
      name={['item', 'name']}
      label={label}
      rules={[{ required: true, message: t<string>('productNameIsRequired') }]}
      required
    >
      <Input
        placeholder={placeholder}
        onFocus={onboardingMode ? onFocus : () => {}}
        onBlur={onboardingMode ? onBlur : () => {}}
        onChange={onboardingMode ? (event) => onChange(event.target.value) : () => {}}
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

const CheckoutProductFormItems = ({ isShow, onboardingMode = false }: FormItemsPropsType) => {
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);
  const isPriceInputError = useCheckFieldError(['item', 'price']);
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
    <>
      {onboardingMode ? (
        <Space size={60} style={{ display: isShow ? '' : 'none' }}>
          <div style={{ width: '400px' }}>
            <ProductNameFormItem onboardingMode />

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

                <Form.Item name="asset" noStyle>
                  <AssetInput onboardingMode />
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
      ) : (
        <>
          <Form.Item
            name={['item', 'image']}
            style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 15, marginBottom: 10 }}
            className="upload-image--large"
          >
            <ImageUploader label={t<string>('productImage')} purpose="product_image" />
          </Form.Item>

          <ProductNameFormItem />

          <div style={{ width: '100%', display: 'flex' }}>
            <ProductPriceFormItem />

            <Form.Item label={t<string>('asset')} name="asset">
              <AssetInput />
            </Form.Item>
          </div>

          <Form.Item label={t<string>('description')} name={['item', 'description']}>
            <Input.TextArea rows={3} placeholder={t<string>('descriptionPlaceholder')} />
          </Form.Item>
        </>
      )}
    </>
  );
};

export default CheckoutProductFormItems;
