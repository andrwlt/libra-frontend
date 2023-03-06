const PATHS = {
  // PUBLIC PATHS
  auth: {
    signIn: '/login',
  },
  onboard: '/onboard',

  // PRIVATE PATHS
  dashboard: '/',
  payment: {
    root: '/payments',
  },

  checkout: {
    root: '/checkouts',
    create: '/checkout/create',
    edit: '/checkout/:id/edit',
  },
};

export default PATHS;
