import { Input, InputNumber, Select, Form, Space } from 'antd';
import ImageUploader from 'components/Inputs/ImageUploader';
import { useTranslation } from 'react-i18next';
import { FormItemsPropsType } from 'features/checkout/types';

const FormItem = Form.Item;

interface AssetInputProps {
  onChange?: Function;
  value?: string;
  onboardingMode?: boolean;
}

const AssetInput = ({ onChange, value, onboardingMode }: AssetInputProps) => {
  const { t } = useTranslation();

  return (
    <Select style={{ width: onboardingMode ? '88px' : '102px' }} value={value} onChange={(val) => onChange?.(val)}>
      <Select.Option value="wnd">{t('asset.wnd')}</Select.Option>
      <Select.Option value="dot">{t('asset.dot')}</Select.Option>
    </Select>
  );
};

interface PriceInputProps {
  onChange?: Function;
  value?: number;
  onboardingMode?: boolean;
}

const PriceInput = ({ value, onChange, onboardingMode }: PriceInputProps) => {
  const { t } = useTranslation();

  const placeholder = onboardingMode ? t('checkout.pricePlaceholderOnboarding') : t('checkout.pricePlaceholder');

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
  const { t } = useTranslation();

  return (
    <Form.Item
      label={onboardingMode ? '1232132' : 'Price'}
      noStyle={!!onboardingMode}
      style={{ flexGrow: 1, paddingRight: '32px' }}
      name={['item', 'price']}
      required
      rules={[
        { required: true, message: t<string>('checkout.productPriceIsRequired') },
        { type: 'number', message: t<string>('checkout.productPriceMustBeNumber') },
      ]}
    >
      <PriceInput onboardingMode={onboardingMode} />
    </Form.Item>
  );
};

const ProductNameFormItem = ({ onboardingMode }: FormItemsPropsType) => {
  const { t } = useTranslation();
  const label = onboardingMode ? t('checkout.productNameLabelOnboarding') : t('checkout.productNameLabel');
  const placeholder = onboardingMode
    ? t('checkout.productNamePlaceholderOnboarding')
    : t('checkout.productNamePlaceholder');

  return (
    <FormItem
      name={['item', 'name']}
      label={label}
      rules={[{ required: true, message: t<string>('checkout.productNameIsRequired') }]}
      required
    >
      <Input placeholder={placeholder} />
    </FormItem>
  );
};

const CheckoutProductFormItems = ({ isShow, onboardingMode = false, onFieldsChange }: FormItemsPropsType) => {
  const { t } = useTranslation();

  return (
    <>
      {onboardingMode ? (
        <Space size={40} style={{ display: isShow ? '' : 'none' }}>
          <div style={{ width: '320px' }}>
            <ProductNameFormItem onboardingMode />

            <FormItem label={t('checkout.whatIsPrice')} required>
              <Space.Compact style={{ width: '100%' }}>
                <ProductPriceFormItem onboardingMode />

                <Form.Item name="asset" noStyle>
                  <AssetInput onboardingMode />
                </Form.Item>
              </Space.Compact>
            </FormItem>
          </div>
          <Form.Item name={['item', 'image']} noStyle>
            <ImageUploader label={t<string>('checkout.productImage')} purpose="product_image" />
          </Form.Item>
        </Space>
      ) : (
        <>
          <Form.Item
            name={['item', 'image']}
            style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 15, marginBottom: 10 }}
            className="upload-image--large"
          >
            <ImageUploader label={t<string>('checkout.productImage')} purpose="product_image" />
          </Form.Item>

          <ProductNameFormItem />

          <div style={{ width: '100%', display: 'flex' }}>
            <ProductPriceFormItem />

            <Form.Item label={t<string>('checkout.asset')} name="asset">
              <AssetInput />
            </Form.Item>
          </div>

          <Form.Item label={t<string>('checkout.description')} name={['item', 'description']}>
            <Input.TextArea rows={3} placeholder={t<string>('checkout.descriptionPlaceholder')} />
          </Form.Item>
        </>
      )}
    </>
  );
};

export default CheckoutProductFormItems;
