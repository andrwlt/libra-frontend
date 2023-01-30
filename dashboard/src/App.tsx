import { Routes, Route } from 'react-router-dom';
import Onboarding from 'pages/Onboard';
import Dashboard from 'pages/Dashboard';
import SignIn from 'pages/SignIn';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<SignIn />}></Route>
        <Route path="onboard" element={<Onboarding />} />
        <Route path="checkout/new" element={<Onboarding />} />
        <Route path="/*" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
