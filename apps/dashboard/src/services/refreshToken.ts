import axios from 'axios';
import mem from 'mem';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { logout, resetStore, updateToken } from 'features/auth/authSlice';

export const refreshInstant = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshTokenFn = async (store: ToolkitStore) => {
  try {
    const { refreshToken } = store.getState().auth;

    const { data }: any = await refreshInstant.post('/auth/refresh', {
      refreshToken,
    });

    store.dispatch(updateToken(data));
    return data;
  } catch (error) {
    store.dispatch(logout());
    store.dispatch(resetStore());
    window.location.reload();
  }
};

const maxAge = 20000;

const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge,
});

export default memoizedRefreshToken;
