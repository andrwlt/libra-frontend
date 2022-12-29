import { Checkout } from "types";

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
  getPayments() {

  },

  async getCurrencies(network: string) {
    await wait(500);

    return [
      {
        id: '0',
        name: 'Dot',
        symbol: 'dot',
        network,
        logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png',
      },
      {
        id: '1',
        name: 'USDT',
        symbol: 'usdt',
        network,
        logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
      }
    ]
  },

  async getCheckout(): Promise<Checkout> {
    await wait(1000);
    return {
      brand: {
        name: 'Andrew'
      },
      payee: '',
      items: [
        {
          name: 'Year-end party at somewhere',
          description: '',
          price: 100,
          images: [
            'https://picsum.photos/300/400.webp',
          ],
        }
      ],
      amount: 100,
      asset: 'dot'
    }
  },

  async createOrder({ checkoutId, email, transaction }: CreateOrderParams) {
    await wait(1000);
    console.log(checkoutId, email, transaction);
  }
};

export default api;
