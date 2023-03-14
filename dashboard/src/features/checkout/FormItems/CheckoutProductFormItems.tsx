import { Input, InputNumber, Select, Form, Space } from 'antd';
import ImageUploader from 'components/Inputs/ImageUploader';
import { toSmallestUnit, formatBalance } from 'utils/format/balance';
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

  const form = Form.useFormInstance();

  const handleChange = (asset: string) => {
    const prevAsset = form.getFieldValue('asset');
    const prevSmalllestUnitPrice = form.getFieldValue(['item', 'price']);
    const nextSmalllestUnitPrice = toSmallestUnit(formatBalance(prevSmalllestUnitPrice, prevAsset), asset);

    onChange?.(asset);
    form.setFieldValue(['item', 'price'], nextSmalllestUnitPrice);
  };
  return (
    <Select style={{ width: onboardingMode ? '88px' : '102px' }} value={value} onChange={handleChange}>
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

const PriceInput = ({ value: smalllestUnitPrice, onChange, onboardingMode }: PriceInputProps) => {
  const { t } = useTranslation();
  const form = Form.useFormInstance();
  const asset = form.getFieldValue('asset');

  const handleChange = (nextPrice: any) => {
    const nextSmalllestUnitPrice = toSmallestUnit(nextPrice, asset);
    onChange?.(nextSmalllestUnitPrice);
  };

  const placeholder = onboardingMode ? t('checkout.pricePlaceholderOnboading') : t('checkout.pricePlaceholder');

  return (
    <InputNumber
      min={0}
      value={smalllestUnitPrice && formatBalance(smalllestUnitPrice, asset)}
      onChange={handleChange}
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
  const label = onboardingMode ? t('checkout.productNameLabelOnboading') : t('checkout.productNameLabel');
  const placeholder = onboardingMode
    ? t('checkout.productNamePlaceholderOnboading')
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
        <Space size="large" style={{ display: isShow ? '' : 'none' }}>
          <div style={{ width: '320px' }}>
            <ProductNameFormItem onboardingMode />

            <FormItem label={t('checkout.whatIsPrice')} required>
              <Input.Group compact>
                <ProductPriceFormItem onboardingMode />

                <Form.Item name="asset" noStyle>
                  <AssetInput onboardingMode />
                </Form.Item>
              </Input.Group>
            </FormItem>
          </div>
          <Form.Item name={['item', 'image']} noStyle>
            <ImageUploader
              onFieldsChange={onFieldsChange}
              size={240}
              label={t<string>('checkout.productImage')}
              purpose="product_image"
            />
          </Form.Item>
        </Space>
      ) : (
        <>
          <div style={{ display: 'flex' }}>
            <div style={{ flexGrow: 1 }}>
              <ProductNameFormItem />

              <Form.Item label={t<string>('checkout.description')} name={['item', 'description']}>
                <Input.TextArea placeholder={t<string>('checkout.descriptionPlaceholder')} />
              </Form.Item>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '32px', justifyContent: 'center' }}>
              <Form.Item name={['item', 'image']} noStyle>
                <ImageUploader
                  onFieldsChange={onFieldsChange}
                  label={t<string>('checkout.productImage')}
                  purpose="product_image"
                />
              </Form.Item>
            </div>
          </div>

          <div style={{ width: '100%', display: 'flex', paddingRight: '8px' }}>
            <ProductPriceFormItem />

            <Form.Item label={t<string>('checkout.asset')} name="asset">
              <AssetInput />
            </Form.Item>
          </div>
        </>
      )}
    </>
  );
};

export default CheckoutProductFormItems;
