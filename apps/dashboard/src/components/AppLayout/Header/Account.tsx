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
import { useLocation } from 'react-router-dom';
import { ExperimentTwoTone, QuestionCircleOutlined } from '@ant-design/icons';
import { LOCALE_WORKSPACE } from 'app/i18n';

const StyledMenuItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  .ant-dropdown-menu-title-content {
    display: block;
  }
`;

const { Title, Text, Link } = Typography;

const developerRoutes = ['webhooks', 'apiKeys', 'developers'];

const Account = () => {
  const { t } = useTranslation(LOCALE_WORKSPACE.LAYOUT);
  const { t: tWording } = useTranslation(LOCALE_WORKSPACE.WORDING);

  const { account } = useAuth();
  const logout = useLogout();
  const screen = useBreakpoint();
  const location = useLocation();
  const [isDeveloperInfoModalOpen, setIsDeveloperInfoModalOpen] = useState(false);
  const [isHelpCenterModalOpen, setIsHelpCenterModalOpen] = useState(false);
  const [, rootPath] = location.pathname.split('/');
  const isDeveloperActive = developerRoutes.includes(rootPath);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <StyledMenuItem style={{ cursor: 'auto' }}>
          <Identicon
            value={account?.address}
            size={35}
            theme="polkadot"
            style={{ display: 'block', cursor: 'pointer' }}
          />
          <div style={{ marginLeft: 10, display: 'flex', flexDirection: 'column' }}>
            <Text style={{ margin: 0 }}> {account?.name}</Text>
            <Text type="secondary" style={{ margin: 0 }}>
              {' '}
              {truncate(account?.address, { start: 6, end: 6 })}
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
        <StyledMenuItem style={{ width: 170 }} onClick={() => setIsDeveloperInfoModalOpen(true)}>
          <Text style={{ margin: 0 }}>{t('developers')}</Text>
        </StyledMenuItem>
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
          <Identicon
            value={account?.address}
            size={35}
            theme="polkadot"
            style={{ display: 'block', cursor: 'pointer' }}
          />
        </Space>
      </Dropdown>
      <Modal
        width={480}
        open={isDeveloperInfoModalOpen}
        onCancel={() => setIsDeveloperInfoModalOpen(false)}
        footer={false}
      >
        <div>
          <Space align="center" size={12}>
            <ExperimentTwoTone style={{ fontSize: 21, position: 'relative', top: '1.5px' }} />
            <Title style={{ margin: 0, fontSize: 16 }} level={5}>
              {tWording('partnerFeature')}
            </Title>
          </Space>

          <Row style={{ marginTop: 8, paddingLeft: 33 }}>
            <Text>{tWording('developerModeIsForPartnerOnly')}</Text>
          </Row>

          <Row style={{ paddingLeft: 33 }}>
            <Text>{tWording('pleaseDropLine')}</Text>
            <Link href="mailto:partners@golibra.xyz" style={{ marginLeft: 5, marginRight: 5 }}>
              partners@golibra.xyz
            </Link>
            <Text>{tWording('toGainAccess')}</Text>
          </Row>

          <Row justify="end" style={{ marginTop: 12 }}>
            <Button type="primary" key="console" onClick={() => setIsDeveloperInfoModalOpen(false)}>
              {t('ok')}
            </Button>
          </Row>
        </div>
      </Modal>

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

export default Account;
