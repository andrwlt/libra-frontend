import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './state/store';
import {
  BrowserRouter,
} from "react-router-dom";
import App from './App';
import { ConfigProvider } from 'antd';
import { Providers } from 'contexts';
import theme from './theme';
import reportWebVitals from './reportWebVitals';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ConfigProvider theme={theme}>
          <Providers>
            <App />
          </Providers>
        </ConfigProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
