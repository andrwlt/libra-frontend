import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from 'components/Navbar';
import Payments from 'pages/Payments';
import Checkout from 'pages/Checkout';
import { useAuth } from 'contexts/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const { Content } = Layout;

export default function Dashboard() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [location, isAuthenticated, navigate]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <Content>
        <Routes>
          <Route path="" element={<Payments />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Content>
    </Layout>
  );
}
