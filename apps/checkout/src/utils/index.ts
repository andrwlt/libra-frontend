export const saveConnectedExtension = (extensionId: string): void => {
  localStorage.setItem(extensionId, 'connected');
};

export const isExtensionConnected = (extensionId?: string): boolean => {
  if (!extensionId) return false;
  const isConnected = localStorage.getItem(extensionId) === 'connected';

  return isConnected;
};

export const getErrorMessage = (err: any) => {
  if (err.message === 'Cancelled') {
    return '';
  }

  if (err.message === 'InsufficientBalance') {
    return 'Oops! It seems your balance is not sufficient to process the payment.';
  }

  return 'Oops! Something went wrong. Please contact help@golibra.xyz to get the supports.';
};

const WALLET_STORAGE_KEY = 'libra-saved-wallet';
const ACCOUNT_STORAGE_KEY = 'libra-saved-account';

export const storageHelper = {
  saveWallet: (walletId: string) => {
    localStorage.setItem(WALLET_STORAGE_KEY, walletId);
  },

  getSavedWallet: () => {
    return localStorage.getItem(WALLET_STORAGE_KEY);
  },

  deleteSavedWallet: () => {
    localStorage.removeItem(WALLET_STORAGE_KEY);
  },

  saveAccount: (accountAddress: string) => {
    localStorage.setItem(ACCOUNT_STORAGE_KEY, accountAddress);
  },

  getSavedAccount: () => {
    return localStorage.getItem(ACCOUNT_STORAGE_KEY);
  },

  deleteSavedAccount: () => {
    localStorage.removeItem(ACCOUNT_STORAGE_KEY);
  },
};
