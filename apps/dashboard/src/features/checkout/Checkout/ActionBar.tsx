import { Button, Space, Typography, Modal, theme, FormInstance } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useCheckout } from '../checkoutHooks';
import { useTranslation } from 'react-i18next';
import { FixedHeader } from 'components/Common/Styled';
import { LOCALE_WORKSPACE } from 'app/i18n';

const { confirm } = Modal;

interface ActionBarProps {
  onSubmitCheckout: () => void;
  loading?: boolean;
  form: FormInstance;
}

export function ActionBar({ onSubmitCheckout, loading, form }: ActionBarProps) {
  const { id } = useParams();
  const { t: tLayout } = useTranslation(LOCALE_WORKSPACE.LAYOUT);
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);
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
      checkout.afterPayment?.type !== formValues.afterPayment?.type;

    if (isFormChanged) {
      confirm({
        title: tLayout('leavingPageWarningTitle'),
        content: tLayout('leavingPageWarningContent'),
        okText: tLayout('confirmLeavingPage'),
        cancelText: tLayout('stay'),
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
          {id ? t('updateCheckout') : t('createCheckout')}
        </Typography.Title>
      </Space>

      <Button loading={loading} type="primary" onClick={onSubmitCheckout}>
        {tLayout('save')}
      </Button>
    </FixedHeader>
  );
}
