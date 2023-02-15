import { useEffect } from 'react';
import SharableURL from 'components/SharableURL';
import { Button, Typography } from 'antd';
import { Confetti } from 'components/confetti';
import Logo from './Logo';

const { Title } = Typography;

interface Props {
  checkoutURL: string;
}

export default function Congratulation({ checkoutURL }: Props) {
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
        <a href="/checkout">
          <Button>Dashboard</Button>
        </a>
      </div>
      <div style={{ maxWidth: '540px', height: 'auto' }}>
        <Title level={2} style={{ marginTop: 0 }}>
          Congratulation! Your checkout page is ready now!
        </Title>
        <Title level={5}>Please use the url bellow to start selling your product.</Title>
        <SharableURL url={checkoutURL} />
      </div>
    </div>
  );
}
