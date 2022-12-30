import { Checkout } from "types";
import { charges, checkout } from './fixtures';
import axios from "axios";

import { Charge } from "types";

const wait = (time: number) => new Promise((resolve) => {
  setTimeout(resolve, time);
});

const instance = axios.create({
  baseURL: 'http://192.168.100.140:3000/',
});

const TOKEN_STORAGE_KEY = 'LibraAccessToken';

interface Transaction {
  payload: {
    payee: string;
    amount: string;
    currency: string;
  },
  account: {
    address: string;
    signer: any;
  }
}
interface CreateOrderParams {
  checkoutId: string;
  email: string;
  transaction: Transaction;
}

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

    if (accessToken) {
      return accessToken;
    }

    return await this.login(account);
  },

  async createCheckout({ account, checkout }: any) {
    const accessToken = await this.getAccessToken(account);

    const response = await instance.post('/checkout', checkout, {
      headers: {
        'authorization': `Bearer ${accessToken}`,
      }, 
    });

    return response.data;
  },

  async getCheckoutList(account: any): Promise<Checkout[]> {
    const accessToken = await this.getAccessToken(account);

    const response = await instance.get('/checkout', {
      headers: {
        'authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data;
  },

  async getCharges(): Promise<Charge[]> {
    await wait(500);

    return charges;
  },

  async getCheckout(): Promise<Checkout> {
    await wait(1000);
    return checkout;
  },

  async createOrder({ checkoutId, email, transaction }: CreateOrderParams) {
    await wait(1000);
    console.log(checkoutId, email, transaction);
  }
};

export default api;
