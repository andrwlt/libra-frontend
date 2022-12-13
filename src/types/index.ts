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
  image: string;
  price?: number;
  currency?: Currency;
}

export interface Checkout {
  items: LineItem[];
}

export interface Cart {
  items: LineItem[];
}