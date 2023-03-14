import logo from 'assets/logo.svg';
import styled from 'styled-components';
import { Button, Layout, theme } from 'antd';
import { MenuProps, Menu, Popover, Space, Typography } from 'antd';
import { NavLink, Link } from 'react-router-dom';
import { useAuth, useLogout } from 'features/auth/authHooks';
import Identicon from '@polkadot/react-identicon';
import { truncate } from 'utils/format/formatText';
import PATHS from 'router/paths';
import { useTranslation } from 'react-i18next';

const { Header } = Layout;

const Wrapper = styled(Header)`
  height: 120px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 64px;
`;

const LogoWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const NavbarMenu = styled.div`
  height: 40px;

  .ant-menu-item:has(.active-link) {
    color: #1677ff;
    background-color: transparent;

    &::after {
      border-width: 2px;
      border-bottom-color: #1677ff;
    }

    &:hover {
      color: #1677ff !important;
    }
  }
`;

const Logo = styled.img`
  height: 24px;
`;

type MenuItem = Required<MenuProps>['items'][number];

const createMenuItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
};

function NavbarAccountInfo() {
  const { account } = useAuth();

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
        <Identicon value={account?.address} size={40} theme="polkadot" style={{ cursor: 'pointer' }}></Identicon>
      </div>
      <div>
        <Typography.Paragraph strong style={{ marginBottom: '4px' }}>
          {account?.name}
        </Typography.Paragraph>
        <Typography.Paragraph style={{ fontWeight: 'normal', marginBottom: '4px' }} type="secondary">
          {account ? truncate(account.address) : ''}
        </Typography.Paragraph>
      </div>
    </div>
  );
}

function NavbarAccount() {
  const { t } = useTranslation();
  const { account } = useAuth();
  const logout = useLogout();

  return (
    <div>
      <Popover
        trigger="click"
        placement="bottomRight"
        content={
          <Button type="link" block onClick={logout}>
            {t('signIn.logout')}
          </Button>
        }
        title={<NavbarAccountInfo />}
      >
        <Button size="large" style={{ display: 'flex', alignItems: 'center' }}>
          <Identicon value={account?.address} size={24} theme="polkadot" style={{ cursor: 'pointer' }}></Identicon>
          <Typography.Paragraph style={{ marginBottom: 2, marginLeft: '8px' }} strong>
            {account?.name}
          </Typography.Paragraph>
        </Button>
      </Popover>
    </div>
  );
}

export default function Navbar() {
  const { t } = useTranslation();
  const {
    token: { colorBgContainer, boxShadow, colorBorder },
  } = theme.useToken();

  const getClassName = ({ isActive, isPending }: { isActive: boolean; isPending: boolean }) =>
    isPending ? 'pending-link' : isActive ? 'active-link' : '';

  const items: MenuItem[] = [
    createMenuItem(
      <NavLink to={PATHS.payment.root} className={getClassName}>
        {t('payments')}
      </NavLink>,
      'payments',
    ),
    createMenuItem(
      <NavLink to={PATHS.checkout.root} className={getClassName}>
        {t('checkoutLabel')}
      </NavLink>,
      'checkouts',
    ),
  ];

  return (
    <Wrapper
      style={{ padding: '0 64px', background: colorBgContainer, boxShadow, borderBottom: `solid 1px ${colorBorder}` }}
    >
      <LogoWrapper>
        <Link to="/">
          <Logo src={logo} alt="logo" />
        </Link>
      </LogoWrapper>
      <NavbarMenu>
        <Space>
          <Menu style={{ borderBottom: 'none' }} mode="horizontal" items={items}></Menu>
          <NavbarAccount />
        </Space>
      </NavbarMenu>
    </Wrapper>
  );
}
