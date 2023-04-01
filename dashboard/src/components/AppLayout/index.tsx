import React from 'react';
import { Layout } from 'antd';
import Header from 'components/AppLayout/Header';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'features/auth/authHooks';
import { isTokenExpired } from 'utils/auth';
import PATHS from 'router/paths';
import { setAxiosToken } from 'services/requester';
import { Container, InnerContainer } from './Styled';

const DashboardLayout = () => {
  const { token } = useAuth();

  // if (!token || isTokenExpired(token)) {
  //   return <Navigate to={PATHS.auth.signIn} />;
  // } else {
  //   setAxiosToken(token);
  // }

  return (
    <Layout style={{ minHeight: '100vh', background: 'rgb(250, 250, 250)' }}>
      <Header />
      <Layout.Content>
        <Container>
          <InnerContainer style={{ margin: '0 auto' }}>
            <Outlet />
          </InnerContainer>
        </Container>
      </Layout.Content>
    </Layout>
  );
};

export default DashboardLayout;
