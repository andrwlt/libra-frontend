import logo from 'assets/logo.svg';
import styled from 'styled-components';
import { Button, Divider, Layout, theme } from 'antd';
import { MenuProps, Menu, Popover, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useAccount } from 'contexts/account';
import Identicon from '@polkadot/react-identicon';
import { truncate } from 'utils/format/address';
import { useAuth } from 'contexts/auth';

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
`;

const Logo = styled.img`
  height: 24px;
`;

type MenuItem = Required<MenuProps>['items'][number];

function createMenuItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  createMenuItem(<Link to="/payments">Payments</Link>, 'payments'),
  createMenuItem(<Link to="/checkout">Checkout</Link>, 'checkout'),
];

function AccountInfo() {
  const { account } = useAccount();

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

export function Account() {
  const { account } = useAccount();
  const { logout } = useAuth();

  const handleLogOut = async () => {
    logout();
  };

  return (
    <div>
      <Popover
        trigger="click"
        placement="bottomRight"
        content={
          <Button type="link" block onClick={handleLogOut}>
            Log Out
          </Button>
        }
        title={<AccountInfo />}
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
  const {
    token: { colorBgContainer, boxShadow, colorBorder },
  } = theme.useToken();

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
          <Account />
        </Space>
      </NavbarMenu>
    </Wrapper>
  );
}
