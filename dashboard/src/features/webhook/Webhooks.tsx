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
import { useWebhooks, useDeleteWebhook, useResetWebhook, useUpdateWebhook } from 'features/webhook/webhookHooks';
import { WebhookResponse } from './types';
import getTableLoaderProps from 'components/Common/TableLoader';
import { SubTableCard } from 'components/Common/Styled';

const Webhooks = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [openedPopconfirmDelete, setOpenedPopconfirmDelete] = useState('');
  const [openedPopconfirmDisable, setOpenedPopconfirmDisable] = useState('');
  const { webhooks, getWebhooksLoading, fetchWebhooks, webhooksPaging } = useWebhooks();

  const afterUpdatingSucceeded = () => {
    setIsFormOpen(false);
    setEditingWebhook(undefined);
    setOpenedPopconfirmDisable('');
  };

  const afterDeleteSuccess = () => {
    setOpenedPopconfirmDelete('');
  };

  const { updateWebhookLoading, handleUpdateWebhook } = useUpdateWebhook(afterUpdatingSucceeded);
  const { handleDeleteWebhook, deleteWebhookLoading } = useDeleteWebhook(afterDeleteSuccess);
  useResetWebhook();

  const [editingWebhook, setEditingWebhook] = useState<WebhookResponse | undefined>(undefined);
  const { t } = useTranslation();

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
      title: 'URL',
      key: 'url',
      dataIndex: 'url',
      render: (url) => <span style={{ fontWeight: 500, opacity: 0.7 }}>{url}</span>,
    },

    {
      title: 'Events',
      key: 'events',
      dataIndex: 'events',
      align: 'center',
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
      title: 'Status',
      key: 'active',
      dataIndex: 'active',
      render: (active: boolean) => {
        const text = active ? 'Active' : 'Deactivated';
        const color = active ? 'success' : 'orange';
        return <Tag color={color}>{text}</Tag>;
      },
    },

    {
      title: 'Secret',
      key: 'secret',
      dataIndex: 'secret',
      render: (secret: string) => <Secret value={secret} />,
    },
    {
      title: '',
      width: 70,
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
                {t('edit')}
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
                {t('delete')}
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
                title={t('webhook.deleteWebhookWarning')}
                onConfirm={() => handleDeleteWebhook(webhook.id)}
                okText={t('delete')}
                cancelText={t('cancel')}
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
                title={webhook.active ? t('webhook.disableWebhookWarning') : t('webhook.enableWebhookWarning')}
                onConfirm={() => toggleWebhookStatus(webhook)}
                okText={webhook.active ? t('disable') : t('enable')}
                cancelText={t('cancel')}
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
          <CardHeader title={t('webhooks')}>
            {' '}
            <Button onClick={() => setIsFormOpen(true)} icon={<PlusOutlined />} type="primary">
              {t('create')}
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
              <Button
                size="small"
                onClick={() => fetchWebhooks({ isGoNext: false })}
                disabled={!webhooksPaging.hasPrevPage || getWebhooksLoading}
                style={{ marginRight: 10 }}
              >
                {t('paging.previous')}
              </Button>{' '}
              <Button
                size="small"
                onClick={() => fetchWebhooks()}
                disabled={!webhooksPaging.hasNextPage || getWebhooksLoading}
              >
                {t('paging.next')}
              </Button>
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
      />
    </div>
  );
};

export default Webhooks;
