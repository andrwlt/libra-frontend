
import Navbar from "../../components/Navbar";
import { Layout } from 'antd';
import { Routes, Route } from 'react-router-dom';
import Payments from "pages/Dashboard/Payments";
import SideMenu from "../../components/SideMenu";

const { Content }  = Layout;

export default function Dashboard() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar/>
      <Layout style={{ minHeight: 'calc(100vh - 64px)' }}>
        <SideMenu></SideMenu>
        <Content>
          <Routes>
            <Route path="payments" element={<Payments/>}/>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}
