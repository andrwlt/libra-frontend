import React, { useState, useEffect } from 'react';
import { Account, AccountContextInterface } from './types';
import { useNavigate } from 'react-router-dom';

const LOGIN_PATH = '/login';

const defaultAccountContext = {
  account: null,
  connect: () => {},
  disconnect: () => {},
};

export const AccountContext = React.createContext<AccountContextInterface>(defaultAccountContext);

export const useAccount = () => React.useContext(AccountContext);

export const AccountsProvider = ({ children }: { children: React.ReactNode }) => {
  const [account, setAccount] = useState<Account | null>(null);

  const navigate = useNavigate();

  const connect = (account: any) => {
    setAccount(account);
    navigate('/');
  };

  const disconnect = () => {
    setAccount(null);
    navigate(LOGIN_PATH);
  };

  return (
    <AccountContext.Provider
      value={{
        account,
        connect,
        disconnect,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
