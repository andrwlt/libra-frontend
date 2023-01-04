import { ApiPromise, WsProvider } from "@polkadot/api";

const connections: Record<string, ApiPromise> = {

};

export async function createConnection(rpc: string) {
  if(!connections[rpc]) {
    const provider = new WsProvider(rpc);
    connections[rpc] =  await ApiPromise.create({ provider })
  }

  return connections[rpc];
}

export async function getBalances(rpc: string, addresses: string[]): Promise<number[]> {
  const connection = await createConnection(rpc);

  return new Promise((resolve) => {
    connection.query.balances.account.multi(addresses, (balances) => {
      const freeBalances = balances.map(([nonce, { free }]: any) => free);
      resolve(freeBalances);
    });
  });
}

export async function createTransferTx(rpc: string, account: any, to: string, amount: number) {
  const connection = await createConnection(rpc);

  connection.setSigner(account.signer);

  const signed = await (await connection.tx.balances.transfer(to, amount).signAsync(account.address)).toHuman();

  return signed;
}
