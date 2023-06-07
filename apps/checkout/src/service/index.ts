import { createTransferTx } from 'utils/substrate';
import { getSs58AddressByAsset } from 'utils/address';
import type { Payment } from '@atscale/libra-ui';
import { getNetwork } from '@atscale/libra-ui';
import { createEvmTx } from 'utils/evm';

const service = {
  async pay(payment: Payment, account: any, email: string) {
    const { payee, amount, asset, productName } = payment;
    const network = getNetwork(asset);

    try {
      const tx =
        network.type === 'substrate'
          ? await createTransferTx(network.rpc, account, payee, amount, asset)
          : await createEvmTx(payee, amount);

      console.log('tx', tx);

      // const response = await fetch(`${window.location.href}/pay`, {
      //   body: JSON.stringify({
      //     from: getSs58AddressByAsset(account.address, asset),
      //     to: getSs58AddressByAsset(payee, asset),
      //     description: `${email} + ${productName}`,
      //     amount,
      //     asset,
      //     tx,
      //     email,
      //   }),
      //   method: 'post',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });

      // if (response.status !== 200 && response.status !== 201) {
      //   throw new Error(response.statusText);
      // }
    } catch (err) {
      throw err;
    }
  },
};

export default service;
