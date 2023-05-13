import { useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useCreateWebhook } from './webhookHooks';
import { WebhookResponse } from './types';
import { LOCALE_WORKSPACE } from 'app/i18n';

const FormItem = Form.Item;

const allEvents = [
  {
    label: 'Charge',
    events: ['charge.created', 'charge.succeeded', 'charge.failed'],
  },
];

const defaultInitValues = {
  id: '',
  url: '',
  events: [],
  active: false,
  secret: '',
};

const WebhookForm = (props: {
  isOpen: boolean;
  onClose: () => void;
  initialValues: WebhookResponse | undefined;
  updateWebhookLoading: boolean;
  handleUpdateWebhook: Function;
  afterCreatingSucceeded: () => void;
}) => {
  const [form] = Form.useForm();
  const {
    isOpen,
    onClose,
    initialValues = defaultInitValues,
    updateWebhookLoading,
    handleUpdateWebhook,
    afterCreatingSucceeded,
  } = props;
  const { createWebhookLoading, handleCreateWebhook } = useCreateWebhook(afterCreatingSucceeded);

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(initialValues);
  }, [form, initialValues, isOpen]);

  const handleSubmit = () => {
    form.validateFields().then((webhook) => {
      if (initialValues.id) {
        handleUpdateWebhook({ ...initialValues, ...webhook });
      } else {
        handleCreateWebhook(webhook);
      }
    });
  };
  const { t } = useTranslation(LOCALE_WORKSPACE.WEBHOOK);
  const isLoading = createWebhookLoading || updateWebhookLoading;
  return (
    <Modal
      width="550px"
      okText={initialValues.id ? t('update') : t('create')}
      open={isOpen}
      title={initialValues.id ? t('update') : t('create')}
      onCancel={() => onClose()}
      okButtonProps={{
        loading: isLoading,
        onClick: handleSubmit,
      }}
      cancelButtonProps={{
        disabled: isLoading,
      }}
    >
      <Form
        initialValues={initialValues}
        form={form}
        layout="vertical"
        style={{ marginTop: 20 }}
        disabled={isLoading}
        autoComplete="off"
      >
        <FormItem
          label={t('endpointUrl')}
          name="url"
          validateTrigger={['onChange', 'onBlur']}
          rules={[
            { required: true },
            {
              pattern: new RegExp(
                // eslint-disable-next-line
                /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
              ),
              message: t<string>('invalidUrl'),
              validateTrigger: ['onBlur'],
            },
          ]}
        >
          <Input autoComplete="off" placeholder="https://" />
        </FormItem>

        <FormItem label={t('description')} name="description">
          <Input.TextArea autoComplete="off" placeholder={t<string>('descriptionPlaceholder')} rows={2} />
        </FormItem>

        <FormItem
          label={t('selectEvents')}
          rules={[{ required: true, type: 'array', message: t<string>('eventsAreRequired') }]}
          name="events"
        >
          <Select mode="multiple" style={{ width: '100%' }} placeholder={t('selectEventsTitle')}>
            {allEvents.map((group) => {
              return (
                <Select.OptGroup key={group.label} label={group.label}>
                  {group.events.map((event) => {
                    return (
                      <Select.Option key={event} value={event}>
                        {event}
                      </Select.Option>
                    );
                  })}
                </Select.OptGroup>
              );
            })}
          </Select>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default WebhookForm;
