import styled from 'styled-components';
import { Layout, Menu, theme } from 'antd';
import type { MenuProps } from 'antd';
import {
  SettingOutlined,
  SyncOutlined,
  ShopOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const Wrapper = styled(Sider)`
  height: calc(100vh - 64px);
  padding-top: 48px;
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
  createMenuItem('Payments', 'payments', <SyncOutlined />),
  createMenuItem('Checkout', 'checkout', <ShopOutlined />, [
    createMenuItem('Pages', 'checkout-pages'),
    createMenuItem('Orders', 'orders'),
  ]),
  createMenuItem('Settings', 'settings', <SettingOutlined/>),
];

export default function Navbar() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Wrapper style={ {background: colorBgContainer }}>
      <Menu mode="inline" style={{ height: '100%' }} items={items}/>
    </Wrapper>
  );
};
