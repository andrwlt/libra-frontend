import { useState } from 'react';
import { Button, Typography, Card, theme as antdTheme } from 'antd';
import styled from 'styled-components';
import logo from 'assets/logo.svg';
import { useAuth, useLogin } from 'features/auth/authHooks';
import ConnectWalletModal from 'components/ConnectWalletModal';
import { Navigate } from 'react-router-dom';
import PATHS from 'router/paths';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Loading from 'components/Common/Loading';
import { LOCALE_WORKSPACE } from 'app/i18n';

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
  const [isConnectWalletModalOpen, setIsConnectWalletModalOpen] = useState(false);
  const { token } = useAuth();
  const { loginLoading, handleLogin } = useLogin();
  const { t } = useTranslation(LOCALE_WORKSPACE.AUTH);

  const {
    token: { colorBgLayout, boxShadow },
  } = antdTheme.useToken();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <SignInWrapper colorBgLayout={colorBgLayout} className="test">
      <Loading loading={loginLoading} isFullPage />
      <Card style={{ boxShadow, maxWidth: '480px', width: '100%', padding: '1rem' }}>
        <a href="https://golibra.xyz">
          <img src={logo} height={36} alt="Libra Logo"></img>
        </a>
        <Typography.Title level={3}>{t('login')}</Typography.Title>

        <Typography.Title style={{ fontWeight: 'normal', marginTop: '-4px' }} type="secondary" level={5}>
          {t('continueToLibra')}
        </Typography.Title>

        <Button
          style={{ marginTop: '32px' }}
          type="primary"
          size="large"
          block
          onClick={() => setIsConnectWalletModalOpen(true)}
        >
          {t('continueWithWallet')}
        </Button>

        <Typography.Paragraph type="secondary" style={{ marginTop: '16px' }}>
          {t('newToLibra')} <Link to={PATHS.onboard}> {t('tryNow')}</Link>
        </Typography.Paragraph>
      </Card>
      <ConnectWalletModal
        open={isConnectWalletModalOpen}
        handleLogin={handleLogin}
        onClose={() => setIsConnectWalletModalOpen(false)}
      />
    </SignInWrapper>
  );
}
