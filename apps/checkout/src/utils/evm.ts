import { Asset, Extension, getNetwork } from '@atscale/libra-ui';
import { POLYGON_CHAIN_ID } from 'config';
import { BrowserProvider, ethers, parseEther } from 'ethers';

export const connectPolygonNetwork = async (extension: Extension, asset: Asset) => {
  try {
    await extension.instant.request({
      method: 'wallet_switchEthereumChain',
      params: [
        {
          chainId: POLYGON_CHAIN_ID,
        },
      ],
    });
  } catch (switchError: any) {
    //This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      const network = getNetwork(asset);
      try {
        await extension.instant.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: POLYGON_CHAIN_ID,
              rpcUrls: [network.rpc],
              chainName: network.name,
            },
          ],
        });
      } catch (addError: any) {
        throw Error(addError);
      }
    }
  }
};

export const createEvmTx = async (to: string, amount: number) => {
  const provider = new BrowserProvider((window as any).ethereum);

  try {
    const signer = await provider.getSigner();

    const balance = await signer.provider.getBalance('ethers.eth');

    const tx = await signer.signTransaction({
      to,
      nonce: 1,
      gasLimit: 1000,
      gasPrice: 1,
      maxPriorityFeePerGas: 10,
      maxFeePerGas: 10,
      value: parseEther(amount.toString()),
      chainId: POLYGON_CHAIN_ID,
    });

    return tx;
  } catch (err: any) {
    console.log('err', err);
    throw Error(err);
  }
};
