import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import PATHS from 'router/paths';
import { useTranslation } from 'react-i18next';
import { ShopOutlined, WalletOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { MenuWrapper } from 'components/AppLayout/Styled';
import { LOCALE_WORKSPACE } from 'app/i18n';

const HeaderMenu = () => {
  const { t } = useTranslation(LOCALE_WORKSPACE.LAYOUT);

  const getClassName = ({ isActive, isPending }: { isActive: boolean; isPending: boolean }) =>
    isPending ? 'pending-link' : isActive ? 'active-link' : 'not-active-link';

  const menuItems: MenuProps['items'] = [
    {
      label: (
        <NavLink to={PATHS.payment.root} className={getClassName}>
          {t('payments')}
        </NavLink>
      ),
      icon: <WalletOutlined />,
      key: PATHS.payment.root,
    },
    {
      label: (
        <NavLink to={PATHS.checkout.root} className={getClassName}>
          {t('checkout')}
        </NavLink>
      ),
      icon: <ShopOutlined />,
      key: PATHS.checkout.root,
    },
  ];

  return (
    <MenuWrapper>
      <Menu style={{ borderBottom: 'none' }} mode="horizontal" items={menuItems}></Menu>
    </MenuWrapper>
  );
};

export default HeaderMenu;
