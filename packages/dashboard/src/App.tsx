import { NotifyContext } from 'app/hooks';
import { message } from 'antd';
import routes from 'router';
import { useRoutes } from 'react-router-dom';
import { setAxiosToken } from 'services/requester';
import { useAuth } from 'features/auth/authHooks';

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const element = useRoutes(routes);
  const { token } = useAuth();

  if (token) {
    setAxiosToken(token);
  }

  return (
    <div className="app">
      {contextHolder}
      <NotifyContext.Provider value={messageApi}>{element}</NotifyContext.Provider>
    </div>
  );
}

export default App;
