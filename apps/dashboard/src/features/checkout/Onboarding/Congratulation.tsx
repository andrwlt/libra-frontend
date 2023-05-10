import { useEffect } from 'react';
import SharableURL from 'components/ShareURL/SharableURL';
import { Button, Typography } from 'antd';
import { Confetti } from 'components/confetti';
import Logo from 'components/Common/Logo';
import PATHS from 'router/paths';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LOCALE_WORKSPACE } from 'app/i18n';

const { Title, Paragraph } = Typography;

interface Props {
  checkoutURL: string;
}

export default function Congratulation({ checkoutURL }: Props) {
  const { t } = useTranslation(LOCALE_WORKSPACE.LAYOUT);
  const { t: tWording } = useTranslation(LOCALE_WORKSPACE.WORDING);

  useEffect(() => {
    const confetti = new Confetti();
    setTimeout(() => {
      confetti.explode({ x: window.innerWidth, y: window.innerHeight / 2 });
    }, 50);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '64px',
          width: '100%',
          padding: '0px 64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
        }}
      >
        <Logo></Logo>
        <Link to={PATHS.dashboard}>
          <Button>{t('dashboard')}</Button>
        </Link>
      </div>
      <div style={{ maxWidth: '540px', height: 'auto', marginTop: -100 }}>
        <Title level={2} style={{ marginTop: 0, textAlign: 'center' }}>
          {tWording('congratulation')}
        </Title>
        <Paragraph style={{ textAlign: 'center' }}>{tWording('congratulationContent')}</Paragraph>
        <Title level={5} style={{ textAlign: 'center', marginBottom: 16 }}>
          {tWording('useUrl')}
        </Title>

        <SharableURL url={checkoutURL} />

        <Title level={5} style={{ textAlign: 'center' }}>
          {tWording('congratulationFooter')}
        </Title>
      </div>
    </div>
  );
}
