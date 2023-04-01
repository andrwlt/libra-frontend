import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import PATHS from 'router/paths';
import { useTranslation } from 'react-i18next';
import { ShopOutlined, WalletOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { MenuWrapper } from 'components/AppLayout/Header/Menu';

const DeveloperMenu = () => {
  const { t } = useTranslation();

  const getClassName = ({ isActive, isPending }: { isActive: boolean; isPending: boolean }) =>
    isPending ? 'pending-link' : isActive ? 'active-link' : 'not-active-link';

  const menuItems: MenuProps['items'] = [
    {
      label: (
        <NavLink to={PATHS.developers.webhook.root} className={getClassName}>
          {t('webhooks')}
        </NavLink>
      ),
      icon: <WalletOutlined />,
      key: PATHS.payment.root,
    },
    {
      label: (
        <NavLink to={PATHS.developers.apiKey.root} className={getClassName}>
          {t('apiKeys')}
        </NavLink>
      ),
      icon: <ShopOutlined />,
      key: PATHS.checkout.root,
    },
  ];

  return (
    <MenuWrapper style={{ marginRight: 0 }}>
      <Menu style={{ borderBottom: 'none' }} mode="horizontal" items={menuItems}></Menu>
    </MenuWrapper>
  );
};

const Wrapper = styled.div`
  height: 46px !important;
  line-height: 46px !important;
  padding-inline: 0px !important;
  display: flex;
  justify-content: center;
  width: 100%;

  .ant-menu {
    background: rgb(250, 250, 250);
    box-shadow: rgb(231, 231, 231) 0px -1px 0px inset;
  }
`;

const Developers = () => {
  return (
    <div>
      <Wrapper>
        <DeveloperMenu />
      </Wrapper>
      <Outlet />
    </div>
  );
};

export default Developers;
