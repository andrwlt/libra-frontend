import { useState } from 'react';
import { StyledContainer } from 'components/Common/Styled';
import CardHeader from 'components/Common/CardHeader';
import { useTranslation } from 'react-i18next';
import { Button, Table, Row, Popconfirm, Dropdown } from 'antd';
import APIKeyForm from './APIKeyForm';
import type { MenuProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { useAPIKeys, useDeleteAPIKey, useResetAPIKey, useUpdateAPIKey } from 'features/apiKey/apiKeyHooks';
import { APIKey } from './types';
import getTableLoaderProps from 'components/Common/TableLoader';
import { SubTableCard } from 'components/Common/Styled';
import { usePageChange, useURLQueryParams } from 'app/hooks';
import { LOCALE_WORKSPACE } from 'app/i18n';
import CopyableField from 'components/Common/CopyableField';
import { formatCreatedDate } from 'utils/format/formatText';
import { formatAPIKey } from 'utils/format/formatText';

const APIKeys = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [openedPopconfirmDelete, setOpenedPopconfirmDelete] = useState('');
  const { apiKeys, getAPIKeysLoading, apiKeysPaging, refreshCurrentPage } = useAPIKeys();
  const { onGoBack, onGoNext, goToFirstPage } = usePageChange(apiKeysPaging);
  useResetAPIKey();

  const afterUpdatingSucceeded = () => {
    setIsFormOpen(false);
    setEditingAPIKey(undefined);
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

  const { updateAPIKeyLoading, handleUpdateAPIKey } = useUpdateAPIKey(afterUpdatingSucceeded);
  const { handleDeleteAPIKey, deleteAPIKeyLoading } = useDeleteAPIKey(afterDeleteSuccess);

  const [editingAPIKey, setEditingAPIKey] = useState<APIKey | undefined>(undefined);
  const { t } = useTranslation(LOCALE_WORKSPACE.API_KEY);
  const { t: tLayout } = useTranslation(LOCALE_WORKSPACE.LAYOUT);

  const columns: ColumnsType<APIKey> = [
    {
      title: t('name'),
      key: 'name',
      dataIndex: 'name',
      render: (name) => <span style={{ fontWeight: 500, opacity: 0.7 }}>{name}</span>,
      width: 400,
    },

    {
      title: t('key'),
      key: 'id',
      dataIndex: 'id',
      render: (id: string) => <CopyableField text={id} style={{ minWidth: 250 }} displayingText={formatAPIKey(id)} />,
      width: 270,
    },
    {
      title: t('created'),
      key: 'created',
      dataIndex: 'created',
      render: (created: string) => formatCreatedDate(created),
      width: 250,
    },

    {
      title: t('updated'),
      key: 'updated',
      dataIndex: 'updated',
      render: (updated: string) => formatCreatedDate(updated),
      width: 250,
    },

    {
      title: '',
      width: 50,
      render: (apiKey: APIKey) => {
        const items: MenuProps['items'] = [
          {
            label: (
              <p
                className="styled-table__action-item"
                onClick={() => {
                  setIsFormOpen(true);
                  setEditingAPIKey(apiKey);
                }}
              >
                {tLayout('edit')}
              </p>
            ),
            key: 'Edit',
          },

          { type: 'divider' },
          {
            label: (
              <p className="styled-table__action-item color-error" onClick={() => setOpenedPopconfirmDelete(apiKey.id)}>
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
            <Popconfirm
              title={t('deleteAPIKeyWarning')}
              onConfirm={() => handleDeleteAPIKey(apiKey.id)}
              okText={tLayout('delete')}
              cancelText={tLayout('cancel')}
              okButtonProps={{ loading: deleteAPIKeyLoading }}
              cancelButtonProps={{ disabled: deleteAPIKeyLoading }}
              open={openedPopconfirmDelete === apiKey.id}
              onCancel={() => setOpenedPopconfirmDelete('')}
              destroyTooltipOnHide={true}
            >
              <Button size="small" type="text" icon={<EllipsisOutlined />}></Button>
            </Popconfirm>
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
          <CardHeader title={tLayout('apiKeys')}>
            {' '}
            <Button onClick={() => setIsFormOpen(true)} icon={<PlusOutlined />} type="primary">
              {tLayout('create')}
            </Button>
          </CardHeader>
          <SubTableCard style={{ padding: 0 }} bordered={false}>
            <Table
              pagination={false}
              dataSource={apiKeys}
              columns={columns}
              rowKey="id"
              {...getTableLoaderProps(getAPIKeysLoading)}
            />

            <Row justify="end" style={{ marginTop: 20, paddingRight: 20 }}>
              {apiKeysPaging.hasPrevPage && (
                <Button size="small" onClick={onGoBack} disabled={getAPIKeysLoading} style={{ marginRight: 10 }}>
                  {tLayout('previous')}
                </Button>
              )}

              {apiKeysPaging.hasNextPage && (
                <Button size="small" onClick={onGoNext} disabled={getAPIKeysLoading}>
                  {tLayout('next')}
                </Button>
              )}
            </Row>
          </SubTableCard>
        </div>
      </StyledContainer>

      <APIKeyForm
        updateAPIKeyLoading={updateAPIKeyLoading}
        handleUpdateAPIKey={handleUpdateAPIKey}
        initialValues={editingAPIKey}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingAPIKey(undefined);
        }}
        afterCreatingSucceeded={afterCreatingSucceeded}
      />
    </div>
  );
};

export default APIKeys;
