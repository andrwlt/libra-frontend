import styled from 'styled-components';
import { Typography, Button, Row, Col, Card, Result, Space, Avatar, theme, Popconfirm } from 'antd';
import { ShopOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useCheckouts, useDeleteCheckout } from 'features/checkout/checkoutHooks';
import { useNavigate } from 'react-router-dom';
import CopyableField from 'components/Common/CopyableField';
import { truncate } from 'utils/format/formatText';
import { formatBalance } from 'utils/format/balance';
import { ASSET_METADATA } from 'config';
import PATHS from 'router/paths';
import PageHeader from 'components/Common/PageHeader';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.div`
  padding: 32px;
  max-width: 1440px;
  margin: auto;
`;

const StyledCard = styled(Card)`
  .ant-card-head {
    min-height: 58px;
  }

  .product-description {
    min-height: 22px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Loading = () => (
  <Row gutter={[32, 32]}>
    <Col span={8}>
      <Card loading></Card>
    </Col>
    <Col span={8}>
      <Card loading></Card>
    </Col>
    <Col span={8}>
      <Card loading></Card>
    </Col>
  </Row>
);

function CheckoutItem({
  checkout,
  handleDeleteCheckout,
  deleteCheckoutLoading,
}: {
  checkout: any;
  handleDeleteCheckout: (id: string) => void;
  deleteCheckoutLoading: boolean;
}) {
  const {
    token: { boxShadow, colorError },
  } = theme.useToken();
  const navigate = useNavigate();

  const goToEditCheckout = (id: string) => {
    navigate(`/checkout/${id}/edit`);
  };

  const assetMetadata = ASSET_METADATA[checkout.asset];

  return (
    <StyledCard
      style={{ boxShadow }}
      title={checkout.item.name || ` `}
      actions={[
        <Popconfirm
          title="Are you sure to delete this checkout?"
          onConfirm={() => handleDeleteCheckout(checkout.id)}
          okText="Delete"
          cancelText="Cancel"
        >
          <DeleteOutlined disabled={deleteCheckoutLoading} key="delete" style={{ color: colorError }} />
        </Popconfirm>,
        <EditOutlined disabled={deleteCheckoutLoading} key="edit" onClick={() => goToEditCheckout(checkout.id)} />,
      ]}
    >
      <Space align="center">
        {assetMetadata && (
          <Avatar src={assetMetadata.logo} size="small">
            {checkout.asset}
          </Avatar>
        )}
        <Typography.Title level={3} style={{ margin: '1rem 0' }}>
          {formatBalance(checkout.item.price, checkout.asset)} {assetMetadata ? assetMetadata.symbol : checkout.asset}
        </Typography.Title>
      </Space>
      <Typography.Paragraph className="product-description">{checkout.item.description}</Typography.Paragraph>
      <CopyableField text={truncate(`${process.env.REACT_APP_CHECKOUT_URL}/${checkout.id}`, { start: 32, end: 6 })} />
    </StyledCard>
  );
}

export default function Checkouts() {
  const { t } = useTranslation();
  const { checkouts, getCheckoutsLoading } = useCheckouts();
  const { handleDeleteCheckout, deleteCheckoutLoading } = useDeleteCheckout();
  const navigate = useNavigate();

  const {
    token: { boxShadow },
  } = theme.useToken();

  const goToCreateCheckout = () => navigate(PATHS.checkout.create);
  const hasCheckout = checkouts.length > 0;

  return (
    <Wrapper>
      <PageHeader title="Checkout">
        {hasCheckout && (
          <Button type="primary" onClick={goToCreateCheckout}>
            {t('checkout.createCheckout')}
          </Button>
        )}
      </PageHeader>

      {getCheckoutsLoading ? (
        <Loading />
      ) : hasCheckout ? (
        <Row gutter={[32, 32]}>
          {checkouts.map((checkout) => (
            <Col span={8} key={checkout.id}>
              <CheckoutItem
                checkout={checkout}
                handleDeleteCheckout={handleDeleteCheckout}
                deleteCheckoutLoading={deleteCheckoutLoading}
              ></CheckoutItem>
            </Col>
          ))}
        </Row>
      ) : (
        <Card style={{ boxShadow }}>
          <Result
            style={{ maxWidth: '480px', margin: 'auto' }}
            icon={<ShopOutlined />}
            title={t('checkout.startSellingProduct')}
            subTitle={t('checkout.toStartSellingProduct')}
            extra={[
              <Button key="create" type="primary" onClick={goToCreateCheckout}>
                {t('checkout.createCheckout')}
              </Button>,
            ]}
          ></Result>
        </Card>
      )}
    </Wrapper>
  );
}
