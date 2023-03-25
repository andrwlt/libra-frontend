import { Button, Space, Typography, Modal, theme, FormInstance } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FixedHeader } from 'components/Common/Styled';

const { confirm } = Modal;

interface HeaderProps {
  onSubmit: () => void;
  loading?: boolean;
  form: FormInstance;
}

export const Header = ({ onSubmit, loading, form }: HeaderProps) => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const navigate = useNavigate();

  const handleBack = () => {
    const isFormChanged = false;

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
    <FixedHeader token={token} style={{ borderBottom: 'none' }}>
      <Space size={25} align="center">
        <Button type="dashed" onClick={handleBack} icon={<CloseOutlined />} />

        <Typography.Title style={{ margin: 0 }} level={5}>
          {t('webhook.create')}
        </Typography.Title>
      </Space>
    </FixedHeader>
  );
};

export default Header;
