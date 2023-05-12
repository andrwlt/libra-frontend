import { Typography } from 'antd';
import { LOCALE_WORKSPACE } from 'app/i18n';
import { useTranslation } from 'react-i18next';

export default function ConnectWallet({ isShow }: { isShow: boolean }) {
  const { t } = useTranslation(LOCALE_WORKSPACE.WORDING);
  return (
    <div style={{ maxWidth: '600px', display: isShow ? '' : 'none' }}>
      <Typography.Title level={4} style={{ marginTop: 0 }}>
        {t('connectWalletTitle')}
      </Typography.Title>
      <Typography.Paragraph>{t('connectWalletContent')}</Typography.Paragraph>
      <Typography.Text strong>{t('connectWalletHighlight')}</Typography.Text>
    </div>
  );
}
