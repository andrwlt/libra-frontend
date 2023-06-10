import { useState } from 'react';
import { Typography, Space, theme } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Identicon from '@polkadot/react-identicon';

const { Paragraph } = Typography;

interface AccountProps {
  account: {
    name: string;
    address: string;
  };
  variant?: 'default' | 'select';
  noPadding?: boolean;
}

export default function AccountInfo({ account, variant = 'default', noPadding = false }: AccountProps) {
  const { name, address } = account;
  const {
    token: { colorPrimary, colorBorder },
  } = theme.useToken();

  const [hovered, setHovered] = useState(false);

  const shortedAddress = `${account.address.slice(0, 16)}...${account.address.slice(-12)}`;

  let style: any = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 16px',
    borderRadius: '8px',
  };

  if (variant === 'select') {
    style = {
      ...style,
      cursor: 'pointer',
      border: `solid 1px ${hovered ? colorPrimary : colorBorder}`,
    };
  }

  if (noPadding) {
    delete style.padding;
  }

  return (
    <div style={style} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Space align="center" size="middle">
        <Identicon value={address} size={24} theme="substrate"></Identicon>

        <Space direction="vertical" size={4}>
          <Paragraph strong style={{ marginBottom: 0 }}>
            {name}
          </Paragraph>
          <Paragraph style={{ marginBottom: '0', fontSize: '12px' }}>{shortedAddress}</Paragraph>
        </Space>
      </Space>
      {variant === 'select' && (
        <DownOutlined
          style={{
            color: hovered ? colorPrimary : colorBorder,
          }}
        />
      )}
    </div>
  );
}
