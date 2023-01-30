import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import type { MenuProps } from 'antd';
import { SyncOutlined, ShopOutlined } from '@ant-design/icons';
import { Routes, Route } from 'react-router-dom';

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
  createMenuItem(<Link to="/payments">Payments</Link>, 'payments', <SyncOutlined />),
  createMenuItem(<Link to="/checkout">Checkout</Link>, 'checkout', <ShopOutlined />),
];

export default function Navbar() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Wrapper style={{ background: colorBgContainer }}>
      <Routes>
        <Route key="home" path="/" />
        {items.map((item: any) => (
          <Route
            key={item.key}
            path={`/${item.key}/*`}
            element={
              <Menu
                mode="inline"
                style={{ height: '100%' }}
                items={items}
                selectedKeys={[item.key]}
              />
            }
          />
        ))}
      </Routes>
    </Wrapper>
  );
}
