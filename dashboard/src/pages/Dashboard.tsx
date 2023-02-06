import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from 'components/Navbar';
import Payments from 'pages/Payments';
import ListCheckout from 'pages/Checkout/List';
import CheckoutConfig from 'pages/Checkout/Configuration';
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
          <Route path="/" element={<Payments />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/checkout" element={<ListCheckout />} />
          <Route path="/checkout/new" element={<CheckoutConfig/>} />
          <Route path="/checkout/:id/edit" element={<CheckoutConfig/>} />
        </Routes>
      </Content>
    </Layout>
  );
}
