import { Typography } from 'antd';
import { LOCALE_WORKSPACE } from 'app/i18n';
import { useTranslation } from 'react-i18next';

export default function ConnectWallet({ isShow }: { isShow: boolean }) {
  const { t } = useTranslation(LOCALE_WORKSPACE.WORDING);
  return (
    <div style={{ maxWidth: '400px', display: isShow ? '' : 'none' }}>
      <Typography.Title level={4}>{t('greatJob')}</Typography.Title>
      <Typography.Paragraph>{t('toCreateCheckoutLink')}</Typography.Paragraph>
    </div>
  );
}
