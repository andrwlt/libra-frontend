import { Typography, Input, Checkbox, Row, Button, Collapse } from 'antd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const { Panel } = Collapse;

const ListEventWrapper = styled.div`
  height: calc(100vh - 370px);
  overflow: auto;
  margin-top: 20px;
  margin-bottom: 50px;
`;

const totalEvents = [
  {
    name: 'Charge',
    events: ['Charge.created', 'Charge.succeeded', 'Charge.failed'],
  },
  {
    name: 'Checkout - Demo only',
    events: ['Checkout.created', 'Checkout.deleted', 'Checkout.updated'],
  },
  {
    name: 'Account - Demo only',
    events: ['account.created', 'account.deleted', 'account.updated'],
  },
];

const EventList = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Typography.Title style={{ margin: 0 }} level={3}>
        {t('webhook.selectEventToSend')}
      </Typography.Title>

      <Input.Search style={{ marginTop: 20 }} />

      <Checkbox style={{ marginTop: 20 }}> {t('webhook.selectAllEvents')}</Checkbox>

      <ListEventWrapper>
        {' '}
        <Collapse expandIconPosition="end">
          {totalEvents.map((group) => {
            return (
              <Panel header={group.name} key={group.name}>
                <div>
                  <Checkbox key="all">Select all {group.name} events</Checkbox>
                </div>

                {group.events.map((event, index) => (
                  <div>
                    <Checkbox style={{ marginTop: 10 }} key={event}>
                      {event}
                    </Checkbox>
                  </div>
                ))}
              </Panel>
            );
          })}
        </Collapse>
      </ListEventWrapper>

      <Row>
        <Button type="primary">{t('webhook.create')}</Button>
        <Button style={{ marginLeft: 15 }}>{t('cancel')}</Button>
      </Row>
    </div>
  );
};

export default EventList;
