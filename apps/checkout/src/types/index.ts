export type Address = string;
export type Balance = number;
export type Asset = string;

export interface AssetMetadata {
  symbol: string;
  decimals: number;
  logo: string;
  network: {
    name: string;
    rpc: string;
  }
}
export interface Brand {
  name?: string;
  logo?: string;
}

export interface LineItem {
  name: string;
  description?: string;
  image: string;
  price: Balance;
}

export interface Checkout {
  id: string;
  branding?: Brand,
  payee: Address;
  asset: string;
  item: LineItem;
}

export interface Charge  {
  id: string;
  object: 'charge';
  from: Address;
  to:  Address;
  amount: Balance;
  asset: string;
  description: string;
  metadata: any;
  hash: string;
  created: string;
  status: 'succeeded' | 'pending' | 'failed';
}