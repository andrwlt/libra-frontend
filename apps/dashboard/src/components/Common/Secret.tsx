import { Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { LOCALE_WORKSPACE } from 'app/i18n';

const Secret = ({ value }: any) => {
  const { t } = useTranslation(LOCALE_WORKSPACE.LAYOUT);
  const toggleShow = () => {
    Modal.info({
      title: t('secret'),
      content: <span style={{ wordBreak: 'break-word' }}>{value}</span>,
      maskClosable: true,
    });
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', lineHeight: '24px' }}>
      <Button size="small" onClick={toggleShow}>
        {t('reveal')}
      </Button>
    </div>
  );
};

export default Secret;
