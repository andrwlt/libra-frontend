import { createSlice, Reducer, createAction } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from 'app/hooks';
import authAPI from './authAPI';
import { LOGIN_MESSAGE, APP_NAME } from 'config';
import { ConnectExtensionState, ExtensionState, LoginState, AuthPersitState, AuthHookState } from './types';
import { RootState } from 'app/store';
import { setAxiosToken, removeAxiosToken } from 'services/requester';
import type { Extension, Account } from '@atscale/libra-ui';

export interface AuthState extends ExtensionState, ConnectExtensionState, LoginState, AuthPersitState {}

const initialState: AuthState = {
  token: undefined,
  libraConnectedAccount: undefined,
  loginLoading: false,
  loginFailed: undefined,
  loginSuccess: undefined,
  refreshToken: undefined,

  extensions: [],
  getExtensionsLoading: true,
  getExtensionsFailed: undefined,

  connectExtensionLoading: false,
  connectedExtension: undefined,
  connectExtensionFailed: undefined,
};

export const resetStore = createAction('RESET_STORE');

export const login = createAppAsyncThunk(
  'auth/login',
  async (account: Account, { rejectWithValue, getState, dispatch }) => {
    let connectedExtension = getState().auth.connectedExtension;
    if (!connectedExtension) {
      return rejectWithValue('ERROR');
    }

    const { address } = account;

    try {
      const { signature } = await authAPI.getSignature(connectedExtension, address);
      const addressType = 'substrate';

      const response = await authAPI.signIn({
        signature,
        address,
        message: LOGIN_MESSAGE,
        addressType,
      });

      const { accessToken, refreshToken } = response.data;

      setAxiosToken(accessToken);

      return {
        accessToken,
        refreshToken,
        account,
      };
    } catch (err) {
      return rejectWithValue(err);
    } finally {
      setTimeout(() => {
        dispatch(resetLoginState());
      }, 500);
    }
  },
);

export const getExtensions = createAppAsyncThunk('auth/getExtensions', async (_, { rejectWithValue }) => {
  try {
    const extensions: Extension[] = await authAPI.getExtensions();
    return extensions;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const connectExtension = createAppAsyncThunk(
  'auth/connectExtension',
  async (extensionId: string, { rejectWithValue, getState }) => {
    const extensions = getState().auth.extensions;
    const extension = extensions.find((ext) => ext.id === extensionId);

    if (!extension) {
      return rejectWithValue({ message: `Can not connect to ${extensionId}!` });
    }

    try {
      const connection = await extension.instant.enable(APP_NAME);

      const polkadotAccounts = await connection.accounts.get();

      const accounts = polkadotAccounts.map((account: any) => ({
        name: account.name,
        address: account.address,
      }));

      const connectedExtension = {
        ...extension,
        accounts,
        signer: connection.signer,
      };

      return connectedExtension;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout() {
      removeAxiosToken();
      return initialState;
    },

    resetLoginState(state) {
      state.loginFailed = undefined;
      state.loginSuccess = undefined;
    },

    resetConnectedExtension(state) {
      state.connectedExtension = undefined;
      state.connectExtensionFailed = undefined;
    },

    updateToken(state, { payload: { accessToken } }) {
      state.token = accessToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload: { accessToken, account, refreshToken } }) => {
        state.loginLoading = false;
        state.libraConnectedAccount = account;
        state.token = accessToken;
        state.loginSuccess = accessToken;
        state.refreshToken = refreshToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginFailed = action.payload;
      })

      .addCase(getExtensions.pending, (state) => {
        state.getExtensionsLoading = true;
      })
      .addCase(getExtensions.fulfilled, (state, { payload }) => {
        state.getExtensionsLoading = false;
        state.extensions = payload;
      })
      .addCase(getExtensions.rejected, (state, { payload }) => {
        state.getExtensionsLoading = false;
        state.getExtensionsFailed = payload;
      })

      .addCase(connectExtension.pending, (state) => {
        state.connectExtensionLoading = true;
        state.connectedExtension = undefined;
        state.connectExtensionFailed = undefined;
      })
      .addCase(connectExtension.fulfilled, (state, { payload }) => {
        state.connectExtensionLoading = false;
        state.connectedExtension = payload;
        state.connectExtensionFailed = undefined;
      })
      .addCase(connectExtension.rejected, (state, { payload }) => {
        state.connectExtensionLoading = false;
        state.connectExtensionFailed = payload;
      });
  },
});

export const selectExtensionsState = ({
  auth: { extensions, getExtensionsLoading, getExtensionsFailed },
}: RootState): ExtensionState => ({
  extensions,
  getExtensionsLoading,
  getExtensionsFailed,
});

export const selectConnectExtensionState = ({
  auth: { connectedExtension, connectExtensionLoading, connectExtensionFailed },
}: RootState): ConnectExtensionState => ({
  connectedExtension,
  connectExtensionLoading,
  connectExtensionFailed,
});

export const selectLoginState = ({ auth: { loginLoading, loginFailed, loginSuccess } }: RootState): LoginState => {
  return {
    loginLoading,
    loginFailed,
    loginSuccess,
  };
};

export const selectAuthHookState = ({
  auth: { token, loginLoading, libraConnectedAccount },
}: RootState): AuthHookState => {
  return {
    token,
    loginLoading: loginLoading,
    account: libraConnectedAccount,
  };
};

export const { logout, resetLoginState, resetConnectedExtension, updateToken } = authSlice.actions;

export default authSlice.reducer as Reducer<AuthState>;
