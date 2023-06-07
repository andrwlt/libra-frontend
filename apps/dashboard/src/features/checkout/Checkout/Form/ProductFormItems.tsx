import { Input, InputNumber, Select, Form, Row, Col } from 'antd';
import ImageUploader from 'components/Inputs/ImageUploader';
import { useTranslation } from 'react-i18next';
import { getAssetMetadata, getNetworkAssets } from '@atscale/libra-ui';
import { LOCALE_WORKSPACE } from 'app/i18n';
import { useNetworks } from 'features/auth/authHooks';

const FormItem = Form.Item;

const ProductPriceFormItem = () => {
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);

  return (
    <Form.Item
      label={'Price'}
      name={['item', 'price']}
      required
      dependencies={['assetId']}
      rules={[
        ({ getFieldValue }) => ({
          validator(_, value) {
            const assetId = getFieldValue(['assetId']);
            const networkId = getFieldValue(['networkId']);
            const { decimals } = getAssetMetadata({ assetId, networkId });
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
      <InputNumber autoComplete="off" min={0} placeholder={t<string>('pricePlaceholder')} style={{ width: '100%' }} />
    </Form.Item>
  );
};

const CheckoutProductFormItems = () => {
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);
  const networks = useNetworks();

  return (
    <>
      <Form.Item
        name={['item', 'image']}
        style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 15, marginBottom: 10 }}
        className="upload-image--large"
      >
        <ImageUploader label={t<string>('productImage')} purpose="product_image" />
      </Form.Item>

      <FormItem
        style={{ marginBottom: 24 }}
        name={['item', 'name']}
        label={t('productNameLabel')}
        rules={[{ required: true, message: t<string>('productNameIsRequired') }]}
        required
      >
        <Input autoComplete="off" placeholder={t<string>('productNamePlaceholder')} />
      </FormItem>

      <Row gutter={24}>
        <Col span={12}>
          <FormItem
            required={false}
            label="Network"
            name="networkId"
            rules={[{ required: true, message: t<string>('networkIsRequired') }]}
          >
            <Select>
              {networks.map((network) => (
                <Select.Option key={network.id} value={network.id}>
                  {network.name}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
        </Col>

        <Col span={12}>
          <Form.Item label="Asset" shouldUpdate>
            {({ getFieldValue }) => {
              const networkId = getFieldValue(['networkId']);
              const assetOptions = getNetworkAssets(networkId);
              return (
                <FormItem
                  noStyle
                  name={['assetId']}
                  rules={[{ required: true, message: t<string>('assetIsRequired') }]}
                >
                  <Select>
                    {assetOptions.map((asset) => (
                      <Select.Option key={asset.id} value={asset.id}>
                        {asset.name}
                      </Select.Option>
                    ))}
                  </Select>
                </FormItem>
              );
            }}
          </Form.Item>
        </Col>
      </Row>

      <ProductPriceFormItem />

      <Form.Item label={t<string>('description')} name={['item', 'description']}>
        <Input.TextArea autoComplete="off" style={{minHeight:90}} rows={3} placeholder={t<string>('descriptionPlaceholder')} />
      </Form.Item>
    </>
  );
};

export default CheckoutProductFormItems;
