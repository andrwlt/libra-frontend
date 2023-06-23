import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, Typography } from 'antd';
import { NavLink } from 'react-router-dom';
import PATHS from 'router/paths';
import { useTranslation } from 'react-i18next';
import { WalletOutlined, KeyOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { MenuWrapper } from 'components/AppLayout/Styled';
import { useFirstLoad, useResetWebhook } from 'features/webhook/webhookHooks';
import Loading from 'components/Common/Loading';
import { LOCALE_WORKSPACE } from 'app/i18n';
import { useAPIKeyFirstLoad } from 'features/apiKey/apiKeyHooks';

const DeveloperMenu = () => {
  const { t } = useTranslation(LOCALE_WORKSPACE.LAYOUT);

  const getClassName = ({ isActive, isPending }: { isActive: boolean; isPending: boolean }) =>
    isPending ? 'pending-link' : isActive ? 'active-link' : 'not-active-link';

  const menuItems: MenuProps['items'] = [
    {
      label: (
        <NavLink to={PATHS.developers.root} className={getClassName} end>
          {t('webhooks')}
        </NavLink>
      ),
      icon: <WalletOutlined />,
      key: PATHS.developers.root,
    },

    {
      label: (
        <NavLink to={PATHS.developers.apiKeys} className={getClassName} end>
          {t('apiKeys')}
        </NavLink>
      ),
      icon: <KeyOutlined />,
      key: PATHS.developers.apiKeys,
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
  const { t } = useTranslation(LOCALE_WORKSPACE.LAYOUT);
  const isFirstLoad = useFirstLoad();
  const isAPIKeyFirstLoad = useAPIKeyFirstLoad();
  useResetWebhook();

  return (
    <Wrapper>
      <PageHeader>
        <Typography.Title style={{ margin: 0, lineHeight: '32px', fontSize: 22 }} level={4}>
          {t('developers')}
        </Typography.Title>
      </PageHeader>{' '}
      <DeveloperMenu />
      <Outlet />
      <Loading isContentPage loading={isFirstLoad && isAPIKeyFirstLoad} />
    </Wrapper>
  );
};

export default Developers;
