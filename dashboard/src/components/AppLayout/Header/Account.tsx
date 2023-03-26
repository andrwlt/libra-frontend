import { Dropdown, Space } from 'antd';
import { useAuth, useLogout } from 'features/auth/authHooks';
import Identicon from '@polkadot/react-identicon';
import { truncate } from 'utils/format/formatText';
import { useTranslation } from 'react-i18next';
import type { MenuProps } from 'antd';
import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const StyledMenuItem = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
`;

const Account = () => {
  const { t } = useTranslation();
  const { account } = useAuth();
  const logout = useLogout();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <StyledMenuItem>
          <UserOutlined />
          <span style={{ marginLeft: 8 }}> {account?.name}</span>
        </StyledMenuItem>
      ),
    },
    {
      key: '2',
      label: (
        <StyledMenuItem>
          <Identicon value={account?.address} size={14} theme="polkadot" style={{ display: 'block' }} />
          <span style={{ marginLeft: 8 }}> {truncate(account.address, { start: 4, end: 4 })}</span>
        </StyledMenuItem>
      ),
    },
    {
      type: 'divider',
    },

    {
      key: '4',
      label: (
        <StyledMenuItem onClick={() => logout()}>
          <LoginOutlined />
          <span style={{ marginLeft: 8 }}> {t('signIn.logout')}</span>
        </StyledMenuItem>
      ),
    },
  ];

  return (
    <Dropdown overlayStyle={{ minWidth: 200 }} menu={{ items }} placement="bottomLeft">
      <Space align="center" size={8} style={{ cursor: 'pointer', paddingRight: 16 }}>
        <Identicon
          value={account?.address}
          size={24}
          theme="polkadot"
          style={{ display: 'block', cursor: 'pointer' }}
        />
        <span> {account?.name}</span>
      </Space>
    </Dropdown>
  );
};

export default Account;
