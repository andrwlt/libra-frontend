export interface AssetMetadata {
  decimals: number;
  symbol: string;
  logo: string;
}
export interface PreUploadImage {
  name: string;
  type: 'image/svg+xml' | 'image/jpeg' | 'image/png';
  content: string;
}
