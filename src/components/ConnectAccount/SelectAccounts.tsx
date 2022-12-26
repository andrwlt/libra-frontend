import { Skeleton } from 'antd';
import Select from 'components/Select';
import styled from 'styled-components';
import { useExtensions } from 'contexts/extensions';
import { useEffect, useState } from 'react';
import { APP_NAME } from 'config';
import { useAccount } from 'contexts/account';

const Wrapper = styled.div`
  width: 100%;
`;

interface SelectAccountProps {
  extensionId?: string;
}

export default ({ extensionId }: SelectAccountProps) => {
  const { extensions } = useExtensions();
  const { setAccount } = useAccount();
  const [accounts, setAccounts] = useState([]);
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
      setAccount(accounts[0]);
    }
  }, [accounts]);


  const options = accounts.map((account: any) => ({
    title: account.name,
    description: `${account.address.slice(0, 12)}...${account.address.slice(-12)}`,
    value: account.address,
  }));

  const handleAccountSelected = (event: any) => {

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
