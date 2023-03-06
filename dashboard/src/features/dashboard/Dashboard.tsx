import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PATHS from 'router/paths';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(PATHS.payment.root);
  }, [navigate]);
  return <div></div>;
}

export default Dashboard;
