import React, { useState } from 'react';
import { Account, AccountContextInterface } from './types';

const defaultAccountContext = {
  account: null,
  setAccount: () => {},
};

export const AccountContext = React.createContext<AccountContextInterface>(defaultAccountContext);

export const useAccount = () => React.useContext(AccountContext);

export const AccountsProvider = ({children}: {
  children: React.ReactNode;
}) => {
  const [account, setAccount] = useState<Account | null>(null);

  return (
    <AccountContext.Provider value={{
      account,
      setAccount,
    }}>
      { children }
    </AccountContext.Provider>
  )
}
