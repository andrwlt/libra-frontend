const CONNECTED_ACCOUNT: string = 'libra-connected-account';

export function saveConnectedAccount(data: any): void {
  localStorage.setItem(CONNECTED_ACCOUNT, JSON.stringify(data));
}

export function getConnectedAccount(): any {
  const data = localStorage.getItem(CONNECTED_ACCOUNT);

  return data ? JSON.parse(data) : null;
}

export function removeConnectedAccount(): void {
  localStorage.removeItem(CONNECTED_ACCOUNT);
}
