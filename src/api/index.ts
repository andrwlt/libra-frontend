import { Checkout } from "types";
import { charges, checkout } from './fixtures';

import { Charge } from "types";

const wait = (time: number) => new Promise((resolve) => {
  setTimeout(resolve, time);
});

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
  async getCharges(): Promise<Charge[]> {
    await wait(500);

    return charges;
  },

  async getCheckout(): Promise<Checkout> {
    await wait(1000);
    return checkout;
  },

  async getCheckoutList(): Promise<Checkout[]> {
    await wait(1000);

    return Array.from(Array(10).keys()).map(() => checkout);
  },

  async createOrder({ checkoutId, email, transaction }: CreateOrderParams) {
    await wait(1000);
    console.log(checkoutId, email, transaction);
  }
};

export default api;
