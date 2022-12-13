import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Onboarding from './pages/onboarding';
import CheckoutPage from './pages/Checkout';
import { Layout } from 'antd';
import './App.css';

const { Header, Footer, Content }  = Layout;

function App() {
  return (
    <div className="App">
      <Header>
        <Navbar/>
      </Header>

      <Routes>
        <Route path="/" element={<Onboarding/>}/>
        <Route path="/checkout" element={<CheckoutPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
