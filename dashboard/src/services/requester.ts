import axios from 'axios';
import { isTokenExpired } from 'utils/auth';
import { logout, resetStore } from 'features/auth/authSlice';
import { message } from 'antd';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import i18next from 'app/i18n';

const selectToken = (store: ToolkitStore) => {
  const { accountDictionary, account } = store.getState().auth;
  const token = accountDictionary?.[account?.address];

  return token;
};

const instants = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

let hasLogout = false;

export const setupInstantsInterceptor = (store: ToolkitStore) => {
  instants.interceptors.request.use(
    async (config) => {
      const token = selectToken(store);
      if (token && isTokenExpired(token)) {
        if (!hasLogout) {
          hasLogout = true;
          store.dispatch(resetStore());
          store.dispatch(logout());
          message.open({ type: 'error', content: i18next.t('sessionExpried') });

          setTimeout(() => {
            hasLogout = false;
          }, 1000);
        }

        throw new axios.Cancel('');
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
};

export function setAxiosToken(token: string) {
  instants.defaults.headers.common.Authorization = 'Bearer ' + token;
}

export function removeAxiosToken() {
  instants.defaults.headers.common.Authorization = '';
}

export default instants;
