import { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useCreateAPIKey } from './apiKeyHooks';
import { APIKey } from './types';
import { LOCALE_WORKSPACE } from 'app/i18n';

const FormItem = Form.Item;

const defaultInitValues = {
  id: '',
  name: '',
};

const APIKeyForm = (props: {
  isOpen: boolean;
  onClose: () => void;
  initialValues: APIKey | undefined;
  updateAPIKeyLoading: boolean;
  handleUpdateAPIKey: Function;
  afterCreatingSucceeded: () => void;
}) => {
  const [form] = Form.useForm();
  const {
    isOpen,
    onClose,
    initialValues = defaultInitValues,
    updateAPIKeyLoading,
    handleUpdateAPIKey,
    afterCreatingSucceeded,
  } = props;
  const { createAPIKeyLoading, handleCreateAPIKey } = useCreateAPIKey(afterCreatingSucceeded);

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(initialValues);
  }, [form, initialValues, isOpen]);

  const handleSubmit = () => {
    form.validateFields().then((webhook) => {
      if (initialValues.id) {
        handleUpdateAPIKey({ ...initialValues, ...webhook });
      } else {
        handleCreateAPIKey(webhook);
      }
    });
  };
  const { t } = useTranslation(LOCALE_WORKSPACE.API_KEY);
  const isLoading = createAPIKeyLoading || updateAPIKeyLoading;
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
        requiredMark={false}
      >
        <FormItem label={t('name')} name="name" rules={[{ required: true }]}>
          <Input autoComplete="off" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default APIKeyForm;
