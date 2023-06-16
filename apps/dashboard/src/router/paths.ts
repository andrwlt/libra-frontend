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
    create: '/checkouts/create',
    edit: '/checkouts/:id/edit',
    details: '/checkouts/:id/details',
  },

  developers: {
    root: '/developers',
    apiKeys: '/developers/apiKeys',
  },
};

export default PATHS;
