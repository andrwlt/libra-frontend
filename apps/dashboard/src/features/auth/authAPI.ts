import axios from 'axios';
import requester from 'services/requester';
import { LOGIN_MESSAGE } from 'config';
import { AuthAPI } from './types';
import { extensionAPI } from '@atscale/libra-ui';

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
    return extensionAPI.getExtensions();
  },
};

export default authAPI;
