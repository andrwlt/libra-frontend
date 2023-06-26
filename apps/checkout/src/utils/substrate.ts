import { ApiPromise, WsProvider } from '@polkadot/api';
import JSBI from 'jsbi';
import { Asset, getSs58AddressByAsset, getAssetNetworkConfig } from '@atscale/libra-ui';

const connections: Record<string, ApiPromise> = {};

export async function createConnection(rpc: string) {
  if (!connections[rpc]) {
    const provider = new WsProvider(rpc);
    connections[rpc] = await ApiPromise.create({ provider });
  }

  return connections[rpc];
}

export async function getBalance(rpc: string, account: string, asset: Asset) {
  const connection = await createConnection(rpc);
  const raw = await connection.query.system.account(getSs58AddressByAsset(account, asset));
  const { data } = raw.toJSON() as any;

  return data.free;
}

const getPaymentInfo = async (tx: any, account: any, asset: any) => {
  try {
    const info = await tx.paymentInfo(getSs58AddressByAsset(account.address, asset));
    return info;
  } catch (_) {
    return null;
  }
};

const buildTx = (connection: ApiPromise, asset: Asset, to: string, amount: number) => {
  const { config } = getAssetNetworkConfig(asset);

  const ss58Address = getSs58AddressByAsset(to, asset);

  if (config.isNative) {
    return connection.tx.balances.transferKeepAlive(ss58Address, amount);
  }

  return connection.tx.assets.transferKeepAlive(config.tokenId, ss58Address, amount);
};

export async function createTransferTx(
  rpc: string,
  account: any,
  to: string,
  amount: number,
  asset: Asset,
): Promise<string> {
  const connection = await createConnection(rpc);
  connection.setSigner(account.signer);

  const tx = buildTx(connection, asset, to, amount);

  const existentialDeposit = connection.consts.balances.existentialDeposit.toString();

  const [balance, paymentInfo] = await Promise.all([
    getBalance(rpc, account.address, asset),
    getPaymentInfo(tx, account, asset),
  ]);

  let requiredBalance = JSBI.add(JSBI.BigInt(amount), JSBI.BigInt(existentialDeposit));
  if (paymentInfo) {
    requiredBalance = JSBI.add(JSBI.BigInt(paymentInfo.partialFee), requiredBalance);
  }

  if (JSBI.LT(JSBI.BigInt(balance), requiredBalance)) {
    throw Error('InsufficientBalance');
  }

  const signed = await tx.signAsync(getSs58AddressByAsset(account.address, asset));

  return signed.toJSON();
}
