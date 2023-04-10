import { ApiPromise, WsProvider } from '@polkadot/api';
import { getSs58AddressByAsset } from './address';

const connections: Record<string, ApiPromise> = {};

export async function createConnection(rpc: string) {
  if (!connections[rpc]) {
    const provider = new WsProvider(rpc);
    connections[rpc] = await ApiPromise.create({ provider });
  }

  return connections[rpc];
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

  const signed = await connection.tx.balances
    .transfer(getSs58AddressByAsset(to, asset), amount)
    .signAsync(getSs58AddressByAsset(account.address, asset));

  return signed.toJSON();
}