import { useState } from 'react';
import { theme, Space, Typography } from 'antd';
import Identicon from '@polkadot/react-identicon';

export default function AccountOption({ account, onClick }: any) {
  const [hovered, setHovered] = useState(false);

  const {
    token: { colorPrimary, colorBorder, colorPrimaryBgHover, borderRadius },
  } = theme.useToken();

  return (
    <div
      style={{
        borderRadius,
        border: `solid 1px ${hovered ? colorPrimary : colorBorder}`,
        background: `${hovered ? colorPrimaryBgHover : ''}`,
        cursor: 'pointer',
        padding: '16px',
        margin: '8px 0',
      }}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      onClick={() => {
        onClick && onClick(account);
      }}
    >
      <Space align="center">
        <Identicon value={account.address} size={24} theme="polkadot"></Identicon>
        <Typography.Paragraph style={{ marginBottom: '4px' }} strong>
          {account.name}
        </Typography.Paragraph>
      </Space>
    </div>
  );
}
