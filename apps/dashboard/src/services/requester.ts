import axios from 'axios';
import memoizedRefreshToken from './refreshToken';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

const instants = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export function setAxiosToken(token: string) {
  instants.defaults.headers.common.Authorization = 'Bearer ' + token;
}

export function removeAxiosToken() {
  instants.defaults.headers.common.Authorization = '';
}

export const setupInstantsInterceptor = (store: ToolkitStore) => {
  instants.interceptors.response.use(
    (response) => response,
    async (error) => {
      const config = error?.config;

      const isAuthError = error?.response?.status === 401 || error?.response?.status === 403;

      if (isAuthError && !config?.sent) {
        config.sent = true;

        const result = await memoizedRefreshToken(store);

        if (result?.accessToken) {
          config.headers = {
            ...config.headers,
            authorization: `Bearer ${result.accessToken}`,
          };
          setAxiosToken(result.accessToken);
        }

        return axios(config);
      }

      return Promise.reject(error);
    },
  );
};

export default instants;
