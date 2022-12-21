import { Typography } from 'antd';
import { useState } from 'react';
import { web3FromSource, web3Enable, web3Accounts } from '@polkadot/extension-dapp';
import Select from './Select';
import wallets from '../config/wallets';
import styled from 'styled-components';

const { Title } = Typography;

const Wrapper = styled.div`
  width: 100%;
`;

const APP_NAME = 'Libra Checkout';

interface ConnectWalletProps {
  onAccountSelected?: Function;
}

export default function ConnectWallet({
  onAccountSelected,
}: ConnectWalletProps) {
  const [selectedWallet, setSelectedWallet] = useState<any>(null);
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [accounts, setAccounts] = useState<any[]>([]);

  const handleWalletSelected = async ({ value }: any) => {
    try {
      await web3Enable(APP_NAME);
      const wallet = await web3FromSource(value);
      setSelectedWallet(wallet);
      setAccounts(await wallet.accounts.get());
    } catch (err) {
      console.log(err);
    }
  };

  const handleAccountSelected = async ({ value }: any) => {
    try {
      const account = accounts.find(item => item.address === value);
      setSelectedAccount(account);
      onAccountSelected && onAccountSelected({
        wallet: selectedWallet,
        account,
      });
    } catch (err) {
      console.log(err);
    }
  }

  if (!selectedWallet) {
    const items = wallets.map(item => ({
      title: item.title,
      value: item.name,
      image: item.logoUrl,
    }));

    return <Wrapper>
      <Select
        label='Select your wallet'
        onChange={handleWalletSelected}
        items={items}
      />
    </Wrapper>;
  }

  if (selectedWallet && !selectedAccount) {

    const items = accounts.map((account) => ({
      title: account.name,
      description: `${account.address.slice(0, 12)}...${account.address.slice(-12)}`,
      value: account.address,
    }));

    return <Wrapper>
      <Select
        label='Select your account'
        onChange={handleAccountSelected}
        items={items}
      />
    </Wrapper>
  }

  return <></>
}