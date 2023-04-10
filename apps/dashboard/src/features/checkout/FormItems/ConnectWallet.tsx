import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';

export default function ConnectWallet({ isShow }: { isShow: boolean }) {
  const { t } = useTranslation();
  return (
    <div style={{ maxWidth: '400px', display: isShow ? '' : 'none' }}>
      <Typography.Title level={4}>{t('checkout.greatJob')}</Typography.Title>
      <Typography.Paragraph>{t('checkout.toCreateCheckoutLink')}</Typography.Paragraph>
    </div>
  );
}
