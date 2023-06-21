import { createTransferTx } from 'utils/substrate';
import type { Payment } from '@atscale/libra-ui';
import { getNetwork, getSs58AddressByAsset } from '@atscale/libra-ui';

const service = {
  async pay(payment: Payment, account: any, email: string) {
    const { payee, amount, asset } = payment;

    try {
      const network = getNetwork(asset);
      const tx = await createTransferTx(network.rpc, account, payee, amount, asset);

      const model = {
        from: getSs58AddressByAsset(account.address, asset),
        tx,
        receiptEmail: email,
        amount,
      };

      const response = await fetch(`${window.location.href}/pay`, {
        body: JSON.stringify(model),
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error(response.statusText);
      }
    } catch (err) {
      throw err;
    }
  },
};

export default service;
