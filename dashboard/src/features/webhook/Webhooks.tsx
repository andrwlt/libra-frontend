import { Fragment, useState } from 'react';
import { StyledContainer } from 'components/Common/Styled';
import PageHeader from 'components/Common/PageHeader';
import Secret from 'components/Common/Secret';
import { useTranslation } from 'react-i18next';
import { Card, Button, Table, Row, Popconfirm, Dropdown, Tag } from 'antd';
import WebhookForm from './WebhookForm';
import type { MenuProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  EllipsisOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DisconnectOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import { useWebhooks, useDeleteWebhook, useResetWebhook, useUpdateWebhook } from 'features/webhook/webhookHooks';
import { WebhookResponse } from './types';
import Loading from 'components/Common/Loading';


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
      render: (url) => <span style={{ fontWeight: 500 }}>{url}</span>,
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
      title: 'Events',
      key: 'events',
      dataIndex: 'events',
      align: 'center',
      render: (events: string[]) => <span>{events.length}</span>,
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
                className="styled-table__action-item color-link"
                onClick={() => {
                  setIsFormOpen(true);
                  setEditingWebhook(webhook);
                }}
              >
                <EditOutlined style={{ marginRight: 5 }} /> Edit
              </p>
            ),
            key: 'Edit',
          },

          {
            label: (
              <p
                className="styled-table__action-item color-link"
                onClick={() => setOpenedPopconfirmDisable(webhook.id)}
              >
                {webhook.active ? (
                  <Fragment>
                    <DisconnectOutlined style={{ marginRight: 5 }} /> Disable
                  </Fragment>
                ) : (
                  <Fragment>
                    <LinkOutlined style={{ marginRight: 5 }} /> Enable
                  </Fragment>
                )}
              </p>
            ),
            key: 'Disable',
          },
          {
            label: (
              <p
                className="styled-table__action-item color-error"
                onClick={() => setOpenedPopconfirmDelete(webhook.id)}
              >
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
            overlayStyle={{ width: 150 }}
            overlayClassName="styled-table__actions"
            placement="bottomRight"
            arrow
          >
            {openedPopconfirmDelete ? (
              <Popconfirm
                title={t('webhook.deleteWebhookWarning')}
                onConfirm={() => handleDeleteWebhook(webhook.id)}
                okText="Delete"
                cancelText="Cancel"
                okButtonProps={{ loading: deleteWebhookLoading }}
                cancelButtonProps={{ disabled: deleteWebhookLoading }}
                open={openedPopconfirmDelete === webhook.id}
                onCancel={() => setOpenedPopconfirmDelete('')}
                destroyTooltipOnHide={true}
              >
                <Button size="small" type="text">
                  <EllipsisOutlined />
                </Button>
              </Popconfirm>
            ) : (
              <Popconfirm
                destroyTooltipOnHide={true}
                title={webhook.active ? t('webhook.disableWebhookWarning') : t('webhook.enableWebhookWarning')}
                onConfirm={() => toggleWebhookStatus(webhook)}
                okText="Disable"
                cancelText="Cancel"
                okButtonProps={{ loading: updateWebhookLoading }}
                cancelButtonProps={{ disabled: updateWebhookLoading }}
                open={openedPopconfirmDisable === webhook.id}
                onCancel={() => setOpenedPopconfirmDisable('')}
              >
                <Button size="small" type="text">
                  <EllipsisOutlined />
                </Button>
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
      <PageHeader title={t('webhooks')}>
        {' '}
        <Button onClick={() => setIsFormOpen(true)} icon={<PlusOutlined />} type="primary">
          {t('create')}
        </Button>
      </PageHeader>

      <StyledContainer>
        <Loading spinning={getWebhooksLoading}>
          <Card>
            <Table pagination={false} dataSource={webhooks} columns={columns} rowKey="id" />
            <Row justify="end" style={{ marginTop: 20 }}>
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
          </Card>
        </Loading>
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
