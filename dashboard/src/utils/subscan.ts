const urls: Record<string, string> = {
  wnd: 'https://westend.subscan.io',
  dot: 'https://polkadot.subscan.io',
  ksm: 'https://kusama.subscan.io',
};

const getBaseUrl = (asset: string) => {
  if (urls[asset]) {
    return urls[asset];
  }

  throw Error(`Asset ${asset} is unsupported.`);
};

export default {
  getAccountUrl(asset: string, address: string) {
    const baseUrl = getBaseUrl(asset);

    return `${baseUrl}/account/${address}`;
  },

  getTxUrl(asset: string, hash: string) {
    const baseUrl = getBaseUrl(asset);

    return `${baseUrl}/extrinsic/${hash}`;
  },
};
