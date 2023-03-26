import { useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useCreateWebhook } from './webhookHooks';
import { WebhookResponse } from './types';

const FormItem = Form.Item;

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
}) => {
  const [form] = Form.useForm();
  const { isOpen, onClose, initialValues = defaultInitValues, updateWebhookLoading, handleUpdateWebhook } = props;
  const { createWebhookLoading, handleCreateWebhook } = useCreateWebhook(onClose);

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
  const { t } = useTranslation();

  const isLoading = createWebhookLoading || updateWebhookLoading;
  return (
    <Modal
      width="550px"
      okText={t('create')}
      open={isOpen}
      title={t('webhook.create')}
      onCancel={() => onClose()}
      okButtonProps={{
        loading: isLoading,
        onClick: handleSubmit,
      }}
      cancelButtonProps={{
        disabled: isLoading,
      }}
    >
      <Form initialValues={initialValues} form={form} layout="vertical" style={{ marginTop: 20 }}>
        <FormItem
          label={t('webhook.endpointUrl')}
          name="url"
          validateTrigger={['onChange', 'onBlur']}
          rules={[
            { required: true },
            {
              pattern: new RegExp(
                // eslint-disable-next-line
                /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
              ),
              message: t<string>('webhook.form.invalidUrl'),
              validateTrigger: ['onBlur'],
            },
          ]}
        >
          <Input placeholder="https://" />
        </FormItem>

        <FormItem label={t('description')} name="description">
          <Input.TextArea placeholder={t<string>('webhook.form.descriptionPlaceholder')} rows={2} />
        </FormItem>

        <FormItem
          label={t('webhook.selectEvents')}
          rules={[{ required: true, type: 'array', message: t<string>('webhook.form.eventsAreRequired') }]}
          name="events"
        >
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder={t('webhook.selectEventsTitle')}
            options={[
              { value: 'charge.created', label: t('webhook.chargeCreated') },
              { value: 'charge.succeeded', label: t('webhook.chargeSucceeded') },
              { value: 'charge.failed', label: t('webhook.chargeFailed') },
            ]}
          ></Select>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default WebhookForm;
