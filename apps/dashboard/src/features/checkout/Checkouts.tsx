import { Fragment, useState } from 'react';
import { Button, Card, Result, Space, Avatar, Popconfirm, Table, Tag, Dropdown, Row } from 'antd';
import { ShopOutlined, EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { useCheckouts, useDeleteCheckout, useResetCheckout } from 'features/checkout/checkoutHooks';
import { useNavigate } from 'react-router-dom';
import CopyableField from 'components/Common/CopyableField';
import { getCheckoutLink, getCheckoutPrice, formatCreatedDate } from 'utils/format/formatText';
import { ASSET_METADATA } from 'config';
import PATHS from 'router/paths';
import PageHeader from 'components/Common/PageHeader';
import { useTranslation } from 'react-i18next';
import { CheckoutResponseType as Checkout } from './types';
import type { MenuProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { StyledContainer } from 'components/Common/Styled';
import getTableLoaderProps from 'components/Common/TableLoader';
import Loading from 'components/Common/Loading';

export default function Checkouts() {
  const { t } = useTranslation();
  const [openedPopconfirm, setOpenedPopconfirm] = useState('');
  const { checkouts, getCheckoutsLoading, checkoutsPaging, fetchCheckouts, isFirstLoad } = useCheckouts();
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
      render: (checkout: Checkout) => <CopyableField style={{ minWidth: 420 }} text={getCheckoutLink(checkout.id)} />,
      width: 500,
    },
    {
      title: 'Status',
      key: 'Status',
      render: ({ active }: Checkout) => {
        const text = active ? 'Active' : 'Deactivated';
        const color = active ? 'success' : 'orange';
        return <Tag color={color}>{text}</Tag>;
      },
      width: 120,
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
      width: 200,
    },
    {
      title: '',
      width: 50,
      render: (checkout: Checkout) => {
        const items: MenuProps['items'] = [
          {
            label: (
              <p className="styled-table__action-item" onClick={() => goToEditCheckout(checkout.id)}>
                Edit
              </p>
            ),
            key: 'Edit',
          },
          { type: 'divider' },
          {
            label: (
              <p className="styled-table__action-item color-error" onClick={() => setOpenedPopconfirm(checkout.id)}>
                Delete
              </p>
            ),
            key: 'Delete',
          },
        ];
        return (
          <Dropdown
            menu={{ items }}
            trigger={['click']}
            overlayStyle={{ width: 150 }}
            overlayClassName="styled-table__actions"
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
            <Fragment>
              <Table
                size="middle"
                dataSource={checkouts}
                columns={columns}
                pagination={false}
                rowKey="id"
                {...getTableLoaderProps(getCheckoutsLoading)}
              />

              {hasCheckout && (
                <Row justify="end" style={{ marginTop: 20 }}>
                  <Button
                    size="small"
                    onClick={() => fetchCheckouts({ isGoNext: false })}
                    disabled={!checkoutsPaging.hasPrevPage || getCheckoutsLoading}
                    style={{ marginRight: 10 }}
                  >
                    {t('paging.previous')}
                  </Button>{' '}
                  <Button
                    size="small"
                    onClick={() => fetchCheckouts()}
                    disabled={!checkoutsPaging.hasNextPage || getCheckoutsLoading}
                  >
                    {t('paging.next')}
                  </Button>
                </Row>
              )}
            </Fragment>
          ) : (
            <Result
              style={{ maxWidth: '480px', margin: 'auto' }}
              icon={<ShopOutlined />}
              title={t('checkout.emptyTitle')}
              subTitle={t('checkout.emptyText')}
              extra={[
                <Button key="1" type="primary" onClick={goToCreateCheckout} icon={<PlusOutlined />}>
                  {t('checkout.createCheckoutNow')}
                </Button>,
              ]}
            ></Result>
          )}
        </Card>
      </StyledContainer>
      <Loading isContentPage loading={isFirstLoad} />
    </div>
  );
}
