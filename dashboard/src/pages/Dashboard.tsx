
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from "components/Navbar";
import SideMenu from "components/SideMenu";
import Payments from "pages/Payments";
import Checkout from "pages/Checkout";

const { Content }  = Layout;

export default function Dashboard() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar/>
      <Layout style={{ minHeight: 'calc(100vh - 64px)' }}>
        <SideMenu></SideMenu>
        <Content>
          <Routes>
            <Route path="dashboard" element={<Payments/>}/>
            <Route path="dashboard/payments" element={<Payments/>}/>
            <Route path="dashboard/checkout" element={<Checkout/>}/>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}
