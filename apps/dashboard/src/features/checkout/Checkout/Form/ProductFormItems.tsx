import { Input, InputNumber, Select, Form, Row, Col, Radio, Typography } from 'antd';
import ImageUploader from 'components/Inputs/ImageUploader';
import { useTranslation } from 'react-i18next';
import { getAssetMetadata, getNetworkAssets } from '@atscale/libra-ui';
import { LOCALE_WORKSPACE } from 'app/i18n';
import { useNetworks } from 'features/auth/authHooks';
import styled from 'styled-components';
import { Fragment } from 'react';

const FormItem = Form.Item;
const { Title } = Typography;

const priceInputName = ['item', 'price', 'value'];
const presetPriceInputName = ['item', 'price', 'preset'];
const minPriceInputName = ['item', 'price', 'minimum'];
const maxPriceInputName = ['item', 'price', 'maximum'];
const priceTypeInputName = ['item', 'price', 'type'];

const MinMaxFormItem = styled(FormItem)``;

const ProductPriceFormItem = () => {
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);

  return (
    <Form.Item
      name={priceInputName}
      dependencies={['assetId']}
      requiredMark={false}
      style={{ marginTop: 10, marginLeft: 24, width: '100%' }}
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
  return (
    <Fragment>
      <Row style={{ marginLeft: 24, marginTop: 10, width: 'calc(100% - 24px)' }}>
        <FormItem
          style={{ width: '100%' }}
          dependencies={[minPriceInputName, maxPriceInputName]}
          name={presetPriceInputName}
          label="Preset Amount"
          required={false}
          rules={[
            { required: true, message: 'A preset amount is required' },
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
      <MinMaxFormItem>
        <Row style={{ marginLeft: 24, marginTop: 5 }} justify="space-between">
          <Col span={11}>
            <label style={{ fontSize: 12, marginBottom: 5, display: 'block' }}>Min price</label>
            <FormItem
              dependencies={[maxPriceInputName]}
              name={minPriceInputName}
              rules={[
                { required: true, message: 'A minimum amount is required' },
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
            <FormItem name={maxPriceInputName} rules={[{ required: true, message: 'A maximum amount is required' }]}>
              <InputNumber autoComplete="off" min={0} style={{ width: '100%' }} />
            </FormItem>
          </Col>
        </Row>
      </MinMaxFormItem>
    </Fragment>
  );
};

const PriceFormItems = () => {
  const form = Form.useFormInstance();
  const isFixedPrice = form.getFieldValue(priceTypeInputName) === 'fixed';
  return (
    <FormItem label="Price" name={priceTypeInputName} style={{ marginBottom: 14 }}>
      <Radio.Group style={{ width: '100%' }}>
        <Row>
          <Radio value="fixed">Fixed Price</Radio>
        </Row>
        {isFixedPrice && <ProductPriceFormItem />}

        <Row style={{ marginTop: 5 }}>
          <Radio value="flexible">Flexible Price</Radio>
        </Row>
        {!isFixedPrice && <FlexProductPriceFormItem />}
      </Radio.Group>
    </FormItem>
  );
};

const CheckoutProductFormItems = () => {
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);
  const networks = useNetworks();

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
          <FormItem name="checkoutType" label="Action Name">
            <Input autoComplete="off" placeholder={'Pay'} />
          </FormItem>
        </Col>

        <Col span={8}>
          <Form.Item
            name={['item', 'image']}
            style={{ display: 'flex', justifyContent: 'right', width: '100%', marginTop: 30, marginBottom: 10 }}
            className="upload-image--large product-upload"
          >
            <ImageUploader label={t<string>('productImage')} purpose="product_image" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label={t<string>('description')} name={['item', 'description']}>
        <Input.TextArea autoComplete="off" rows={1} placeholder={t<string>('descriptionPlaceholder')} />
      </Form.Item>

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

      <PriceFormItems />
    </>
  );
};

export default CheckoutProductFormItems;
