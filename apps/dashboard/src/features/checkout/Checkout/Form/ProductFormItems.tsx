import { Input, InputNumber, Select, Form, Row, Col, Radio, Checkbox, Typography } from 'antd';
import ImageUploader from 'components/Inputs/ImageUploader';
import { useTranslation } from 'react-i18next';
import { getAssetMetadata, getNetworkAssets } from '@atscale/libra-ui';
import { LOCALE_WORKSPACE } from 'app/i18n';
import { useNetworks } from 'features/auth/authHooks';
import { useState } from 'react';
import styled from 'styled-components';

const ProductImageUploader = styled(ImageUploader)`
  .ant-upload {
    margin-right: 0px !important;
    margin-bottom: 0px !important;
    width: 200px !important;
  }
`;

const FormItem = Form.Item;
const { Title } = Typography;

const priceInputName = ['item', 'price', 'value'];
const presetPriceInputName = ['item', 'price', 'preset'];
const minPriceInputName = ['item', 'price', 'minimum'];
const maxPriceInputName = ['item', 'price', 'maximum'];
const priceTypeInputName = ['item', 'price', 'type'];

const MinMaxFormItem = styled(FormItem)`
  .ant-form-item-explain-error {
    padding-left: 24px;
  }
`;

const ProductPriceFormItem = ({ ver2 }: { ver2?: boolean }) => {
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);

  return (
    <Form.Item
      label={ver2 ? '' : 'Price'}
      name={priceInputName}
      dependencies={['assetId']}
      requiredMark={false}
      style={{ marginTop: 10, width: '100%' }}
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

const FlexProductPriceFormItem = ({ onFieldsChange, ver2 = false }: { onFieldsChange: () => void; ver2?: boolean }) => {
  const form = Form.useFormInstance();
  const initHasPresetPrice = form.getFieldValue(priceInputName) === undefined;
  const initHasMinMaxPrice =
    form.getFieldValue(minPriceInputName) !== undefined || form.getFieldValue(maxPriceInputName) !== undefined;

  const [hasPresetPrice, setHasPresetPrice] = useState(() => initHasPresetPrice);
  const [hasMinMaxPrice, setHasMinMaxPrice] = useState(() => initHasMinMaxPrice);

  return (
    <FormItem noStyle>
      <Row style={ver2 ? { marginLeft: 24, marginTop: ver2 ? 10 : 5 } : {}}>
        <Checkbox
          checked={hasPresetPrice}
          onChange={({ target: { checked } }) => {
            setHasPresetPrice(checked);
            if (!checked) {
              form.setFieldValue(presetPriceInputName, undefined);
            }
            onFieldsChange();
          }}
        >
          Suggest a preset amount
        </Checkbox>
      </Row>

      {hasPresetPrice && (
        <Row style={{ marginLeft: 24, marginTop: 10, width: ver2 ? 'calc(100% - 24px)' : '100%' }}>
          <FormItem
            style={{ width: '100%' }}
            dependencies={[minPriceInputName, maxPriceInputName]}
            name={presetPriceInputName}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const minPrice = getFieldValue(minPriceInputName);
                  const maxPrice = getFieldValue(maxPriceInputName);

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

      <Row
        style={
          ver2
            ? { marginLeft: 24, marginTop: hasPresetPrice ? 0 : 10 }
            : { marginTop: hasPresetPrice ? 0 : 10, marginBottom: hasMinMaxPrice ? 0 : 24 }
        }
      >
        <Checkbox
          checked={hasMinMaxPrice}
          onChange={({ target: { checked } }) => {
            setHasMinMaxPrice(checked);
            if (!checked) {
              form.setFieldValue(minPriceInputName, undefined);
              form.setFieldValue(maxPriceInputName, undefined);
            }

            onFieldsChange();
          }}
        >
          Set limit
        </Checkbox>
      </Row>

      {hasMinMaxPrice && (
        <MinMaxFormItem>
          <Row style={{ marginLeft: 24, marginTop: ver2 ? 5 : 5 }} justify="space-between">
            <Col span={11}>
              <label style={{ fontSize: 12, marginBottom: 5, display: 'block' }}>Min price</label>
              <FormItem
                noStyle
                dependencies={maxPriceInputName}
                name={minPriceInputName}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const maxPrice = getFieldValue(maxPriceInputName);

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
              <FormItem noStyle name={maxPriceInputName}>
                <InputNumber autoComplete="off" min={0} style={{ width: '100%' }} />
              </FormItem>
            </Col>
          </Row>
        </MinMaxFormItem>
      )}
    </FormItem>
  );
};

const Ver2 = ({ onFieldsChange }: { onFieldsChange: () => void }) => {
  const form = Form.useFormInstance();
  const isFixedPrice = form.getFieldValue(priceTypeInputName) === 'fixed';
  return (
    <FormItem label="Price" name={priceTypeInputName} style={{ marginBottom: 14 }}>
      <Radio.Group style={{ width: '100%' }}>
        <Row>
          <Radio value="fixed">Fixed Price</Radio>
        </Row>
        {isFixedPrice && <ProductPriceFormItem ver2 />}

        <Row style={{ marginTop: 5 }}>
          <Radio value="flexible">Flexible Price</Radio>
        </Row>
        {!isFixedPrice && <FlexProductPriceFormItem onFieldsChange={onFieldsChange} ver2 />}
      </Radio.Group>
    </FormItem>
  );
};

const CheckoutProductFormItems = ({ onFieldsChange }: { onFieldsChange: () => void }) => {
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);
  const networks = useNetworks();
  const form = Form.useFormInstance();

  const isFixedPrice = form.getFieldValue(priceTypeInputName) === 'fixed';
  console.log('isFixedPrice', isFixedPrice);
  return (
    <>
      <Title level={5} style={{ marginTop: 5 }}>
        Information
      </Title>
      <Row justify="space-between" style={{ width: '100%' }}>
        <Col span={15}>
          {' '}
          <FormItem
            style={{ marginBottom: 24 }}
            name={['item', 'name']}
            label={t('productNameLabel')}
            rules={[{ required: true, message: t<string>('productNameIsRequired') }]}
            required
          >
            <Input autoComplete="off" placeholder={t<string>('productNamePlaceholder')} />
          </FormItem>
          <Form.Item label={t<string>('description')} name={['item', 'description']}>
            <Input.TextArea autoComplete="off" rows={2} placeholder={t<string>('descriptionPlaceholder')} />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name={['item', 'image']}
            style={{ display: 'flex', justifyContent: 'right', width: '100%', marginTop: 30, marginBottom: 10 }}
            className="upload-image--large"
          >
            <ProductImageUploader label={t<string>('productImage')} purpose="product_image" />
          </Form.Item>
        </Col>
      </Row>

      <Title level={5} style={{ marginTop: 5 }}>
        Pricing
      </Title>
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

      {/* <FormItem label="Price Type" name={priceTypeInputName} style={{ marginBottom: 14 }}>
        <Radio.Group>
          <Radio value="fixed">Fixed Price</Radio>
          <Radio value="flexible">Flexible Price</Radio>
        </Radio.Group>
      </FormItem>

      {isFixedPrice ? <ProductPriceFormItem /> : <FlexProductPriceFormItem onFieldsChange={onFieldsChange} />} */}

      <Ver2 onFieldsChange={onFieldsChange} />
    </>
  );
};

export default CheckoutProductFormItems;
