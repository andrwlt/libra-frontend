import { useState } from 'react';
import { Button, Typography, Card, theme as antdTheme } from 'antd';
import styled from 'styled-components';
import logo from 'assets/logo.svg';
import { useExtensions, useAuth, useLogin, useConnectExtension } from 'features/auth/authHooks';
import SelectAccountModal from 'components/SelectAccountModal';
import { Navigate } from 'react-router-dom';
import { isTokenExpired } from 'utils/auth';
import PATHS from 'router/paths';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Loading from 'components/Common/Loading';
import NoExtension from './NoExtension';

type PropsType = {
  colorBgLayout: string;
};

const SignInWrapper = styled.div<PropsType>`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color: ${(props) => props.colorBgLayout};
`;

export default function SignIn() {
  const { getExtensionsLoading, getExtensionsFailed } = useExtensions();
  const [isSelectAccountModalOpen, setIsSelectAccountModalOpen] = useState(false);
  const { handleConnectExtension, connectExtensionLoading, connectedExtension } = useConnectExtension(() => {
    setIsSelectAccountModalOpen(true);
  });
  const { token } = useAuth();
  const { loginLoading, handleLogin } = useLogin();
  const { t } = useTranslation();

  const {
    token: { colorBgLayout, boxShadow },
  } = antdTheme.useToken();

  if (token && !isTokenExpired(token)) {
    return <Navigate to="/" />;
  }

  return (
    <SignInWrapper colorBgLayout={colorBgLayout} className="test">
      <Loading loading={getExtensionsLoading || loginLoading} isFullPage />
      {getExtensionsFailed ? (
        <NoExtension />
      ) : (
        <Card style={{ boxShadow, maxWidth: '480px', width: '100%', padding: '1rem' }}>
          <a href="https://golibra.xyz">
            <img src={logo} height={36} alt="Libra Logo"></img>
          </a>
          <Typography.Title level={3}>{t('signIn.login')}</Typography.Title>

          <Typography.Title style={{ fontWeight: 'normal', marginTop: '-4px' }} type="secondary" level={5}>
            {t('signIn.continueToLibra')}
          </Typography.Title>

          <Button
            loading={connectExtensionLoading}
            style={{ marginTop: '32px' }}
            type="primary"
            size="large"
            block
            onClick={handleConnectExtension}
          >
            {t('signIn.continueWithWallet')}
          </Button>

          <Typography.Paragraph type="secondary" style={{ marginTop: '16px' }}>
            {t('signIn.newToLibra')} <Link to={PATHS.onboard}> {t('signIn.tryNow')}</Link>
          </Typography.Paragraph>
        </Card>
      )}

      <SelectAccountModal
        open={isSelectAccountModalOpen}
        onSelectAccount={handleLogin}
        onClose={() => setIsSelectAccountModalOpen(false)}
        connectExtensionLoading={connectExtensionLoading}
        connectedExtension={connectedExtension}
      />
    </SignInWrapper>
  );
}
