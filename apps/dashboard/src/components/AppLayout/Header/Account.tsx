import { Fragment, useState } from 'react';
import { Dropdown, Space, Typography, Modal, Button, Row } from 'antd';
import { useAuth, useLogout } from 'features/auth/authHooks';
import Identicon from '@polkadot/react-identicon';
import { truncate } from 'utils/format/formatText';
import { useTranslation } from 'react-i18next';
import type { MenuProps } from 'antd';
import styled from 'styled-components';
import { useBreakpoint } from 'app/hooks';
import { breakpoints } from 'config';
import { NavLink, useLocation } from 'react-router-dom';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { LOCALE_WORKSPACE } from 'app/i18n';
import { Account } from '@atscale/libra-ui';
import PATHS from 'router/paths';

const StyledMenuItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  .ant-dropdown-menu-title-content {
    display: block;
  }
`;

const getClassName = ({ isActive, isPending }: { isActive: boolean; isPending: boolean }) =>
  isPending ? 'pending-link' : isActive ? 'active-link' : 'not-active-link';

const { Title, Text, Link } = Typography;

const developerRoutes = ['webhooks', 'apiKeys', 'developers'];

const getAccountName = (account: Account) => {
  if (!account) {
    return '';
  }

  return account.name;
};

const AccountIcon = ({ account }: { account: Account }) => {
  return (
    <Identicon value={account?.address} size={35} theme="polkadot" style={{ display: 'block', cursor: 'pointer' }} />
  );
};

const AccountComponent = () => {
  const { t } = useTranslation(LOCALE_WORKSPACE.LAYOUT);
  const { t: tWording } = useTranslation(LOCALE_WORKSPACE.WORDING);

  const { account } = useAuth();
  const logout = useLogout();
  const screen = useBreakpoint();
  const location = useLocation();
  const [isHelpCenterModalOpen, setIsHelpCenterModalOpen] = useState(false);
  const [, rootPath] = location.pathname.split('/');
  const isDeveloperActive = developerRoutes.includes(rootPath);

  if (!account) {
    return null;
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <StyledMenuItem style={{ cursor: 'auto' }}>
          <AccountIcon account={account} />
          <div style={{ marginLeft: 10, display: 'flex', flexDirection: 'column' }}>
            <Text style={{ margin: 0 }}> {getAccountName(account)}</Text>
            <Text type="secondary" style={{ margin: 0 }}>
              {' '}
              {truncate(account.address, { start: 6, end: 6 })}
            </Text>
          </div>
        </StyledMenuItem>
      ),
    },

    {
      type: 'divider',
    },

    {
      key: '2',
      label: (
        <NavLink className={getClassName} to={PATHS.developers.root}>
          <StyledMenuItem style={{ width: 170 }}>{t('developers')}</StyledMenuItem>
        </NavLink>
      ),
    },
    {
      key: '3',
      label: (
        <StyledMenuItem style={{ width: 170 }} onClick={() => setIsHelpCenterModalOpen(true)}>
          <Text style={{ margin: 0 }}>{t('helpCenter')}</Text>
        </StyledMenuItem>
      ),
    },
    {
      key: '4',
      label: (
        <StyledMenuItem style={{ width: 170 }}>
          <Link
            href="https://paywithlibra.substack.com/"
            target="_blank"
            style={{ margin: 0, width: 170, color: 'rgba(0, 0, 0, 0.88)' }}
          >
            {' '}
            {t('whatNew')}
          </Link>
        </StyledMenuItem>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: '5',
      label: (
        <StyledMenuItem onClick={() => logout()}>
          <Text style={{ margin: 0 }} type="danger">
            {' '}
            {t('logout')}
          </Text>
        </StyledMenuItem>
      ),
    },
  ];

  return (
    <Fragment>
      <Dropdown
        overlayStyle={{ minWidth: 150 }}
        menu={{ items, selectedKeys: isDeveloperActive ? ['2'] : [] }}
        placement={screen === breakpoints.screen.xl ? 'bottom' : 'bottomRight'}
      >
        <Space align="center" size={8} style={{ cursor: 'pointer' }}>
          <AccountIcon account={account} />
        </Space>
      </Dropdown>

      <Modal width={480} open={isHelpCenterModalOpen} onCancel={() => setIsHelpCenterModalOpen(false)} footer={false}>
        <div>
          <Space align="center" size={12}>
            <QuestionCircleOutlined style={{ fontSize: 21, position: 'relative', top: '1.5px', color: '#1677ff' }} />
            <Title style={{ margin: 0, fontSize: 16 }} level={5}>
              {tWording('helpCenterTitle')}
            </Title>
          </Space>

          <Row style={{ marginTop: 8, paddingLeft: 33 }}>
            <Text>{tWording('helpCenterContentPart1')}</Text>
            <Link
              target="_blank"
              href="https://discord.com/channels/999216269226164234/1101337338493292705"
              style={{ marginRight: 5 }}
            >
              {tWording('reachOut')}
            </Link>
            <Text>{tWording('helpCenterContentPart2')}</Text>
            <Link
              target="_blank"
              href="https://discord.com/channels/999216269226164234/1101337338493292705"
              style={{ marginLeft: 5, marginRight: 5 }}
            >
              Discord
            </Link>
            <Text>{tWording('helpCenterContentPart3')}</Text>
          </Row>

          <Row justify="end" style={{ marginTop: 12 }}>
            <Button type="primary" key="console" onClick={() => setIsHelpCenterModalOpen(false)}>
              {t('ok')}
            </Button>
          </Row>
        </div>
      </Modal>
    </Fragment>
  );
};

export default AccountComponent;
