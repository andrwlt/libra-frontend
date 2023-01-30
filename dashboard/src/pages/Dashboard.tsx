import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from 'components/Navbar';
import Payments from 'pages/Payments';
import Checkout from 'pages/Checkout';
import { useAccount } from 'contexts/account';
import { Navigate } from 'react-router-dom';


const { Content } = Layout;

export default function Dashboard() {
  const { account } = useAccount();

  if (!account) {
    return <Navigate to="/login" replace/>;
  }

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
