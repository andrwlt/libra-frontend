import { Checkout } from 'types';
import axios from 'axios';

import { Charge } from 'types';
import { isTokenExpired } from 'utils/auth';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const api = {
  async login(account: any) {
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
  },

  async getAccessToken(account: any) {
    let accessToken = localStorage.getItem(account.address);

    if (accessToken && !isTokenExpired(accessToken)) {
      return accessToken;
    }

    return await this.login(account);
  },

  async createCheckout({ account, checkout }: any) {
    if (account) {
      const accessToken = await this.getAccessToken(account);

      const response = await instance.post('/checkout', checkout, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      return response.data;
    } else {
      const response = await instance.post('/checkout', checkout);
  
      return response.data;
    }
  },

  async getCheckoutList(account: any): Promise<Checkout[]> {
    const accessToken = await this.getAccessToken(account);

    const response = await instance.get('/checkout', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  },

  async getCharges(account: any): Promise<Charge[]> {
    const accessToken = await this.getAccessToken(account);

    const response = await instance.get('/charges', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  },
};

export default api;
