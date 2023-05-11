import { Input, InputNumber, Select, Form, Space } from 'antd';
import ImageUploader from 'components/Inputs/ImageUploader';
import { useTranslation } from 'react-i18next';
import { FormItemsPropsType, PriceInputPropsType } from 'features/checkout/types';
import { ASSET_METADATA } from '@atscale/libra-ui';
import type { AssetMetadata } from '@atscale/libra-ui';
import { LOCALE_WORKSPACE } from 'app/i18n';
import { useHelpText } from 'features/checkout/checkoutHooks';
import styled from 'styled-components';

const FormItem = Form.Item;

interface AssetInputProps {
  onChange?: Function;
  value?: string;
  onboardingMode?: boolean;
}

const AssetInput = ({ onChange, value, onboardingMode }: AssetInputProps) => {
  return (
    <Select style={{ width: onboardingMode ? '88px' : '102px' }} value={value} onChange={(val) => onChange?.(val)}>
      {Object.values(ASSET_METADATA).map((asset: AssetMetadata) => {
        return <Select.Option value={asset.code}>{asset.symbol}</Select.Option>;
      })}
    </Select>
  );
};

interface PriceInputProps extends PriceInputPropsType {
  onChange?: Function;
  value?: number;
}

const PriceInput = (props: PriceInputProps) => {
  const { value, onChange, onboardingMode, onPriceInputFocus, onPriceInputChange } = props;
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);

  const placeholder = onboardingMode ? '1' : t('pricePlaceholder');

  return (
    <InputNumber
      onFocus={() => {
        if (onboardingMode) {
          onPriceInputFocus?.();
        }
      }}
      min={0}
      value={value}
      onChange={(val) => {
        onPriceInputChange?.();
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
  const { shouldShowHelpText, onFocus } = useHelpText();

  return (
    <div style={{ marginBottom: onboardingMode ? 3 : 0 }}>
      <FormItem
        style={{ height: onboardingMode ? 110 : 'auto', marginBottom: onboardingMode ? 0 : 24 }}
        extra={onboardingMode && shouldShowHelpText ? t('productNameHelpTextOnboarding') : undefined}
        name={['item', 'name']}
        label={label}
        rules={[{ required: true, message: t<string>('productNameIsRequired') }]}
        required
      >
        <Input placeholder={placeholder} onFocus={onFocus} />
      </FormItem>
    </div>
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
  const { shouldShowHelpText: shouldShowPriceHelpText, onFocus: onPriceInputFocus } = useHelpText();
  const { shouldShowHelpText: shouldShowImageHelpText, onFocus: onImageInputFocus } = useHelpText();

  return (
    <>
      {onboardingMode ? (
        <Space size={60} style={{ display: isShow ? '' : 'none' }}>
          <div style={{ width: '400px' }}>
            <ProductNameFormItem onboardingMode />

            <FormItem
              style={{ height: 106, marginBottom: 0 }}
              label={t('priceLabelOnboarding')}
              extra={shouldShowPriceHelpText ? t('priceHelpTextOnboarding') : undefined}
              required
            >
              <Space.Compact style={{ width: '100%' }}>
                <ProductPriceFormItem onboardingMode onPriceInputFocus={onPriceInputFocus} />

                <Form.Item name="asset" noStyle>
                  <AssetInput onboardingMode />
                </Form.Item>
              </Space.Compact>
            </FormItem>
          </div>

          <StyledOnboardingImageFormItem
            help={shouldShowImageHelpText ? t('productImageHelpTextOnboarding') : undefined}
            name={['item', 'image']}
            style={{ width: 340, marginBottom: 0, height: 176 }}
          >
            <ImageUploader
              onImageInputFocus={onImageInputFocus}
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
