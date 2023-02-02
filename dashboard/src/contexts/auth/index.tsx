import React, { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { isTokenExpired } from 'utils/auth';
import { useExtensions } from 'contexts/extensions';
import { useAccount } from 'contexts/account';

const defaultAuthContext = {
  token: null,
  isLoggingIn: false,
  isAuthenticated: () => false,
  login: () => {},
};

export const AuthContext = React.createContext<any>(defaultAuthContext);

export const useAuth = () => React.useContext(AuthContext);

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { connectedExtension } = useExtensions();
  const { account, setAccount } = useAccount();

  const login = async (account: any): Promise<void> => {
    setIsLoggingIn(true);

    if (!connectedExtension) {
      throw new Error('Connect with an extension before login.');
    }

    try {
      const signMessage = 'libra-checkout-login';
      const { signature } = await connectedExtension.signer.signRaw({ address: account.address, data: signMessage });

      const data = {
        address: account.address,
        message: signMessage,
        signature,
      };

      const response: any = await instance.post('/auth/login', data);
      localStorage.setItem(account.address, response.data.accessToken);

      setToken(response.data.accessToken);
      setIsLoggingIn(false);
    } catch (err) {
      console.log(err);
      message.error('Fail to login.');
    }

    setIsLoggingIn(false);
  };

  const logout = () => {
    if (account) {
      localStorage.removeItem(account.address);
      setToken(null);
      setAccount(null);
    }
  };

  const isAuthenticated = () => token && !isTokenExpired(token);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        isLoggingIn,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
