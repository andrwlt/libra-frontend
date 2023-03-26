import { useState } from 'react';
import { Button, Col, Form } from 'antd';
import EventList from './EventList';
import Header from './Header';
import CreateWebhookForm from './Form';
import { t } from 'i18next';
import { ArrowLeftOutlined } from '@ant-design/icons';

export const TABS = {
  FORM: 'FORM',
  SELECT_EVENT: 'SELECT_EVENT',
};

const Index = () => {
  const [activeTab, setActiveTab] = useState(TABS.FORM);
  const [form] = Form.useForm();

  const onSubmit = () => {};
  return (
    <Col span={12} style={{ maxHeight: '100%', overflow: 'auto' }}>
      <Header form={form} onSubmit={onSubmit} />
      <div>
        <div
          style={{
            display: activeTab === TABS.SELECT_EVENT ? 'none' : 'block',
            maxWidth: 700,
            padding: '40px 73px 27px',
          }}
        >
          <CreateWebhookForm form={form} setActiveTab={setActiveTab} />
        </div>

        <div style={{ display: activeTab === TABS.FORM ? 'none' : 'block', padding: '12px 73px 27px' }}>
          <Button
            style={{ padding: 0, marginBottom:5 }}
            size="small"
            type="link"
            onClick={() => setActiveTab(TABS.FORM)}
            icon={<ArrowLeftOutlined />}
          >
            {t('back')}
          </Button>
          <EventList />
        </div>
      </div>
    </Col>
  );
};

export default Index;
