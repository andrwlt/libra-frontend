import { useState } from 'react';
import { StyledContainer } from 'components/Common/Styled';
import CardHeader from 'components/Common/CardHeader';
import Secret from 'components/Common/Secret';
import { useTranslation } from 'react-i18next';
import { Button, Table, Row, Popconfirm, Dropdown, Tag, Popover, Typography, Space, Badge } from 'antd';
import WebhookForm from './WebhookForm';
import type { MenuProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { useWebhooks, useDeleteWebhook, useUpdateWebhook, useResetWebhook } from 'features/webhook/webhookHooks';
import { WebhookResponse } from './types';
import getTableLoaderProps from 'components/Common/TableLoader';
import { SubTableCard } from 'components/Common/Styled';
import { usePageChange, useURLQueryParams } from 'app/hooks';
import { LOCALE_WORKSPACE } from 'app/i18n';

const Webhooks = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [openedPopconfirmDelete, setOpenedPopconfirmDelete] = useState('');
  const [openedPopconfirmDisable, setOpenedPopconfirmDisable] = useState('');
  const { webhooks, getWebhooksLoading, webhooksPaging, refreshCurrentPage } = useWebhooks();
  const { onGoBack, onGoNext, goToFirstPage } = usePageChange(webhooksPaging);
  useResetWebhook();

  const afterUpdatingSucceeded = () => {
    setIsFormOpen(false);
    setEditingWebhook(undefined);
    setOpenedPopconfirmDisable('');
  };

  const { beforeId, afterId } = useURLQueryParams();

  const refreshData = () => {
    const isInFirstPage = !beforeId && !afterId;
    if (isInFirstPage) {
      refreshCurrentPage();
    } else {
      goToFirstPage();
    }
  };

  const afterDeleteSuccess = () => {
    setOpenedPopconfirmDelete('');
    refreshData();
  };

  const afterCreatingSucceeded = () => {
    setIsFormOpen(false);
    refreshData();
  };

  const { updateWebhookLoading, handleUpdateWebhook } = useUpdateWebhook(afterUpdatingSucceeded);
  const { handleDeleteWebhook, deleteWebhookLoading } = useDeleteWebhook(afterDeleteSuccess);

  const [editingWebhook, setEditingWebhook] = useState<WebhookResponse | undefined>(undefined);
  const { t } = useTranslation(LOCALE_WORKSPACE.WEBHOOK);
  const { t: tLayout } = useTranslation(LOCALE_WORKSPACE.LAYOUT);
  const toggleWebhookStatus = (webhook: WebhookResponse) => {
    const nextStatus = !webhook.active;

    handleUpdateWebhook(
      {
        ...webhook,
        active: nextStatus,
      },
      nextStatus,
    );
  };

  const columns: ColumnsType<any> = [
    {
      title: t('url'),
      key: 'url',
      dataIndex: 'url',
      render: (url) => <span style={{ fontWeight: 500, opacity: 0.7 }}>{url}</span>,
    },

    {
      title: t('events'),
      key: 'events',
      dataIndex: 'events',
      align: 'center',
      width: 120,
      render: (events: string[]) => (
        <Popover
          placement="bottom"
          content={
            <Space direction="vertical">
              {events.map((event) => (
                <Typography.Text type="secondary">- {event}</Typography.Text>
              ))}
            </Space>
          }
        >
          <Badge count={events.length} style={{ backgroundColor: '#52c41a' }} />
        </Popover>
      ),
    },

    {
      title: t('status'),
      key: 'active',
      dataIndex: 'active',
      render: (active: boolean) => {
        const text = active ? 'Active' : 'Deactivated';
        const color = active ? 'success' : 'orange';
        return <Tag color={color}>{text}</Tag>;
      },
      width: 120,
    },

    {
      title: t('secret'),
      key: 'secret',
      dataIndex: 'secret',
      render: (secret: string) => <Secret value={secret} />,
    },
    {
      title: '',
      width: 50,
      render: (webhook: WebhookResponse) => {
        const items: MenuProps['items'] = [
          {
            label: (
              <p
                className="styled-table__action-item"
                onClick={() => {
                  setIsFormOpen(true);
                  setEditingWebhook(webhook);
                }}
              >
                {tLayout('edit')}
              </p>
            ),
            key: 'Edit',
          },

          {
            label: (
              <p className="styled-table__action-item" onClick={() => setOpenedPopconfirmDisable(webhook.id)}>
                {webhook.active ? 'Disable' : 'Enable'}
              </p>
            ),
            key: 'Disable',
          },
          { type: 'divider' },
          {
            label: (
              <p
                className="styled-table__action-item color-error"
                onClick={() => setOpenedPopconfirmDelete(webhook.id)}
              >
                {tLayout('delete')}
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
            {openedPopconfirmDelete ? (
              <Popconfirm
                title={t('deleteWebhookWarning')}
                onConfirm={() => handleDeleteWebhook(webhook.id)}
                okText={tLayout('delete')}
                cancelText={tLayout('cancel')}
                okButtonProps={{ loading: deleteWebhookLoading }}
                cancelButtonProps={{ disabled: deleteWebhookLoading }}
                open={openedPopconfirmDelete === webhook.id}
                onCancel={() => setOpenedPopconfirmDelete('')}
                destroyTooltipOnHide={true}
              >
                <Button size="small" type="text" icon={<EllipsisOutlined />}></Button>
              </Popconfirm>
            ) : (
              <Popconfirm
                destroyTooltipOnHide={true}
                title={webhook.active ? t('disableWebhookWarning') : t('enableWebhookWarning')}
                onConfirm={() => toggleWebhookStatus(webhook)}
                okText={webhook.active ? tLayout('disable') : tLayout('enable')}
                cancelText={tLayout('cancel')}
                okButtonProps={{ loading: updateWebhookLoading }}
                cancelButtonProps={{ disabled: updateWebhookLoading }}
                open={openedPopconfirmDisable === webhook.id}
                onCancel={() => setOpenedPopconfirmDisable('')}
              >
                <Button size="small" type="text" icon={<EllipsisOutlined />}></Button>
              </Popconfirm>
            )}
          </Dropdown>
        );
      },
      key: 'action',
    },
  ];

  return (
    <div>
      <StyledContainer>
        <div style={{ padding: 20 }}>
          <CardHeader title={tLayout('webhooks')}>
            {' '}
            <Button onClick={() => setIsFormOpen(true)} icon={<PlusOutlined />} type="primary">
              {tLayout('create')}
            </Button>
          </CardHeader>
          <SubTableCard style={{ padding: 0 }} bordered={false}>
            <Table
              pagination={false}
              dataSource={webhooks}
              columns={columns}
              rowKey="id"
              {...getTableLoaderProps(getWebhooksLoading)}
            />

            <Row justify="end" style={{ marginTop: 20, paddingRight: 20 }}>
              {webhooksPaging.hasPrevPage && (
                <Button size="small" onClick={onGoBack} disabled={getWebhooksLoading} style={{ marginRight: 10 }}>
                  {tLayout('previous')}
                </Button>
              )}

              {webhooksPaging.hasNextPage && (
                <Button size="small" onClick={onGoNext} disabled={getWebhooksLoading}>
                  {tLayout('next')}
                </Button>
              )}
            </Row>
          </SubTableCard>
        </div>
      </StyledContainer>

      <WebhookForm
        updateWebhookLoading={updateWebhookLoading}
        handleUpdateWebhook={handleUpdateWebhook}
        initialValues={editingWebhook}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingWebhook(undefined);
        }}
        afterCreatingSucceeded={afterCreatingSucceeded}
      />
    </div>
  );
};

export default Webhooks;
