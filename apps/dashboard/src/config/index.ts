export * from './extensions';
export * from './network';

export const APP_NAME = 'Libra Checkout';
export const CONNECTED_ACCOUNT = 'libra-connected-account';

export const LOGIN_MESSAGE = 'libra-checkout-login';
export const DEFAULT_LIMIT = 10;

export const PAYMENT_STATUS = {
  SUCCEEDED: 'succeeded',
  PENDING: 'pending',
  FAILED: 'failed',
};

export const NULL_VALUE = 'null';

const size = {
  lg: 1200,
  aboveLg: 1300,
  xl: 1680,
};

const device = {
  aboveLg: `(max-width: ${size.aboveLg}px)`,
  lg: `(max-width: ${size.lg}px)`,
};

export const breakpoints = {
  size,
  device,
  screen: {
    xl: 'XL',
    lg: 'LG',
  },
};

export const AFTER_PAYMENT_TYPE = {
  MESSAGE: 'message',
  REDIRECT: 'redirect',
};

export const initRedirectAfterPayment = {
  type: AFTER_PAYMENT_TYPE.REDIRECT,
  config: {
    url: '',
  },
};

export const initMessageAfterPayment = {
  type: AFTER_PAYMENT_TYPE.MESSAGE,
  config: {
    message: '',
  },
};
