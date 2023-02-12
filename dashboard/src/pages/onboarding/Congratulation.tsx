import { useEffect, useRef } from "react";
import SharableURL from 'components/SharableURL';
import { Typography } from 'antd';
import { Confetti } from "components/confetti";

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
