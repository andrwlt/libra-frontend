import { Button, Space, Typography, Modal, theme, FormInstance } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCheckout } from '../checkoutHooks';
import { useTranslation } from 'react-i18next';

const { confirm } = Modal;

interface ActionBarProps {
  onSubmitCheckout: () => void;
  loading?: boolean;
  form: FormInstance;
}

interface WraperProps {
  token: any;
}

const ActionBarWraper = styled.div<WraperProps>`
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 64px;
  background: ${(props) => props.token.colorBgBase};
  justify-content: space-between;
  border-bottom: solid 1px ${(props) => props.token.colorBorder};
`;

export function ActionBar({ onSubmitCheckout, loading, form }: ActionBarProps) {
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
        title: t('checkout.leavingPageWarningTitle'),
        content: t('checkout.leavingPageWarningContent'),
        okText: t('checkout.confirmLeavingPage'),
        cancelText: t('checkout.stay'),
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
    <ActionBarWraper token={token}>
      <Space align="center">
        <Button onClick={handleBack} icon={<ArrowLeftOutlined />} />
        <Typography.Title style={{ margin: 0 }} level={5}>
          {t('checkout.createCheckout')}
        </Typography.Title>
      </Space>

      <Button loading={loading} type="primary" onClick={onSubmitCheckout}>
        {t('save')}
      </Button>
    </ActionBarWraper>
  );
}
