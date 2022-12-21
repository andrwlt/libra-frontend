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

  getProduct() {

  },

  createProduct() {

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

  async getCheckoutData() {
    await wait(1000);
    return {
      branding: {
        name: 'John'
      },
      wallet_address: "",
      items: [
        {
          title: 'Year-end party at somewhere',
          description: '',
          quantity: 1,
          price: 100,
          currency: {
            id: '1',
            network: 'Polkadot',
            symbol: 'DOT',
            logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png',
          },
          image: 'https://picsum.photos/300/300.webp',
        }
      ],
      redirect_url: 'https://golibra.xyz/thankyou',
    }
  },

  async createOrder({ checkoutId, email, transaction }: CreateOrderParams) {
    await wait(1000);
    console.log(checkoutId, email, transaction);
  }
};

export default api;
