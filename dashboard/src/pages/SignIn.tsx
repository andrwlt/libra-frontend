import { useEffect, useState } from 'react';
import { Button, Space, Typography, Modal, Spin, theme } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Identicon from '@polkadot/react-identicon';
import logo from 'assets/logo.svg';
import { useAccount } from 'contexts/account';
import { useExtensions } from 'contexts/extensions';
import { useAuth } from 'contexts/auth';
import { useNavigate } from 'react-router-dom';
import { getConnectedAccount, saveConnectedAccount } from 'utils/account';
import { isTokenExpired } from 'utils/auth';

function AccountOption({ account, onClick }: any) {
  const [hovered, setHovered] = useState(false);

  const {
    token: { colorPrimary, colorBorder, colorPrimaryBgHover, borderRadius },
  } = theme.useToken();

  return (
    <div
      style={{
        borderRadius,
        border: `solid 1px ${hovered ? colorPrimary : colorBorder}`,
        background: `${hovered ? colorPrimaryBgHover : ''}`,
        cursor: 'pointer',
        padding: '16px',
        margin: '8px 0',
      }}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      onClick={() => {
        onClick && onClick(account);
      }}
    >
      <Space align="center">
        <Identicon value={account.address} size={24} theme="polkadot"></Identicon>
        <Typography.Paragraph style={{ marginBottom: '4px' }} strong>
          {account.name}
        </Typography.Paragraph>
      </Space>
    </div>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function SignIn() {
  const { isReady, connectExtension, isConnecting, connectedExtension } = useExtensions();
  const { setAccount } = useAccount();
  const { login, isLoggingIn, setToken } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleConnectExtension = async () => {
    await connectExtension('polkadot-js');
    setOpen(true);
  };

  const handleAccountSelected = async (account: any) => {
    setAccount(account);
    saveConnectedAccount(account);
    await login(account);
    setOpen(false);
    navigate('/');
  };

  useEffect(() => {
    // Load data from local storage
    const connectedAccount = getConnectedAccount();
    if (connectedAccount) {
      setAccount(connectedAccount);
      const token = localStorage.getItem(connectedAccount.address);
      if (token && !isTokenExpired(token)) {
        setToken(token);
        navigate('/');
      }
    }
  }, []);

  if (!isReady || isLoggingIn) {
    return (
      <Wrapper>
        <Spin tip="Loading ..." indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}></Spin>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Space style={{ maxWidth: '560px', marginTop: '-48px' }} direction="vertical" size="large" align="start">
        <img width="360px" src={logo} alt="Libra Logo"></img>
        <Typography.Title level={2}>Decentralized payments system that empowers the next e-commerce</Typography.Title>
        <Button
          disabled={isConnecting}
          loading={isConnecting}
          type="primary"
          size="large"
          onClick={handleConnectExtension}
        >
          Log in with wallet
        </Button>
      </Space>

      <Modal open={open} onCancel={() => setOpen(false)} footer={false}>
        {connectedExtension && connectedExtension.accounts.length > 0 && (
          <>
            <Typography.Title level={3}>Select an account</Typography.Title>
            <div>
              {connectedExtension.accounts.map((account: any) => (
                <AccountOption key={account.address} account={account} onClick={handleAccountSelected} />
              ))}
            </div>
          </>
        )}
      </Modal>
    </Wrapper>
  );
}
