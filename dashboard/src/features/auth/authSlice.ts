import { createSlice, Reducer, createAction } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from 'app/hooks';
import authAPI from './authAPI';
import { LOGIN_MESSAGE, APP_NAME, EXTENSION_IDS } from 'config';
import {
  ConnectExtensionState,
  ExtensionState,
  LoginState,
  AuthPersitState,
  AuthHookState,
  AccountType,
} from './types';
import { RootState } from 'app/store';
import { setAxiosToken, removeAxiosToken } from 'services/requester';

export interface AuthState extends ExtensionState, ConnectExtensionState, LoginState, AuthPersitState {}

const initialState: AuthState = {
  accountDictionary: {},
  libraConnectedAccount: undefined,
  loginLoading: false,
  loginFailed: undefined,
  loginSuccess: undefined,

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
  async (account: AccountType, { rejectWithValue, getState, dispatch }) => {
    if (!account) {
      account = getState().auth.libraConnectedAccount;
    }

    let connectedExtension = getState().auth.connectedExtension;
    const { address } = account;

    try {
      if (!connectedExtension) {
        await dispatch(connectExtension(EXTENSION_IDS.POLKADOT_JS));
        connectedExtension = getState().auth.connectedExtension;
      }

      if (connectedExtension) {
        const { signature } = await authAPI.getSignater(connectedExtension, address);
        const response = await authAPI.signIn({
          signature,
          address,
          message: LOGIN_MESSAGE,
        });

        return {
          accessToken: response.data.accessToken,
          account,
        };
      }
      // JUST FOR TYPE CHECKING - MUST NEVER HAPPEN
      else {
        return rejectWithValue({ message: `Have no connected extension!` });
      }
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
    const extensions = await authAPI.getExtensions();
    return extensions;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const connectExtension = createAppAsyncThunk(
  'auth/connectExtension',
  async (extensionId: string, { rejectWithValue, getState, dispatch }) => {
    let extensions = getState().auth.extensions;

    if (!extensions.length) {
      await dispatch(getExtensions());
      extensions = getState().auth.extensions;
    }

    const extension = extensions.find((ext) => ext.id === extensionId);

    if (!extension) {
      return rejectWithValue({ message: `Can not connect to ${extensionId}!` });
    }

    try {
      const connection = await extension.enable(APP_NAME);
      const accounts = await connection.accounts.get();

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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload: { accessToken, account } }) => {
        state.loginLoading = false;
        state.libraConnectedAccount = account;
        state.accountDictionary[account.address] = accessToken;
        state.loginSuccess = accessToken;
        setAxiosToken(accessToken);
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
      })
      .addCase(connectExtension.fulfilled, (state, { payload }) => {
        state.connectExtensionLoading = false;
        state.connectedExtension = payload;
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

export const selectAuthHookState = ({ auth }: RootState): AuthHookState => {
  const token = auth.accountDictionary[auth.libraConnectedAccount?.address];

  return {
    token,
    loginLoading: auth.loginLoading,
    account: auth.libraConnectedAccount,
  };
};

export const { logout, resetLoginState, resetConnectedExtension } = authSlice.actions;

export default authSlice.reducer as Reducer<AuthState>;
