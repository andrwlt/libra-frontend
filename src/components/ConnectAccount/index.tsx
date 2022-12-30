import styled from 'styled-components';
import { useExtensions } from 'contexts/extensions';
import { useEffect, useState } from 'react';
import InstallGuide from './InstallGuide';
import AccountSelect from 'components/account/AccountSelect';
import { Button, Skeleton } from 'antd';
import { saveConnectedExtension, isExtensionConnected } from 'utils/extensions';

import { APP_NAME } from 'config';

const Wrapper = styled.div`
  width: 100%;
`;

interface ConnectAccountProps {
  onAccountConnected: Function;
}

export default function ConnectAccount({
  onAccountConnected,
}: ConnectAccountProps) {
  const { extensions, isReady } = useExtensions();
  const [extension, setExtension] = useState<any>();
  const [accounts, setAccounts] = useState<any>([]);
  const [signer, setSinger] = useState<any>();
  const [loading, setLoading] = useState(false);

  const connectExtension = async () => {
    setLoading(true);
    if (extension) {
      const result = await extension.enable(APP_NAME);
      setSinger(result.signer);
      setAccounts(await result.accounts.get());
      saveConnectedExtension(extension.id);
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
    if (extension && isExtensionConnected(extension.id)) {
      connectExtension();
    }
  }, [extension])

  const handleAccountSelected = (account: any) => {
    onAccountConnected && onAccountConnected({
      ...account,
      signer,
    });
  };

  if (loading || !isReady) {
    return <Skeleton active></Skeleton>
  }

  if (!extension) {
    return <InstallGuide/>
  }

  if (extension && !isExtensionConnected(extension.id)) {
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