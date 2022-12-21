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
  items: LineItem[];
  network: string;
  payee: string;
  total: number;
  currency: Currency;
}

export interface Network {
  id: string;
  name: string;
  rpc: string;
}

interface User {
  uid: string;
  email?: string;
  wallet: {
    address: string;
  },
  created_at: number;
  updated_at: number;
}