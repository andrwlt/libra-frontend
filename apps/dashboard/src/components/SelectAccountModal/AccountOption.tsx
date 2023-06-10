import { useState } from 'react';
import { Space, Typography, theme } from 'antd';
import styled from 'styled-components';
import Identicon from '@polkadot/react-identicon';
import { Account } from '@atscale/libra-ui';

type AccountOptionWraperProps = {
  hovered: boolean;
  themeToken: any;
};

const AccountOptionWraper = styled.div<AccountOptionWraperProps>`
  border-radius: ${(props) => props.themeToken.borderRadius}px;
  border: solid 1px ${(props) => (props.hovered ? props.themeToken.colorPrimary : props.themeToken.colorBorder)};
  background: ${(props) => (props.hovered ? props.themeToken.colorPrimaryBgHover : '')};
  cursor: pointer;
  padding: 16px;
  margin: 8px 0;
`;

const AccountOption = ({ account, onClick }: { account: Account; onClick: Function }) => {
  const [hovered, setHovered] = useState(false);
  const { token } = theme.useToken();
  return (
    <AccountOptionWraper
      themeToken={token}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      hovered={hovered}
      onClick={() => onClick(account)}
    >
      <Space align="center">
        <Identicon value={account.address} size={24} theme="polkadot"></Identicon>
        <Typography.Paragraph style={{ marginBottom: '4px' }} strong>
          {account.name}
        </Typography.Paragraph>
      </Space>
    </AccountOptionWraper>
  );
};

export default AccountOption;
