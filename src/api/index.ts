const wait = (time: number) => new Promise((resolve) => {
  setTimeout(resolve, time);
});

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
      },
      {
        id: '1',
        name: 'USDT',
        symbol: 'usdt',
      }
    ]
  },

  async getCheckoutData() {
    await wait(1000);
    return {
      branding: {
        name: 'John'
      },
      items: [
        {
          title: 'Awesome digital product made by John',
          quantity: 1,
          price: 100,
          currency: 'DOT'
        }
      ],
      redirect_url: 'https://golibra.xyz/thankyou',
    }
  }
};

export default api;
