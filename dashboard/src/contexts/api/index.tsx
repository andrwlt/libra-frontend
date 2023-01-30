import React, { useState } from 'react';
import axios from 'axios';

import { useAccount } from 'contexts/account';
import { isTokenExpired } from 'utils/auth';
import { Checkout, Charge } from 'types';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const defaultApiContext = {
  login: () => [],
  getCharges: () => [],
  createCheckout: () => {},
  getCheckoutList: () => [],
  getCheckout: () => null,
};

export const ApiContext = React.createContext<any>(defaultApiContext);

export const useApi = () => React.useContext(ApiContext);

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
  const { account } = useAccount();

  const login = async (account: any): Promise<string> => {
    const message = 'libra-checkout-login';
    const { signature } = await account.signer.signRaw({ address: account.address, data: message });
  
    const data = {
      address: account.address,
      message,
      signature,
    };
  
    const response: any = await instance.post('/auth/login', data);
    localStorage.setItem(account.address, response.data.accessToken);
  
    return response.data.accessToken;
  };

  const getAuthToken = async (account: any) => {
    let accessToken = localStorage.getItem(account.address);
  
    if (accessToken && !isTokenExpired(accessToken)) {
      return accessToken;
    }
  
    return await login(account);
  };

  const getCharges = async () => {
    const accessToken = await getAuthToken(account);

    const response = await instance.get('/charges', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  };

  const createCheckout = async (checkout: any) => {
    const accessToken = await getAuthToken(account);

    const response = await instance.post('/checkout', checkout, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  };

  const getListCheckout = async () => {
    const accessToken = await getAuthToken(account);

    const response = await instance.get('/checkout', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  };

  const getOneCheckout = async (id: string) => {
    const accessToken = await getAuthToken(account);

    const response = await instance.get(`/checkout/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  };

  return (
    <ApiContext.Provider
      value={{
        login,
        getCharges,
        createCheckout,
        getListCheckout,
        getOneCheckout,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
