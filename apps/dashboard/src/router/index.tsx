import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import SignIn from 'features/auth/SignIn';
import PATHS from './paths';
import Payments from 'features/payment/Payments';
import DashboardLayout from 'components/AppLayout';
import Dashboard from 'features/dashboard/Dashboard';
import Checkouts from 'features/checkout/Checkouts';
import Checkout from 'features/checkout/Checkout';
import Onboarding from 'features/checkout/Onboarding';

import Developers from 'components/Developers/Developers';
import Webhooks from 'features/webhook/Webhooks';
import ApiKeys from 'features/apiKey/apiKeys';

import { Checkout as CheckoutPreview } from '@atscale/libra-ui';

const PreviewPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#fff' }}>
      <CheckoutPreview
        loading={loading}
        previewMode={false}
        previewingCheckout={{
          branding: {
            logo: 'https://files.libra.atscale.xyz/file_01GX8W9Y5BGQXP3Y2G5SABGYM6',
            name: 'Hollywood',
          },
          item: {
            name: 'Gone with the win',
            description: 'Just for test',
            price: 1000,
            image: 'https://files.libra.atscale.xyz/file_01GX8W9Y5BGQXP3Y2G5SABGYM6',
          },
          asset: 'wnd',
        }}
      />
    </div>
  );
};

const routes: RouteObject[] = [
  { path: PATHS.auth.signIn, element: <SignIn /> },
  { path: PATHS.onboard, element: <Onboarding /> },
  {
    path: '/preview',
    element: <PreviewPage />,
  },
  {
    path: PATHS.dashboard,
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: PATHS.payment.root,
        element: <Payments />,
      },
      {
        path: PATHS.checkout.root,
        element: <Checkouts />,
      },
      {
        path: PATHS.checkout.create,
        element: <Checkout />,
      },
      {
        path: PATHS.checkout.edit,
        element: <Checkout />,
      },

      {
        path: PATHS.developers.root,
        element: <Developers />,
        children: [
          {
            path: PATHS.developers.webhook.root,
            element: <Webhooks />,
          },

          {
            path: PATHS.developers.apiKey.root,
            element: <ApiKeys />,
          },
        ],
      },
    ],
  },

  {
    path: '*',
    element: <Navigate to={PATHS.dashboard} />,
  },
];

export default routes;
