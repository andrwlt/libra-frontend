export interface Network {
  id: string;
  name: string;
  rpc: string;
  gas: Currency;
}

export interface PreUploadImage {
  name: string;
  type: 'image/svg+xml' | 'image/jpeg' | 'image/png';
  content: string; 
}
export interface Branding {
  name: string;
  logo?: string | PreUploadImage;
  email?: string;
  wallet?: string;
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
  image: string | PreUploadImage;
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


