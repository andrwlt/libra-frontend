import { Typography } from 'antd';

export default function ConnectWallet() {
  return (
    <div style={{ maxWidth: '400px' }}>
      <Typography.Title level={4}>Great job! You're almost done.</Typography.Title>
      <Typography.Paragraph>
        To create your checkout link, please connect your wallet as sign up your Libra account. This will allow you to
        access all the features and benefits of our platform.
      </Typography.Paragraph>
    </div>
  );
}
