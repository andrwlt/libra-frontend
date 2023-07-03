import {
  Asset,
  AssetMetadata,
  NumberPriceCheckoutResponse,
  NumberPriceProduct,
  getSs58AddressByAsset,
  priceFormatHelper,
} from '@atscale/libra-ui';
import { Typography, Row, Table, Space, Avatar, Card } from 'antd';
import { getAssetMetadata } from '@atscale/libra-ui';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { LOCALE_WORKSPACE } from 'app/i18n';
import styled from 'styled-components';

const { Title, Text } = Typography;

const PLACEHOLDER_PRODUCT_ICON =
  'https://static.vecteezy.com/system/resources/thumbnails/002/590/547/small/box-carton-delivery-line-style-icon-free-vector.jpg';

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div style={{ boxShadow: 'rgb(235, 238, 241) 0px -1px 0px 0px inset', width: '100%' }}>
      <Title level={4} style={{ margin: 0, paddingBottom: 12 }}>
        {title}
      </Title>
    </div>
  );
};

const CheckoutPrice = ({
  price,
  assetMetadata,
  asset,
}: {
  price?: number | null;
  assetMetadata: AssetMetadata;
  asset: Asset;
}) => {
  return !price ? (
    <Text type="secondary">None</Text>
  ) : (
    <Space align="center">
      <Avatar src={assetMetadata.logoUrl} size="small">
        {assetMetadata.symbol}
      </Avatar>
      <span>{price && priceFormatHelper.getCheckoutPrice({ price, asset }, assetMetadata)}</span>
    </Space>
  );
};

const ProductTableWrapper = styled.div`
  .ant-table-content {
    thead {
      .photo-th {
        &::before,
        &::after {
          content: none !important;
        }
      }
    }
  }
`;

const ProductTable = ({ checkout }: { checkout: NumberPriceCheckoutResponse }) => {
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);
  const isFixedPrice = checkout.item.price.type === 'fixed';
  const asset = {
    assetId: checkout.assetId,
    networkId: checkout.networkId,
  };
  const assetMetadata = getAssetMetadata(asset);

  const mutualColumns: ColumnsType<NumberPriceProduct> = [
    {
      title: '',
      key: 'Photo',
      width: 50,
      className: 'photo-th',

      render: (_, { image }) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            style={{
              width: 35,
              height: 35,
              objectFit: 'contain',
              borderRadius: 4,
              backgroundColor: 'rgba(247, 250, 252, 0.5)',
            }}
            src={image || PLACEHOLDER_PRODUCT_ICON}
            alt="product"
          />
        </div>
      ),
    },
    {
      title: t('name'),
      key: 'Name',

      render: (_, { name }) =>
        isFixedPrice ? (
          <div style={{ color: '#1677ff', cursor: 'pointer' }}>{name}</div>
        ) : (
          <div>
            <div style={{ color: '#1677ff', cursor: 'pointer' }}>{name}</div>
            <Text type="secondary">{`Flexible price (${assetMetadata.symbol})`}</Text>
          </div>
        ),
    },
  ];

  const columns: ColumnsType<NumberPriceProduct> = isFixedPrice
    ? [
        ...mutualColumns,
        {
          title: t('price'),
          key: 'Price',
          render: (_, { price: { value } }) => (
            <CheckoutPrice price={value} assetMetadata={assetMetadata} asset={asset} />
          ),
        },
      ]
    : [
        ...mutualColumns,
        {
          title: 'Preset price',
          key: 'Preset',
          render: (_, { price: { preset } }) => (
            <CheckoutPrice price={preset} assetMetadata={assetMetadata} asset={asset} />
          ),
        },
        {
          title: 'Minimum price',
          key: 'Minimum',
          render: (_, { price: { minimum } }) => {
            return <CheckoutPrice price={minimum} assetMetadata={assetMetadata} asset={asset} />;
          },
        },
        {
          title: 'Maximum price',
          key: 'Maximum',
          render: (_, { price: { maximum } }) => {
            return <CheckoutPrice price={maximum} assetMetadata={assetMetadata} asset={asset} />;
          },
        },
      ];

  return (
    <ProductTableWrapper>
      <SectionTitle title="Product" />
      <Table size="small" rowKey={'name'} columns={columns} dataSource={[checkout.item]} pagination={false} />
    </ProductTableWrapper>
  );
};

const PaymentMethod = ({
  payee,
  assetMetadata,
  asset,
}: {
  payee: string;
  assetMetadata: AssetMetadata;
  asset: Asset;
}) => {
  return (
    <div style={{ marginTop: 35 }}>
      <SectionTitle title="Payment method" />
      <Row style={{ marginTop: 12 }}>
        <div style={{ width: 100 }}>
          <Text type="secondary" style={{ lineHeight: '23px', display: 'block' }}>
            Currency
          </Text>
        </div>

        <Space size={5}>
          <Avatar src={assetMetadata.logoUrl} size={20}>
            {assetMetadata.symbol}
          </Avatar>
          <Text style={{ lineHeight: '23px', display: 'block' }}> {assetMetadata.name}</Text>
        </Space>
      </Row>

      <Row style={{ padding: '4px 0' }}>
        <div style={{ width: 100 }}>
          <Text type="secondary">Payee</Text>
        </div>
        <Text>{getSs58AddressByAsset(payee, asset)}</Text>
      </Row>
    </div>
  );
};

const Information = ({
  checkout,
  payee,
  assetMetadata,
  asset,
}: {
  checkout: NumberPriceCheckoutResponse;
  payee: string;
  assetMetadata: AssetMetadata;
  asset: Asset;
}) => {
  return (
    <Card>
      <ProductTable checkout={checkout} />
      <PaymentMethod payee={payee} assetMetadata={assetMetadata} asset={asset} />
    </Card>
  );
};

export default Information;
