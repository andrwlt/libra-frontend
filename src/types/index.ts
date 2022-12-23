export interface Network {
  id: string;
  name: string;
  rpc: string;
  gas: Currency;
}
export interface Branding {
  name: string;
  logo?: string;
  email?: string;
}
export interface Currency {
  id: string;
  network: string;
  symbol: string;
  logo?: string;
}

export interface LineItem {
  title: string;
  description?: string;
  image: string;
  price?: number;
  currency?: Currency;
}

export interface Checkout {
  network: Network;
  branding: Branding;
  items: LineItem[];
  payee: string;
  total: number;
  currency: Currency;
}


