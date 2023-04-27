import { ApiPromise, WsProvider } from '@polkadot/api';
import { getSs58AddressByAsset } from './address';
import JSBI from 'jsbi';
import { ASSET_METADATA } from 'config';

const connections: Record<string, ApiPromise> = {};

export async function createConnection(rpc: string) {
  if (!connections[rpc]) {
    const provider = new WsProvider(rpc);
    connections[rpc] = await ApiPromise.create({ provider });
  }

  return connections[rpc];
}

export async function getBalance(rpc: string, account: string, asset: string) {
  const connection = await createConnection(rpc);
  const raw = await connection.query.system.account(getSs58AddressByAsset(account, asset));
  const { data } = raw.toJSON() as any;

  return data.free;
}

export async function createTransferTx(
  rpc: string,
  account: any,
  to: string,
  amount: number,
  asset: string,
): Promise<string> {
  const connection = await createConnection(rpc);
  connection.setSigner(account.signer);
  const tx = connection.tx.balances.transferKeepAlive(getSs58AddressByAsset(to, asset), amount);
  const existentialDeposit = connection.consts.balances.existentialDeposit.toString();
  const [balance, paymentInfo] = await Promise.all([
    getBalance(rpc, account.address, asset),
    tx.paymentInfo(getSs58AddressByAsset(account.address, asset)),
  ]);
  let requiredBalance = JSBI.add(JSBI.BigInt(amount), JSBI.BigInt(existentialDeposit));
  requiredBalance = JSBI.add(JSBI.BigInt(paymentInfo.partialFee), requiredBalance);
  if (JSBI.LT(JSBI.BigInt(balance), requiredBalance)) {
    throw Error('InsufficientBalance');
  }

  const signed = await tx.signAsync(getSs58AddressByAsset(account.address, asset));

  return signed.toJSON();
}
