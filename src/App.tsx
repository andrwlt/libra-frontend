import { Routes, Route } from 'react-router-dom';
import Onboarding from './pages/onboarding';
import CheckoutPage from './pages/Checkout';
import Dashboard from './pages/dashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="checkout" element={<CheckoutPage/>}/>
        <Route path="onboard" element={<Onboarding/>}/>
        <Route path="/*" element={<Dashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
