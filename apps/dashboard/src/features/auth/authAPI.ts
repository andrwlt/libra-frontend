import axios from 'axios';
import requester from 'services/requester';
import { LOGIN_MESSAGE } from 'config';
import { AuthAPI } from './types';
import { extensionAPI } from '@atscale/libra-ui';

export const publicInstants = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const authAPI: AuthAPI = {
  getSignature(extension, address) {
    const payload: any = { address, data: LOGIN_MESSAGE };

    //https://github.com/enkryptcom/enKrypt/blob/main/packages/extension/src/providers/polkadot/methods/dot_signer_signRaw.ts
    if (extension.id === 'enkrypt') {
      payload.type = 'bytes';
    }
    return extension.signer.signRaw(payload);
  },

  signIn(data) {
    return requester.post('/auth/login', data);
  },

  getExtensions() {
    return extensionAPI.getExtensions();
  },
};

export default authAPI;
