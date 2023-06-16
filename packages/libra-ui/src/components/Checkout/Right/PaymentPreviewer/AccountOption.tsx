import { useState } from 'react';
import { Typography, Space, theme } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Identicon from '@polkadot/react-identicon';
import { getSs58AddressByAsset } from 'utils';
import { Asset } from 'app/types';

const { Paragraph } = Typography;

interface AccountProps {
  account: {
    name: string;
    address: string;
  };
  variant?: 'default' | 'select';
  noPadding?: boolean;
  asset: Asset;
}

export default function AccountInfo({ account, variant = 'default', noPadding = false, asset }: AccountProps) {
  const { name, address } = account;
  const {
    token: { colorPrimary, colorBorder },
  } = theme.useToken();

  const [hovered, setHovered] = useState(false);
  const ss58Address = getSs58AddressByAsset(address, asset);

  const shortedAddress = `${ss58Address.slice(0, 16)}...${ss58Address.slice(-12)}`;

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
