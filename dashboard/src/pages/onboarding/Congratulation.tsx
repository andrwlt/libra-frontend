import SharableURL from 'components/SharableURL';
import { Typography } from 'antd';

const { Title } = Typography;

interface Props {
  checkoutURL: string;
}

export default function Congratulation({ checkoutURL }: Props) {
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
