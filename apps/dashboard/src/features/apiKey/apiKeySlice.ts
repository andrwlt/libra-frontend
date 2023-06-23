import { createSlice, Reducer } from '@reduxjs/toolkit';
import {
  APIKey,
  APIKeyState,
  BaseAPIKey,
  CreateAPIKeyState,
  DeleteAPIKeyState,
  GetAPIKeysState,
  UpdateAPIKeyState,
} from './types';
import { createAppAsyncThunk } from 'app/hooks';
import apiKeyAPI from './APIKeyAPI';
import { RootState } from 'app/store';
import { resetStore } from 'features/auth/authSlice';
import pagingHelper from 'utils/pagingHelper';
import { GetListPayload } from 'types';

export const getAPIKeys = createAppAsyncThunk(
  'apiKey/getAPIKeys',
  async (searchParams: GetListPayload, { rejectWithValue }) => {
    try {
      const params = { request: apiKeyAPI.getAPIKeys, searchParams };
      return await pagingHelper.fetchData<APIKey>(params);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const createAPIKey = createAppAsyncThunk(
  'apiKey/createAPIKey',
  async (apiKey: BaseAPIKey, { rejectWithValue }) => {
    try {
      const response = await apiKeyAPI.createAPIKey(apiKey);

      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const updateAPIKey = createAppAsyncThunk('apiKey/updateAPIKey', async (apiKey: APIKey, { rejectWithValue }) => {
  try {
    const response = await apiKeyAPI.updateAPIKey(apiKey);
    return response.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const deleteAPIKey = createAppAsyncThunk(
  'apiKey/deleteAPIKey',
  async (deletedId: string, { rejectWithValue }) => {
    try {
      await apiKeyAPI.deleteAPIKey(deletedId);
      return deletedId;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const initialState: APIKeyState = {
  apiKeys: [],
  getAPIKeysLoading: false,
  getAPIKeysFailed: undefined,
  apiKeysPaging: {
    hasNextPage: false,
    hasPrevPage: false,
  },
  isFirstLoad: true,

  createAPIKeyLoading: false,
  createAPIKeySuccess: undefined,
  createAPIKeyFailed: undefined,

  updateAPIKeyLoading: false,
  updateAPIKeySuccess: undefined,
  updateAPIKeyFailed: undefined,

  deleteAPIKeyLoading: false,
  deleteAPIKeySuccess: undefined,
  deleteAPIKeyFailed: undefined,
};

export const apiKeySlice = createSlice({
  name: 'apiKey',
  initialState,
  reducers: {
    resetAPIKey(state: any) {
      Object.entries(initialState).forEach(([key, initVal]) => {
        if (key !== 'isFirstLoad') {
          state[key] = initVal;
        }
      });
    },

    resetFirstLoad(state) {
      state.isFirstLoad = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAPIKeys.pending, (state) => {
        state.getAPIKeysLoading = true;
      })
      .addCase(getAPIKeys.fulfilled, (state, { payload }) => {
        state.getAPIKeysLoading = false;
        state.apiKeys = payload.data;
        state.apiKeysPaging = payload.paging;
        state.isFirstLoad = false;
      })
      .addCase(getAPIKeys.rejected, (state, { payload }) => {
        state.getAPIKeysLoading = false;
        state.getAPIKeysFailed = payload;
        state.isFirstLoad = false;
      })

      .addCase(createAPIKey.pending, (state) => {
        state.createAPIKeyLoading = true;
      })
      .addCase(createAPIKey.fulfilled, (state, { payload }) => {
        state.createAPIKeyLoading = false;
        state.createAPIKeySuccess = payload;
      })
      .addCase(createAPIKey.rejected, (state, { payload }) => {
        state.createAPIKeyLoading = false;
        state.createAPIKeyFailed = payload;
      })

      .addCase(updateAPIKey.pending, (state) => {
        state.updateAPIKeyLoading = true;
      })
      .addCase(updateAPIKey.fulfilled, (state, { payload }) => {
        state.updateAPIKeyLoading = false;
        state.updateAPIKeySuccess = payload;
        state.apiKeys = state.apiKeys.map((apiKey) => (apiKey.id === payload.id ? payload : apiKey));
      })
      .addCase(updateAPIKey.rejected, (state, { payload }) => {
        state.updateAPIKeyLoading = false;
        state.updateAPIKeyFailed = payload;
      })

      .addCase(deleteAPIKey.pending, (state) => {
        state.deleteAPIKeyLoading = true;
      })
      .addCase(deleteAPIKey.fulfilled, (state, { payload: deletedId }) => {
        state.deleteAPIKeyLoading = false;
        state.deleteAPIKeySuccess = deletedId;
      })
      .addCase(deleteAPIKey.rejected, (state, { payload }) => {
        state.deleteAPIKeyLoading = false;
        state.deleteAPIKeyFailed = payload;
      })

      .addCase(resetStore, () => {
        return initialState;
      });
  },
});

export const selectAPIKeyListState = ({
  apiKey: { apiKeys, getAPIKeysLoading, getAPIKeysFailed, apiKeysPaging },
}: RootState): GetAPIKeysState => ({
  apiKeys,
  getAPIKeysLoading,
  getAPIKeysFailed,
  apiKeysPaging,
});

export const selectCreateAPIKeyState = ({
  apiKey: { createAPIKeyFailed, createAPIKeyLoading, createAPIKeySuccess },
}: RootState): CreateAPIKeyState => ({
  createAPIKeyFailed,
  createAPIKeyLoading,
  createAPIKeySuccess,
});

export const selectUpdateAPIKeyState = ({
  apiKey: { updateAPIKeyFailed, updateAPIKeyLoading, updateAPIKeySuccess },
}: RootState): UpdateAPIKeyState => ({
  updateAPIKeyFailed,
  updateAPIKeyLoading,
  updateAPIKeySuccess,
});

export const selectDeleteAPIKeyState = ({
  apiKey: { deleteAPIKeyFailed, deleteAPIKeyLoading, deleteAPIKeySuccess },
}: RootState): DeleteAPIKeyState => ({
  deleteAPIKeyFailed,
  deleteAPIKeyLoading,
  deleteAPIKeySuccess,
});

export const selectFirstLoadState = ({ apiKey: { isFirstLoad } }: RootState) => isFirstLoad;

export const { resetAPIKey, resetFirstLoad } = apiKeySlice.actions;

export default apiKeySlice.reducer as Reducer<APIKeyState>;
