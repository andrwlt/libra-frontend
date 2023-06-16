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
import ApiKeys from 'features/webhook/ApiKeys';
import CheckoutDetails from 'features/checkout/CheckoutDetails';

const routes: RouteObject[] = [
  { path: PATHS.auth.signIn, element: <SignIn /> },
  { path: PATHS.onboard, element: <Onboarding /> },
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
        path: PATHS.checkout.details,
        element: <CheckoutDetails />,
      },

      {
        path: PATHS.developers.root,
        element: <Developers />,
        children: [
          {
            index: true,
            element: <Webhooks />,
          },

          {
            path: PATHS.developers.apiKeys,
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
