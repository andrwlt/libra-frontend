import React from 'react';
import axios from 'axios';
import { useAuth } from 'contexts/auth';
import { ApiContextInterface } from './types';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const defaultApiContext = {
  getCharges: async () => [],
  createCheckout: async () => null,
  getListCheckout: async () => [],
  getCheckout: async () => null,
};

export const ApiContext = React.createContext<ApiContextInterface>(defaultApiContext);

export const useApi = () => React.useContext(ApiContext);

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();

  const getCharges = async () => {
    const response = await instance.get('/charges', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  };

  const createCheckout = async (checkout: any) => {
    const response = await instance.post('/checkout', checkout, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  };

  const getListCheckout = async () => {
    const response = await instance.get('/checkout', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  };

  const getCheckout = async (id: string) => {
    const response = await instance.get(`/checkout/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  };

  return (
    <ApiContext.Provider
      value={{
        getCharges,
        createCheckout,
        getListCheckout,
        getCheckout,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
