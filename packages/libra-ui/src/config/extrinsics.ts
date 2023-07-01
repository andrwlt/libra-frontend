import { SubstrateExtrinsic } from 'app/types';

export const SubstrateNativeTokenTransfer: SubstrateExtrinsic = {
  module: 'balances',
  method: 'transferKeepAlive',
  params: [
    {
      name: 'dest',
      required: true,
    },
    {
      name: 'amount',
      required: true,
    },
  ],
};

export const StatemintAssetTransfer: SubstrateExtrinsic = {
  module: 'assets',
  method: 'transferKeepAlive',
  params: [
    {
      name: 'id',
      required: true,
    },
    {
      name: 'target',
      required: true,
    },
    {
      name: 'amount',
      required: true,
    },
  ],
};
