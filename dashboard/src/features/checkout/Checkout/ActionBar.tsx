import { Button, Space, Typography, Modal, theme, FormInstance } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useCheckout } from '../checkoutHooks';
import { useTranslation } from 'react-i18next';
import { FixedHeader } from 'components/Common/Styled';

const { confirm } = Modal;

interface ActionBarProps {
  onSubmitCheckout: () => void;
  loading?: boolean;
  form: FormInstance;
}

export function ActionBar({ onSubmitCheckout, loading, form }: ActionBarProps) {
  const { id } = useParams();
  const { t } = useTranslation();
  const { token } = theme.useToken();
  const { checkout } = useCheckout();

  const navigate = useNavigate();

  const handleBack = () => {
    const formValues = form.getFieldsValue();

    const isFormChanged =
      checkout.item.name !== formValues.item.name ||
      checkout.item.description !== formValues.item.description ||
      checkout.item.price !== formValues.item.price ||
      checkout.item.image !== formValues.item.image ||
      checkout.branding.name !== formValues.branding.name ||
      checkout.branding.logo !== formValues.branding.logo ||
      checkout.afterPayment?.redirectUrl !== formValues.afterPayment?.redirectUrl;

    if (isFormChanged) {
      confirm({
        title: t('message.leavingPageWarningTitle'),
        content: t('message.leavingPageWarningContent'),
        okText: t('message.confirmLeavingPage'),
        cancelText: t('message.stay'),
        onOk() {
          navigate(-1);
        },
        onCancel() {},
      });
    } else {
      navigate(-1);
    }
  };

  return (
    <FixedHeader token={token}>
      <Space align="center">
        <Button onClick={handleBack} icon={<ArrowLeftOutlined />} />
        <Typography.Title style={{ margin: 0 }} level={5}>
          {id ? t('checkout.updateCheckout') : t('checkout.createCheckout')}
        </Typography.Title>
      </Space>

      <Button loading={loading} type="primary" onClick={onSubmitCheckout}>
        {t('save')}
      </Button>
    </FixedHeader>
  );
}
