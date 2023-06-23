import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  PersistConfig,
} from 'redux-persist';
import authReducer, { AuthState } from 'features/auth/authSlice';
import checkoutReducer from 'features/checkout/checkoutSlice';
import paymentReducer from 'features/payment/paymentSlice';
import webhookReducer from 'features/webhook/webhookSlice';
import apiKeyReducer from 'features/apiKey/apiKeySlice';
import { setupInstantsInterceptor } from 'services/requester';

const authPersistConfig: PersistConfig<AuthState> = {
  key: 'auth',
  storage: storage,
  whitelist: ['token', 'libraConnectedAccount', 'refreshToken'],
};

const store = configureStore({
  reducer: {
    auth: persistReducer<AuthState, any>(authPersistConfig, authReducer),
    checkout: checkoutReducer,
    payment: paymentReducer,
    webhook: webhookReducer,
    apiKey: apiKeyReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          'auth/getExtensions/fulfilled',
          'auth/connectExtension/fulfilled',
        ],
        ignoredPaths: ['auth.extensions', 'auth.connectedExtension'],
      },
    }),
});

setupInstantsInterceptor(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

const persistor = persistStore(store);

export { store, persistor };
