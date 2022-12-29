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
  brand: Brand,
  payee: Address;
  amount: Balance;
  asset: string;
  items: LineItem[];
}
