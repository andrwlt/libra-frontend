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
import { ExperimentTwoTone } from '@ant-design/icons';
import { LOCALE_WORKSPACE } from 'app/i18n';

const StyledMenuItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  .ant-dropdown-menu-title-content {
    display: block;
  }
`;

const developerRoutes = ['webhooks', 'apiKeys', 'developers'];

const Account = () => {
  const { t } = useTranslation(LOCALE_WORKSPACE.LAYOUT);
  const { t: tWording } = useTranslation(LOCALE_WORKSPACE.WORDING);

  const { account } = useAuth();
  const logout = useLogout();
  const screen = useBreakpoint();
  const location = useLocation();
  const [isDeveloperInfoModalOpen, setIsDeveloperInfoModalOpen] = useState(false);

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
            <Typography.Text style={{ margin: 0 }}> {account?.name}</Typography.Text>
            <Typography.Text type="secondary" style={{ margin: 0 }}>
              {' '}
              {truncate(account?.address, { start: 6, end: 6 })}
            </Typography.Text>
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
          <Typography.Text style={{ margin: 0 }}>{t('developers')}</Typography.Text>
        </StyledMenuItem>
      ),
    },
    {
      key: '3',
      label: (
        <StyledMenuItem>
          <Typography.Text style={{ margin: 0 }}> {t('helpCenter')}</Typography.Text>
        </StyledMenuItem>
      ),
      disabled: true,
    },
    {
      key: '4',
      label: (
        <StyledMenuItem>
          <Typography.Text style={{ margin: 0 }}> {t('whatNew')}</Typography.Text>
        </StyledMenuItem>
      ),
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: '5',
      label: (
        <StyledMenuItem onClick={() => logout()}>
          <Typography.Text style={{ margin: 0 }} type="danger">
            {' '}
            {t('logout')}
          </Typography.Text>
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
        width={416}
        open={isDeveloperInfoModalOpen}
        onCancel={() => setIsDeveloperInfoModalOpen(false)}
        footer={false}
      >
        <div>
          <Space align="center" size={12}>
            <ExperimentTwoTone style={{ fontSize: 21, position: 'relative', top: '1.5px' }} />
            <Typography.Title style={{ margin: 0, fontSize: 16 }} level={5}>
              {tWording('experienceFeature')}
            </Typography.Title>
          </Space>

          <Row style={{ marginTop: 8, paddingLeft: 33 }}>
            <Typography.Text>{tWording('developerModeIsForPartnerOnly')}</Typography.Text>
          </Row>

          <Row style={{ paddingLeft: 33 }}>
            <Typography.Text>{tWording('contactUsForMoreDetails')}</Typography.Text>
          </Row>

          <Row justify="end" style={{ marginTop: 12 }}>
            <Button type="primary" key="console" onClick={() => setIsDeveloperInfoModalOpen(false)}>
              {t('ok')}
            </Button>
          </Row>
        </div>
      </Modal>
    </Fragment>
  );
};

export default Account;
