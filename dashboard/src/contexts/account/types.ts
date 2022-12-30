export interface Account {
  address: string;
  name: string;
  singer?: any;
}

export interface AccountContextInterface {
  account: Account | null;
  setAccount: Function;
}