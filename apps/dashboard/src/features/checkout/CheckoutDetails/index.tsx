import {
  Asset,
  AssetMetadata,
  Loading,
  NumberPriceCheckoutResponse,
  NumberPriceProduct,
  priceFormatHelper,
} from '@atscale/libra-ui';
import { useCheckoutDetails } from 'features/checkout/checkoutHooks';
import { useParams } from 'react-router-dom';
import { Typography, Row, Table, Space, Avatar, Col } from 'antd';
import { getAssetMetadata } from '@atscale/libra-ui';
import { Fragment } from 'react';
import CopyableField from 'components/Common/CopyableField';
import { formatCreatedDate, getCheckoutLink } from 'utils/format/formatText';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { LOCALE_WORKSPACE } from 'app/i18n';
import { Performance as PerformanceType } from 'features/checkout/types';
import { CheckoutComponent } from '@atscale/libra-ui';
import Previewer from 'components/Checkout/Previewer';
import { NextCharge } from 'features/payment/types';
import ChargeStatus from 'features/payment/Payments/Table/ChargeStatus';
import styled from 'styled-components';
const { Title, Text } = Typography;

const PLACEHOLDER_PRODUCT_ICON =
  'https://static.vecteezy.com/system/resources/thumbnails/002/590/547/small/box-carton-delivery-line-style-icon-free-vector.jpg';

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div style={{ boxShadow: 'rgb(235, 238, 241) 0px -1px 0px 0px inset', width: '100%' }}>
      <Title level={4} style={{ margin: 0, paddingTop: 16, paddingBottom: 12 }}>
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

const Header = ({ checkout }: { checkout: NumberPriceCheckoutResponse }) => {
  const { assetId, networkId, item } = checkout;
  const assetMetadata = getAssetMetadata({ assetId, networkId });
  const isFixedPrice = checkout.item.price.type === 'fixed';

  return (
    <Fragment>
      <Row style={{ marginTop: 28, marginBottom: 0 }}>
        <Text type="secondary" style={{ textTransform: 'uppercase', color: 'rgb(104, 115, 133)', fontSize: 13 }}>
          Checkout Details
        </Text>
      </Row>
      <Row align="bottom">
        <Title level={2} style={{ margin: 0, fontSize: 28 }}>
          {checkout?.item.name}
          {isFixedPrice && (
            <Fragment>
              <Text style={{ margin: 0, marginLeft: 7, fontSize: 20, fontWeight: 300, color: 'rgb(104, 115, 133)' }}>
                for
              </Text>{' '}
              <Text style={{ margin: 0, fontSize: 20, fontWeight: 300, color: 'rgb(26, 27, 37)' }}>
                {item.price.value} {assetMetadata.symbol}
              </Text>
            </Fragment>
          )}
        </Title>
      </Row>
      <Text style={{ color: 'rgb(65, 69, 82)', marginTop: 10, marginBottom: 5, display: 'block' }}>
        Copy and share to start accepting payments with this link.
      </Text>

      <Row>
        <CopyableField textStyle={{ fontWeight: 500 }} text={getCheckoutLink(checkout.id)} />
      </Row>
    </Fragment>
  );
};

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

      render: (_, { image }) => (
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
    <div style={{ marginTop: 20 }}>
      <SectionTitle title="Product" />
      <Table size="small" rowKey={'name'} columns={columns} dataSource={[checkout.item]} pagination={false} />
    </div>
  );
};

const InfoItem = ({ label, value, style = {} }: { label: string; value: string | number; style?: any }) => {
  return (
    <Row style={{ ...style, padding: '4px 0' }}>
      <div style={{ width: 100 }}>
        <Text type="secondary">{label}</Text>
      </div>

      <Text>{value}</Text>
    </Row>
  );
};

const PaymentMethod = ({ payee, assetMetadata }: { payee: string; assetMetadata: AssetMetadata }) => {
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

      <InfoItem label="Payee" value={payee} />
    </div>
  );
};

const Performance = ({ performance }: { performance: PerformanceType }) => {
  const { views, sales, revenue } = performance;
  return (
    <div style={{ marginTop: 35 }}>
      <SectionTitle title="Sales" />
      <InfoItem style={{ marginTop: 12 }} label="Views" value={views} />
      <InfoItem label="Sales" value={sales} />
      <InfoItem label="Revenue" value={revenue} />
    </div>
  );
};

const PaymentTableWrapper = styled.div`
  .ant-table-content {
    .amount-th {
      &::before {
        content: none !important;
      }

      white-space: nowrap;
    }

    .status-th {
      padding-left: 3px !important;
      padding-right: 70px;
    }
  }
`;

const CheckoutPayments = ({ payments }: { payments: NextCharge[] }) => {
  const { t } = useTranslation(LOCALE_WORKSPACE.PAYMENT);
  const columns: ColumnsType<NextCharge> = [
    {
      className: 'amount-th',
      key: 'amount',
      title: t('amount'),
      width: 100,
      render: ({ assetId, networkId, amount }) => {
        const asset = { assetId, networkId };
        const assetMetadata = getAssetMetadata(asset);

        return (
          <Space>
            <Avatar src={assetMetadata.logoUrl} size={24}>
              {assetMetadata.symbol}
            </Avatar>
            {priceFormatHelper.getCheckoutPrice({ price: amount, asset }, assetMetadata)}
          </Space>
        );
      },
    },
    {
      className: 'status-th',
      title: '',
      width: 30,
      key: 'status',
      align: 'left',
      render: ({ status }) => {
        return <ChargeStatus status={status} />;
      },
    },

    {
      key: 'Customer',
      title: t('customer'),
      render: ({ receiptEmail }) => <span>{receiptEmail}</span>,
    },
    {
      key: 'description',
      title: t('description'),
      dataIndex: 'description',
      className: 'charge-description',
    },
    {
      key: 'created',
      title: t('created'),
      render: ({ created }) => <span>{formatCreatedDate(created)}</span>,
      width: 200,
    },
  ];
  return (
    <PaymentTableWrapper style={{ marginTop: 35 }}>
      <SectionTitle title="Latest Payments" />
      <Table rowKey={'name'} columns={columns} dataSource={payments} pagination={false} />
    </PaymentTableWrapper>
  );
};

const CheckoutDetails = () => {
  const { id } = useParams();
  const { checkoutDetails, getCheckoutDetailsLoading } = useCheckoutDetails(id);

  if (!checkoutDetails) {
    return (
      <div>
        <Loading isContentPage loading={getCheckoutDetailsLoading} />
      </div>
    );
  }

  const { checkout, performance, payments } = checkoutDetails;
  console.log('checkoutDetails', checkoutDetails);
  const { assetId, networkId, payee } = checkout;
  const asset = {
    assetId,
    networkId,
  };

  const assetMetadata = getAssetMetadata(asset);

  return (
    <div className="checkout-details transparent-table" style={{ paddingBottom: 40 }}>
      <Row justify={'space-between'}>
        <Col span={14}>
          <Header checkout={checkout} />
          <ProductTable checkout={checkout} />
          <PaymentMethod payee={payee} assetMetadata={assetMetadata} />
          <Performance performance={performance} />
        </Col>
        <Col span={9} style={{ marginTop: 165 }}>
          <Title level={4} style={{ margin: 0, paddingTop: 16, paddingBottom: 20, marginBottom: 0 }}>
            Preview
          </Title>

          <Previewer small>
            <CheckoutComponent
              flexPriceValid={true}
              loading={false}
              checkoutData={checkout}
              isShowAfterPayment={false}
            />
          </Previewer>
        </Col>
      </Row>
      <Row style={{ width: '100%' }}>
        <Col span={14}>
          <CheckoutPayments payments={payments} />
        </Col>
      </Row>

      <Loading isContentPage loading={getCheckoutDetailsLoading} />
    </div>
  );
};

export default CheckoutDetails;
