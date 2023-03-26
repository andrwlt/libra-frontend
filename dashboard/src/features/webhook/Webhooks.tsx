import { StyledContainer } from 'components/Common/Styled';
import PageHeader from 'components/Common/PageHeader';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Table, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import PATHS from 'router/paths';
import type { ColumnsType } from 'antd/es/table';
import { useWebhooks } from './webhookHooks';

const Webhooks = () => {
  const { webhooks, getWebhooksLoading, fetchWebhooks, webhooksPaging } = useWebhooks();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goToCreateWebhook = () => {
    navigate(PATHS.developer.webhook.create);
  };

  const columns: ColumnsType<any> = [
    {
      title: 'URL',
      key: 'URL',
    },
    {
      title: 'Status',
      key: 'Status',
    },
    {
      title: 'Events',
      key: 'events',
    },
  ];

  return (
    <div>
      <PageHeader title={t('webhooks')}>
        {' '}
        <Button icon={<PlusOutlined />} type="primary" onClick={goToCreateWebhook}>
          {t('create')}
        </Button>
      </PageHeader>

      <StyledContainer>
        <Card>
          <Table loading={getWebhooksLoading} dataSource={webhooks} columns={columns} rowKey="id" />
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
      </StyledContainer>
    </div>
  );
};

export default Webhooks;
