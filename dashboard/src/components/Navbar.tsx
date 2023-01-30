import logo from 'assets/logo.svg';
import styled from 'styled-components';
import { Button, Layout, theme } from 'antd';
import { MenuProps, Menu, Popover, Space, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { useAccount } from 'contexts/account';
import Identicon from '@polkadot/react-identicon';
import { truncate } from 'utils/format/address';

import { useState } from 'react';

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

const AccountMenuItem = styled.div`
  cursor: pointer;
`;

function AccountMenu() {
  const { account, disconnect } = useAccount();

  const handleLogOut = async () => {
    disconnect();
  };

  return (
    <div>
      <div>{ account ? truncate(account.address) : '' }</div>
      <Divider></Divider>
      <Button style={{ padding: 0 }} type='link' onClick={handleLogOut}>Log Out</Button>
    </div>
  );
}

export function Account() {
  const { account, disconnect } = useAccount();
  const {
    token: { colorBgContainer, boxShadow },
  } = theme.useToken();

  return (
    <div>
      <Popover placement="bottomRight" open content={<AccountMenu />} title="Account">
        <div style={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
          <Identicon
            value={account?.address}
            size={32}
            theme="polkadot"
            style={{ cursor: 'pointer' }}
          ></Identicon>
        </div>
      </Popover>
    </div>
  );
}

export default function Navbar() {
  const {
    token: { colorBgContainer, boxShadow },
  } = theme.useToken();

  return (
    <Wrapper style={{ background: colorBgContainer, boxShadow }}>
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
