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
  },

  developer: {
    webhook: {
      root: '/developer/webhooks',
      create: '/developer/webhooks/create',
      edit: '/developer/webhooks/:id/edit',
    },
    apiKey: {
      root: '/developer/apiKeys',
    },
  },
};

export default PATHS;
