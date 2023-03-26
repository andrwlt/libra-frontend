import { createSlice, Reducer } from '@reduxjs/toolkit';
import { WebhookState } from './types';

const initialState = {};

export const authSlice = createSlice({
  name: 'apiKey',
  initialState,
  reducers: {
    resetWebhook() {
      return initialState;
    },
  },
  extraReducers: () => {},
});

export default authSlice.reducer as Reducer<WebhookState>;
