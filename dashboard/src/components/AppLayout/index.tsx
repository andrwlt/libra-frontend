import React from 'react';
import { Layout } from 'antd';
import Header from 'components/AppLayout/Header';
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
    <Layout style={{ minHeight: '100vh', background: ' #f0f2f5' }}>
      <Header />
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default DashboardLayout;
