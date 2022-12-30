export type Address = string;
export type Balance = number;
export type Asset = string;

export interface PreUploadImage {
  name: string;
  type: 'image/svg+xml' | 'image/jpeg' | 'image/png';
  content: string; 
}
export interface Brand {
  name?: string;
  logo?: string | PreUploadImage;
}

export interface LineItem {
  name: string;
  description?: string;
  images: string[] | PreUploadImage[];
  price: Balance;
}

export interface Checkout {
  id: string;
  brand: Brand,
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