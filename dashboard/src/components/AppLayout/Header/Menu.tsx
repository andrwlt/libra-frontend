import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Menu } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import PATHS from 'router/paths';
import { useTranslation } from 'react-i18next';
import { ShopOutlined, WalletOutlined, CodeOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

export const MenuWrapper = styled.div`
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

  .ant-menu-item:has(.not-active-link) {
    color: rgba(0, 0, 0, 0.88);

    &::after {
      border-width: 2px;
      border-bottom-color: transparent;
    }
  }

  margin-right: auto;
`;

const HeaderMenu = () => {
  const { t } = useTranslation();

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
          {t('checkoutLabel')}
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
