import { useEffect } from 'react';
import SharableURL from 'components/ShareURL/SharableURL';
import { Button, Typography } from 'antd';
import { Confetti } from 'components/confetti';
import Logo from 'components/Common/Logo';
import PATHS from 'router/paths';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

interface Props {
  checkoutURL: string;
}

export default function Congratulation({ checkoutURL }: Props) {
  const { t } = useTranslation();

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
      <div style={{ maxWidth: '540px', height: 'auto' }}>
        <Title level={2} style={{ marginTop: 0 }}>
          {t('onboarding.congratulation')}
        </Title>
        <Title level={5}>{t('onboarding.useUrl')}</Title>
        <SharableURL url={checkoutURL} />
      </div>
    </div>
  );
}
