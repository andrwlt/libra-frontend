import { useEffect, useState } from 'react';
import { Button, Space, Typography, Modal, theme } from 'antd';
import styled from 'styled-components';
import Identicon from '@polkadot/react-identicon';
import logo from 'assets/logo.svg';
import { useAccount } from 'contexts/account';
import { useApi } from 'contexts/api';
import { useExtensions } from 'contexts/extensions';
import { APP_NAME } from 'config';
import { useNavigate } from 'react-router-dom';

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
  const { isReady, extensions } = useExtensions();
  const { account, connect } = useAccount();
  const { login } = useApi();
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState([]);
  const [signer, setSigner] = useState(false);
  const [open, setOpen] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const connectExtension = async () => {
    const polkadotJsExt = extensions.find((ext) => ext.id === 'polkadot-js');
    if (polkadotJsExt) {
      setConnecting(true);
      const result = await polkadotJsExt.enable(APP_NAME);
      setSigner(result.signer);
      setAccounts(await result.accounts.get());
      setConnecting(false);

      setOpen(true);
    }
  };

  const handleConnectAccount = async (account: any) => {
    connect({ ...account, signer });
  };

  const handleAccountConnected = async () => {
    try {
      await login();
      navigate('/');
    } catch(err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (account) {
      handleAccountConnected();
    }
  }, [account]);

  return (
    <Wrapper>
      <Space
        style={{ maxWidth: '480px', marginTop: '-48px' }}
        direction="vertical"
        size="large"
        align="start"
      >
        <img width="360px" src={logo} alt="Libra Logo"></img>
        <Typography.Title level={2}>
          Decentralized payments system that empowers the next e-commerce
        </Typography.Title>
        <Button
          disabled={!isReady}
          loading={!isReady || connecting}
          type="primary"
          size="large"
          onClick={connectExtension}
        >
          Connect wallet
        </Button>
      </Space>

      <Modal open={open} onCancel={() => setOpen(false)} footer={false}>
        {accounts.length > 0 && (
          <>
            <Typography.Title level={3}>Select an account</Typography.Title>
            <div>
              {accounts.map((account: any) => (
                <AccountOption
                  key={account.address}
                  account={account}
                  onClick={handleConnectAccount}
                />
              ))}
            </div>
          </>
        )}
      </Modal>
    </Wrapper>
  );
}
