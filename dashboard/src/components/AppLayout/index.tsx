import React from 'react';
import { Layout } from 'antd';
import Navbar from 'components/AppLayout/Navbar';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'features/auth/authHooks';
import { isTokenExpired } from 'utils/auth';
import PATHS from 'router/paths';
import { setAxiosToken } from 'services/requester';

const DashboardLayout = () => {
  const { token } = useAuth();

  if (!token || isTokenExpired(token)) {
    return <Navigate to={PATHS.auth.signIn} />;
  } else {
    setAxiosToken(token);
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default DashboardLayout;
