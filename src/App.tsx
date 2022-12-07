import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Onboarding from './pages/onboarding';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Onboarding/>}/>
      </Routes>
    </div>
  );
}

export default App;
