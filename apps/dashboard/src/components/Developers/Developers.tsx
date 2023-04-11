import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, Typography } from 'antd';
import { NavLink } from 'react-router-dom';
import PATHS from 'router/paths';
import { useTranslation } from 'react-i18next';
import { WalletOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { MenuWrapper } from 'components/AppLayout/Styled';
import { useFirstLoad } from 'features/webhook/webhookHooks';
import Loading from 'components/Common/Loading';

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
  ];

  return (
    <MenuWrapper style={{ marginRight: 0 }}>
      <Menu style={{ borderBottom: 'none' }} mode="horizontal" items={menuItems}></Menu>
    </MenuWrapper>
  );
};

const Wrapper = styled.div`
  .ant-menu {
    background: transparent;
    box-shadow: rgb(231, 231, 231) 0px -1px 0px inset;

    .ant-menu-item:first-child {
      margin-left: -16px;
    }
  }
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 28px;

  .ant-typography {
    line-height: 32px;
  }
`;

const Developers = () => {
  const { t } = useTranslation();
  const isFirstLoad = useFirstLoad();

  return (
    <Wrapper>
      <PageHeader>
        <Typography.Title style={{ margin: 0, lineHeight: '32px', fontSize: 22 }} level={4}>
          {t('developers')}
        </Typography.Title>
      </PageHeader>{' '}
      <DeveloperMenu />
      <Outlet />
      <Loading isContentPage loading={isFirstLoad} />
    </Wrapper>
  );
};

export default Developers;
