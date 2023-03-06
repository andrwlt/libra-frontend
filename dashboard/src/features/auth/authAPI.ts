import axios from 'axios';
import requester from 'services/requester';
import { LOGIN_MESSAGE } from 'config';
import { hasInjectedWeb3, getExtensions } from './authUtils';
import { GET_EXTENSIONS_MAX_RETRY, GET_EXTENSIONS_INTERVAL_DURATION } from 'config';
import { AuthAPI } from './types';
import i18next from 'app/i18n';

export const publicInstants = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const authAPI: AuthAPI = {
  getSignater(extension, address) {
    return extension.signer.signRaw({ address, data: LOGIN_MESSAGE });
  },

  signIn(data) {
    return requester.post('/auth/login', data);
  },

  getExtensions() {
    let retryCounter = 0;

    return new Promise((resolve, reject) => {
      const retryInterval = setInterval(() => {
        if (hasInjectedWeb3()) {
          clearInterval(retryInterval);
          const extensions = getExtensions();
          resolve(extensions);
        }

        if (++retryCounter === GET_EXTENSIONS_MAX_RETRY) {
          clearInterval(retryInterval);
          reject({ message: i18next.t('getExtensionsFailed') });
        }
      }, GET_EXTENSIONS_INTERVAL_DURATION);
    });
  },
};

export default authAPI;
