import { Routes, Route } from 'react-router-dom';
import Onboarding from 'pages/Onboard';
import Dashboard from 'pages/Dashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="onboard" element={<Onboarding/>}/>
        <Route path="/*" element={<Dashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;