import { useState } from 'react';
import { Button, Card, Result, Space, Avatar, Popconfirm, Table, Tag, Dropdown, Row } from 'antd';
import { ShopOutlined, EllipsisOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useCheckouts, useDeleteCheckout, useResetCheckout } from 'features/checkout/checkoutHooks';
import { useNavigate } from 'react-router-dom';
import CopyableField from 'components/Common/CopyableField';
import { getCheckoutLink, getCheckoutPrice, formatCreatedDate } from 'utils/format/formatText';
import { ASSET_METADATA } from 'config';
import PATHS from 'router/paths';
import PageHeader from 'components/Common/PageHeader';
import { useTranslation } from 'react-i18next';
import { CheckoutResponse as Checkout } from './types';
import type { MenuProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { StyledContainer } from 'components/Common/Styled';

export default function Checkouts() {
  const { t } = useTranslation();
  const [openedPopconfirm, setOpenedPopconfirm] = useState('');
  const { checkouts, getCheckoutsLoading, checkoutsPaging, fetchCheckouts } = useCheckouts();
  const navigate = useNavigate();
  const { handleDeleteCheckout, deleteCheckoutLoading } = useDeleteCheckout();
  useResetCheckout();

  const goToCreateCheckout = () => navigate(PATHS.checkout.create);
  const goToEditCheckout = (id: string) => navigate(`/checkouts/${id}/edit`);

  const hasCheckout = checkouts.length > 0;

  const columns: ColumnsType<Checkout> = [
    {
      title: 'Link URL',
      key: 'Link URL',
      render: (checkout: Checkout) => <CopyableField style={{ minWidth: 320 }} text={getCheckoutLink(checkout.id)} />,
    },
    {
      title: 'Status',
      key: 'Status',
      render: ({ active }: Checkout) => {
        const text = active ? 'Active' : 'Deactivated';
        const color = active ? 'success' : 'default';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Name',
      key: 'Name',
      render: ({ item: { name } }: Checkout) => name,
    },
    {
      title: 'Price',
      key: 'Price',
      render: ({ item: { price }, asset }: Checkout) => {
        const assetMetadata = ASSET_METADATA[asset];
        return (
          <Space align="center">
            {assetMetadata && (
              <Avatar src={assetMetadata.logo} size="small">
                {asset}
              </Avatar>
            )}
            <span> {getCheckoutPrice({ price: price, asset: asset }, assetMetadata)}</span>
          </Space>
        );
      },
    },
    {
      title: 'Created',
      key: 'Created',
      render: (checkout: Checkout) => {
        return formatCreatedDate(checkout.created);
      },
    },
    {
      title: '',
      width: 70,
      render: (checkout: Checkout) => {
        const items: MenuProps['items'] = [
          {
            label: (
              <p className="checkout-table__action-item color-link" onClick={() => goToEditCheckout(checkout.id)}>
                <EditOutlined style={{ marginRight: 5 }} /> Edit
              </p>
            ),
            key: 'Edit',
          },
          {
            label: (
              <p className="checkout-table__action-item color-error" onClick={() => setOpenedPopconfirm(checkout.id)}>
                <DeleteOutlined color="error" style={{ marginRight: 5 }} /> Delete
              </p>
            ),
            key: 'Delete',
          },
        ];
        return (
          <Dropdown
            menu={{ items }}
            trigger={['click']}
            overlayStyle={{ width: 100 }}
            overlayClassName="checkout-table__actions"
            placement="bottomRight"
            arrow
          >
            <Popconfirm
              title={t('checkout.deleteCheckoutWarning')}
              onConfirm={() => handleDeleteCheckout(checkout.id)}
              okText="Delete"
              cancelText="Cancel"
              okButtonProps={{ loading: deleteCheckoutLoading }}
              cancelButtonProps={{ disabled: deleteCheckoutLoading }}
              open={openedPopconfirm === checkout.id}
              onCancel={() => setOpenedPopconfirm('')}
            >
              <Button size="small" type="text">
                <EllipsisOutlined />
              </Button>
            </Popconfirm>
          </Dropdown>
        );
      },
      key: 'action',
    },
  ];

  return (
    <div>
      <PageHeader title={t('checkouts')}>
        {hasCheckout && (
          <Button type="primary" onClick={goToCreateCheckout}>
            <PlusOutlined /> {t('create')}
          </Button>
        )}
      </PageHeader>

      <StyledContainer>
        <Card>
          {getCheckoutsLoading || hasCheckout ? (
            <>
              <Table
                size="middle"
                dataSource={checkouts}
                columns={columns}
                loading={getCheckoutsLoading}
                pagination={false}
                rowKey="id"
              />

              {hasCheckout && (
                <Row justify="end" style={{ marginTop: 20 }}>
                  <Button
                    size="small"
                    onClick={fetchCheckouts}
                    disabled={!checkoutsPaging.hasPrevPage || getCheckoutsLoading}
                    style={{ marginRight: 10 }}
                  >
                    Previous
                  </Button>{' '}
                  <Button
                    size="small"
                    onClick={fetchCheckouts}
                    disabled={!checkoutsPaging.hasNextPage || getCheckoutsLoading}
                  >
                    Next
                  </Button>
                </Row>
              )}
            </>
          ) : (
            <Result
              style={{ maxWidth: '480px', margin: 'auto' }}
              icon={<ShopOutlined />}
              title={t('checkout.startSellingProduct')}
              subTitle={t('checkout.toStartSellingProduct')}
              extra={[
                <Button key="1" type="primary" onClick={goToCreateCheckout}>
                  <PlusOutlined /> {t('checkout.createCheckout')}
                </Button>,
              ]}
            ></Result>
          )}
        </Card>
      </StyledContainer>
    </div>
  );
}
