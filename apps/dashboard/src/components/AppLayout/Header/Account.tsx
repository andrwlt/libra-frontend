import { Dropdown, Space, Typography } from 'antd';
import { useAuth, useLogout } from 'features/auth/authHooks';
import Identicon from '@polkadot/react-identicon';
import { truncate } from 'utils/format/formatText';
import { useTranslation } from 'react-i18next';
import type { MenuProps } from 'antd';
import styled from 'styled-components';
import { useBreakpoint } from 'app/hooks';
import { breakpoints } from 'config';
import { useNavigate, useLocation } from 'react-router-dom';
import PATHS from 'router/paths';

const StyledMenuItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  .ant-dropdown-menu-title-content {
    display: block;
  }
`;

const developerRoutes = ['webhooks', 'apiKeys', 'developers'];

const Account = () => {
  const { t } = useTranslation();
  const { account } = useAuth();
  const logout = useLogout();
  const screen = useBreakpoint();
  const navigate = useNavigate();
  const location = useLocation();

  const [, rootPath] = location.pathname.split('/');
  const isDeveloperActive = developerRoutes.includes(rootPath);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <StyledMenuItem style={{ cursor: 'auto' }}>
          <Identicon
            value={account?.address}
            size={35}
            theme="polkadot"
            style={{ display: 'block', cursor: 'pointer' }}
          />
          <div style={{ marginLeft: 10, display: 'flex', flexDirection: 'column' }}>
            <Typography.Text style={{ margin: 0 }}> {account?.name}</Typography.Text>
            <Typography.Text type="secondary" style={{ margin: 0 }}>
              {' '}
              {truncate(account?.address, { start: 6, end: 6 })}
            </Typography.Text>
          </div>
        </StyledMenuItem>
      ),
    },

    {
      type: 'divider',
    },

    {
      key: '2',
      label: (
        <StyledMenuItem style={{ width: 170 }} onClick={() => navigate(PATHS.developers.webhook.root)}>
          <Typography.Text style={{ margin: 0 }}>{t('developers')}</Typography.Text>
        </StyledMenuItem>
      ),
    },
    {
      key: '3',
      label: (
        <StyledMenuItem>
          <Typography.Text style={{ margin: 0 }}> {t('helpCenter')}</Typography.Text>
        </StyledMenuItem>
      ),
      disabled: true,
    },
    {
      key: '4',
      label: (
        <StyledMenuItem>
          <Typography.Text style={{ margin: 0 }}> {t('whatNew')}</Typography.Text>
        </StyledMenuItem>
      ),
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: '5',
      label: (
        <StyledMenuItem onClick={() => logout()}>
          <Typography.Text style={{ margin: 0 }} type="danger">
            {' '}
            {t('signIn.logout')}
          </Typography.Text>
        </StyledMenuItem>
      ),
    },
  ];

  return (
    <Dropdown
      overlayStyle={{ minWidth: 150 }}
      menu={{ items, selectedKeys: isDeveloperActive ? ['2'] : [] }}
      placement={screen === breakpoints.screen.xl ? 'bottom' : 'bottomRight'}
    >
      <Space align="center" size={8} style={{ cursor: 'pointer' }}>
        <Identicon
          value={account?.address}
          size={35}
          theme="polkadot"
          style={{ display: 'block', cursor: 'pointer' }}
        />
      </Space>
    </Dropdown>
  );
};

export default Account;
