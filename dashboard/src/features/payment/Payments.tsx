import styled from 'styled-components';
import { Table, Badge, theme, Card, Button, Result, Space, Avatar } from 'antd';
import { WalletOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Charge as ChargeDataType } from './types';
import { truncate } from 'utils/format/formatText';
import { useNavigate } from 'react-router-dom';
import subscan from 'utils/subscan';
import PATHS from 'router/paths';
import { useCharges } from 'features/payment/paymentHooks';
import PageHeader from 'components/Common/PageHeader';
import { useTranslation } from 'react-i18next';
import { ASSET_METADATA } from 'config';
import { formatBalance } from 'utils/format/balance';

const useChargeStatusColor = (status: string) => {
  const {
    token: { colorSuccess, colorPrimary, colorError },
  } = theme.useToken();

  if (status === 'succeeded') {
    return colorSuccess;
  }

  if (status === 'failed') {
    return colorError;
  }

  return colorPrimary;
};

const ChargeStatus = ({ status }: { status: string }) => {
  const color = useChargeStatusColor(status);
  return <Badge count={status} color={color} style={{ textTransform: 'capitalize' }} />;
};

const columns: ColumnsType<ChargeDataType> = [
  {
    key: 'hash',
    title: 'Hash',
    render: ({ asset, hash }) => <a href={subscan.getTxUrl(asset, hash)}>{truncate(hash)}</a>,
  },
  {
    key: 'status',
    title: 'Status',
    render: ({ status }) => <ChargeStatus status={status} />,
  },
  {
    key: 'from',
    title: 'Customer',
    render: ({ asset, from }) => <a href={subscan.getAccountUrl(asset, from)}>{truncate(from)}</a>,
  },
  {
    key: 'amount',
    title: 'Amount',
    align: 'right',
    render: ({ asset, amount }) => {
      const assetMetadata = ASSET_METADATA[asset];
      return (
        <Space align="center">
          {assetMetadata && (
            <Avatar src={assetMetadata.logo} size="small">
              {asset}
            </Avatar>
          )}
          <span> { formatBalance(amount, asset)} {ASSET_METADATA[asset].symbol}</span>
        </Space>
      );
    },
  },
  {
    key: 'description',
    title: 'Description',
    render: ({ receiptEmail  }) => <a>{receiptEmail}</a>,
  },
];

const Wrapper = styled.div`
  padding: 32px;
  max-width: 1440px;
  margin: auto;
`;

export default function Payments() {
  const { t } = useTranslation();
  const { charges, hasCheckout, getChargesLoading } = useCharges();
  console.log(charges);
  const navigate = useNavigate();

  const {
    token: { boxShadow },
  } = theme.useToken();

  const subTitle = hasCheckout ? t('payment.hasCheckoutSubtitle') : t('payment.hasNoCheckoutSubtitle');

  const goToCheckouts = () => {
    navigate(PATHS.checkout.root);
  };

  const goToCreateCheckout = () => {
    navigate(PATHS.checkout.create);
  };

  return (
    <Wrapper>
      <PageHeader title="Payments" />

      {getChargesLoading || charges.length > 0 ? (
        <Table style={{ boxShadow }} loading={getChargesLoading} columns={columns} dataSource={charges} rowKey="id" />
      ) : (
        <Card style={{ boxShadow }}>
          <Result
            style={{ maxWidth: '480px', margin: 'auto' }}
            icon={<WalletOutlined />}
            title={t('payment.paymentWillShowHere')}
            subTitle={subTitle}
            extra={[
              <Button key="1" type="primary" onClick={hasCheckout ? goToCheckouts : goToCreateCheckout}>
                {hasCheckout ? t('payment.getCheckoutLinks') : t('checkout.createCheckout')}
              </Button>,
            ]}
          ></Result>
        </Card>
      )}
    </Wrapper>
  );
}
