import { Input, InputNumber, Select, Form, Row, Col, Radio, Checkbox } from 'antd';
import ImageUploader from 'components/Inputs/ImageUploader';
import { useTranslation } from 'react-i18next';
import { getAssetMetadata, getNetworkAssets } from '@atscale/libra-ui';
import { LOCALE_WORKSPACE } from 'app/i18n';
import { useNetworks } from 'features/auth/authHooks';
import { useState } from 'react';
import styled from 'styled-components';

const FormItem = Form.Item;

const MinMaxFormItem = styled(FormItem)`
  .ant-form-item-explain-error {
    padding-left: 24px;
  }
`;

const ProductPriceFormItem = () => {
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);

  return (
    <Form.Item
      label={'Price'}
      name={['item', 'price']}
      dependencies={['assetId']}
      requiredMark={false}
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

const FlexProductPriceFormItem = () => {
  const form = Form.useFormInstance();
  const initHasPresetPrice = form.getFieldValue(['item', 'price']) === undefined;
  const initHasMinMaxPrice =
    form.getFieldValue(['item', 'minPrice']) !== undefined || form.getFieldValue(['item', 'maxPrice']) !== undefined;

  const [hasPresetPrice, setHasPresetPrice] = useState(() => initHasPresetPrice);
  const [hasMinMaxPrice, setHasMinMaxPrice] = useState(() => initHasMinMaxPrice);

  return (
    <FormItem noStyle>
      <Row>
        <Checkbox
          checked={hasPresetPrice}
          onChange={({ target: { checked } }) => {
            setHasPresetPrice(checked);
            if (!checked) {
              form.setFieldValue(['item', 'presetPrice'], undefined);
            }
          }}
        >
          Suggest a preset amount
        </Checkbox>
      </Row>

      {hasPresetPrice && (
        <Row style={{ marginLeft: 24, marginTop: 10, width: '100%' }}>
          <FormItem
            style={{ width: '100%' }}
            dependencies={[
              ['item', 'minPrice'],
              ['item', 'maxPrice'],
            ]}
            name={['item', 'presetPrice']}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const minPrice = getFieldValue(['item', 'minPrice']);
                  const maxPrice = getFieldValue(['item', 'maxPrice']);

                  if (value && minPrice && value < minPrice) {
                    return Promise.reject(new Error('Suggested price must be greater or equal to minimum.'));
                  }
                  if (value && maxPrice && value > maxPrice) {
                    return Promise.reject(new Error('Suggested price must be less than or equal to maximum.'));
                  }

                  return Promise.resolve();
                },
              }),
            ]}
          >
            <InputNumber autoComplete="off" min={0} style={{ width: '100%' }} />
          </FormItem>
        </Row>
      )}

      <Row style={{ marginTop: 5, marginBottom: hasMinMaxPrice ? 0 : 24 }}>
        <Checkbox
          checked={hasMinMaxPrice}
          onChange={({ target: { checked } }) => {
            setHasMinMaxPrice(checked);
            if (!checked) {
              form.setFieldValue(['item', 'minPrice'], undefined);
              form.setFieldValue(['item', 'maxPrice'], undefined);
            }
          }}
        >
          Set limit
        </Checkbox>
      </Row>

      {hasMinMaxPrice && (
        <MinMaxFormItem>
          <Row style={{ marginLeft: 24, marginTop: 10 }} justify="space-between">
            <Col span={11}>
              <label style={{ fontSize: 12, marginBottom: 5, display: 'block' }}>Min price</label>
              <FormItem
                noStyle
                dependencies={[['item', 'maxPrice']]}
                name={['item', 'minPrice']}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const maxPrice = getFieldValue(['item', 'maxPrice']);

                      if (value && maxPrice && value >= maxPrice) {
                        return Promise.reject(new Error('Minimum must be less than maximum.'));
                      }

                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <InputNumber autoComplete="off" min={0} style={{ width: '100%' }} />
              </FormItem>
            </Col>

            <Col span={11}>
              <label style={{ fontSize: 12, marginBottom: 5, display: 'block' }}>Max price</label>
              <FormItem noStyle name={['item', 'maxPrice']}>
                <InputNumber autoComplete="off" min={0} style={{ width: '100%' }} />
              </FormItem>
            </Col>
          </Row>
        </MinMaxFormItem>
      )}
    </FormItem>
  );
};

const CheckoutProductFormItems = () => {
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);
  const networks = useNetworks();
  const form = Form.useFormInstance();

  const isFixedPrice = form.getFieldValue(['item', 'priceType']) === 'fixed';

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

      {/* <FormItem label="Price Type">
        <Select>
          {['Fixed', 'Flexible'].map((type) => (
            <Select.Option key={type} value={type}>
              {type}
            </Select.Option>
          ))}
        </Select>
      </FormItem> */}

      <FormItem label="Price Type" name={['item', 'priceType']} style={{ marginBottom: 14 }}>
        <Radio.Group>
          <Radio value="fixed">Fixed</Radio>
          <Radio value="flexible">Flexible</Radio>
        </Radio.Group>
      </FormItem>

      {isFixedPrice ? <ProductPriceFormItem /> : <FlexProductPriceFormItem />}

      <Form.Item label={t<string>('description')} name={['item', 'description']}>
        <Input.TextArea autoComplete="off" rows={2} placeholder={t<string>('descriptionPlaceholder')} />
      </Form.Item>
    </>
  );
};

export default CheckoutProductFormItems;
