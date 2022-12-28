import styled from 'styled-components';
import { useExtensions } from 'contexts/extensions';
import { useEffect, useState } from 'react';
import InstallGuide from './InstallGuide';
import AccountSelect from 'components/account/AccountSelect';
import { Button, Skeleton } from 'antd';
import { web3FromSource } from '@polkadot/extension-dapp';

import { APP_NAME } from 'config';

const Wrapper = styled.div`
  width: 100%;
`;

export default function ConnectAccount({
  onAccountConnected,
}: any) {
  const { extensions, isReady } = useExtensions();
  const [extension, setExtension] = useState<any>();
  const [accounts, setAccounts] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [isExtensionConnected, setIsExtensionConnected] = useState(false);

  const connectExtension = async () => {
    setLoading(true);
    if (extension) {
      const result = await extension.enable(APP_NAME);
      setIsExtensionConnected(true);
      setAccounts(await result.accounts.get());
    }
    setLoading(false);
  };

  const checkExtensionConnected = async () => {
    setLoading(true);
    try {
      console.log(extension.id);
      const result = await web3FromSource(extension.id);
      setIsExtensionConnected(true);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isReady) {
      const polkadotJs = extensions.find(item => item.id === 'polkadot-js');
      setExtension(polkadotJs);
    }
  }, [isReady]);

  useEffect(() => {
    if (extension) {
      checkExtensionConnected();
    }
  }, [extension])

  const handleAccountSelected = (account: any) => {
    onAccountConnected && onAccountConnected(account);
  };

  if (loading || !isReady) {
    return <Skeleton active></Skeleton>
  }

  if (!extension) {
    return <InstallGuide/>
  }

  if (extension && !isExtensionConnected) {
    return <>
      <Button
        loading={loading}
        disabled={loading}
        size='large'
        block
        onClick={connectExtension}
      >Connect Wallet</Button>
    </>
  }

  return <Wrapper>
    <AccountSelect
      accounts={accounts}
      onChange={handleAccountSelected}
    />
  </Wrapper>
};