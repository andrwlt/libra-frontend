import { Input, InputNumber, Select, Form, Space } from 'antd';
import ImageUploader from 'components/Inputs/ImageUploader';
import { useTranslation } from 'react-i18next';
import { FormItemsPropsType } from 'features/checkout/types';
import { ASSET_METADATA } from '@atscale/libra-ui';
import { LOCALE_WORKSPACE } from 'app/i18n';

const FormItem = Form.Item;

interface AssetInputProps {
  onChange?: Function;
  value?: string;
  onboardingMode?: boolean;
}

const AssetInput = ({ onChange, value, onboardingMode }: AssetInputProps) => {
  const { t } = useTranslation(LOCALE_WORKSPACE.LAYOUT);

  return (
    <Select style={{ width: onboardingMode ? '88px' : '102px' }} value={value} onChange={(val) => onChange?.(val)}>
      <Select.Option value="wnd">{t('wnd')}</Select.Option>
      <Select.Option value="dot">{t('dot')}</Select.Option>
    </Select>
  );
};

interface PriceInputProps {
  onChange?: Function;
  value?: number;
  onboardingMode?: boolean;
}

const PriceInput = ({ value, onChange, onboardingMode }: PriceInputProps) => {
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);

  const placeholder = onboardingMode ? t('pricePlaceholderOnboarding') : t('pricePlaceholder');

  return (
    <InputNumber
      min={0}
      value={value}
      onChange={(val) => onChange?.(val)}
      placeholder={placeholder}
      style={{ width: onboardingMode ? 'calc(100% - 88px)' : '100%' }}
    />
  );
};

const ProductPriceFormItem = ({ onboardingMode }: FormItemsPropsType) => {
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);

  return (
    <Form.Item
      label={onboardingMode ? '1232132' : 'Price'}
      noStyle={!!onboardingMode}
      style={{ flexGrow: 1, paddingRight: '32px' }}
      name={['item', 'price']}
      required
      dependencies={['asset']}
      rules={[
        { required: true, message: t<string>('productPriceIsRequired') },
        { type: 'number', message: t<string>('productPriceMustBeNumber') },
        ({ getFieldValue }) => ({
          validator(_, value) {
            const asset = getFieldValue(['asset']);

            const { decimals } = ASSET_METADATA[asset];
            const smallestPrice = 1 / Math.pow(10, decimals);

            if (value < smallestPrice) {
              return Promise.reject(new Error('priceTooSmall'));
            }

            return Promise.resolve();
          },
        }),
      ]}
    >
      <PriceInput onboardingMode={onboardingMode} />
    </Form.Item>
  );
};

const ProductNameFormItem = ({ onboardingMode }: FormItemsPropsType) => {
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);
  const label = onboardingMode ? t('productNameLabelOnboarding') : t('productNameLabel');
  const placeholder = onboardingMode
    ? t('productNamePlaceholderOnboarding')
    : t('productNamePlaceholder');

  return (
    <FormItem
      name={['item', 'name']}
      label={label}
      rules={[{ required: true, message: t<string>('productNameIsRequired') }]}
      required
    >
      <Input placeholder={placeholder} />
    </FormItem>
  );
};

const CheckoutProductFormItems = ({ isShow, onboardingMode = false, onFieldsChange }: FormItemsPropsType) => {
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);

  return (
    <>
      {onboardingMode ? (
        <Space size={60} style={{ display: isShow ? '' : 'none' }}>
          <div style={{ width: '400px' }}>
            <ProductNameFormItem onboardingMode />

            <FormItem label={t('whatIsPrice')} required>
              <Space.Compact style={{ width: '100%' }}>
                <ProductPriceFormItem onboardingMode />

                <Form.Item name="asset" noStyle>
                  <AssetInput onboardingMode />
                </Form.Item>
              </Space.Compact>
            </FormItem>
          </div>
          <Form.Item name={['item', 'image']} noStyle>
            <ImageUploader label={t<string>('productImage')} purpose="product_image" />
          </Form.Item>
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
