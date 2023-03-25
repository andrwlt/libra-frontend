import { Form, Typography, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import { TABS } from './index';

const { Title } = Typography;

const CreateWebhookForm = ({ form, setActiveTab }: any) => {
  const { t } = useTranslation();

  return (
    <Form form={form} layout="vertical">
      <Title level={3} style={{ marginTop: 0, marginBottom: 20 }}>
        {t('webhook.listen')}
      </Title>
      <Form.Item label={t('webhook.endpointUrl')}>
        <Input placeholder="https://" style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item label={t('webhook.selectEventsTitle')}>
        <Button icon={<PlusOutlined />} shape="round" type="primary" ghost onClick={() => setActiveTab(TABS.SELECT_EVENT)}>
          {t('webhook.selectEvents')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateWebhookForm;
