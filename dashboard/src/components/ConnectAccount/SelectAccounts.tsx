import { Skeleton } from 'antd';
import Select from 'components/Select';
import styled from 'styled-components';
import { useExtensions } from 'contexts/extensions';
import { useEffect, useState } from 'react';
import { APP_NAME } from 'config';
import { useAccount } from 'contexts/account';
import { Account } from 'contexts/account/types';

const Wrapper = styled.div`
  width: 100%;
`;

interface SelectAccountProps {
  extensionId?: string;
}

export default ({ extensionId }: SelectAccountProps) => {
  const { extensions } = useExtensions();
  const { connect } = useAccount();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadAccounts = async () => {
    setLoading(true);
    const extension = extensions.find(item => item.id === extensionId);
    if (extension) {
      const result = await extension.enable(APP_NAME);
      setAccounts(await result.accounts.get())
    }
    setLoading(false);
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  useEffect(() => {
    if (accounts.length === 1) {
      connect(accounts[0]);
    }
  }, [accounts]);

  const options = accounts.map((account: any) => ({
    title: account.name,
    description: `${account.address.slice(0, 12)}...${account.address.slice(-12)}`,
    value: account.address,
  }));

  const handleAccountSelected = (event: any) => {
    const account = accounts.find(item => item.address === event.value);
    connect(account);
  };
  
  return (
    <Wrapper>
      <Skeleton loading={loading} active>
        {accounts.length > 1 && <Select
          label='Select your wallet'
          onChange={handleAccountSelected}
          items={options}
        />}
      </Skeleton>
    </Wrapper>
  );
};
