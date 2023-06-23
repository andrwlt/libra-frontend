import { createSlice, Reducer } from '@reduxjs/toolkit';
import {
  CreateWebhookState,
  UpdateWebhookState,
  WebhookBase,
  WebhookListState,
  WebhookResponse,
  DeleteWebhookState,
} from './types';
import { createAppAsyncThunk } from 'app/hooks';
import webhookAPI from './webhookAPI';
import { RootState } from 'app/store';
import { resetStore } from 'features/auth/authSlice';
import pagingHelper from 'utils/pagingHelper';
import { GetListPayload } from 'types';

export const getWebhooks = createAppAsyncThunk(
  'webhook/getWebhooks',
  async (searchParams: GetListPayload, { rejectWithValue }) => {
    try {
      const params = { request: webhookAPI.getWebhooks, searchParams };
      return await pagingHelper.fetchData<WebhookResponse>(params);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const createWebhook = createAppAsyncThunk(
  'webhook/createWebhook',
  async (webhook: WebhookBase, { rejectWithValue }) => {
    try {
      const response = await webhookAPI.createWebhook(webhook);

      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const updateWebhook = createAppAsyncThunk(
  'webhook/updateWebhook',
  async (webhook: WebhookResponse, { rejectWithValue }) => {
    try {
      const response = await webhookAPI.updateWebhook(webhook);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const deleteWebhook = createAppAsyncThunk(
  'webhook/deleteWebhook',
  async (deletedId: string, { rejectWithValue }) => {
    try {
      await webhookAPI.deleteWebhook(deletedId);
      return deletedId;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

interface WebhookState extends WebhookListState, CreateWebhookState, UpdateWebhookState, DeleteWebhookState {
  isFirstLoad: boolean;
}

const initialState: WebhookState = {
  webhooks: [],
  getWebhooksLoading: false,
  getWebhooksFailed: undefined,
  webhooksPaging: {
    hasNextPage: false,
    hasPrevPage: false,
  },
  isFirstLoad: true,

  createWebhookLoading: false,
  createWebhookSuccess: undefined,
  createWebhookFailed: undefined,

  updateWebhookLoading: false,
  updateWebhookSuccess: undefined,
  updateWebhookFailed: undefined,

  deleteWebhookLoading: false,
  deleteWebhookSuccess: undefined,
  deleteWebhookFailed: undefined,
};

export const webhookSlice = createSlice({
  name: 'webhook',
  initialState,
  reducers: {
    resetWebhook(state: any) {
      Object.entries(initialState).forEach(([key, initVal]) => {
        if (key !== 'isFirstLoad') {
          state[key] = initVal;
        }
      });
    },

    resetFirstLoad(state, ) {
      state.isFirstLoad = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWebhooks.pending, (state) => {
        state.getWebhooksLoading = true;
      })
      .addCase(getWebhooks.fulfilled, (state, { payload }) => {
        state.getWebhooksLoading = false;
        state.webhooks = payload.data;
        state.webhooksPaging = payload.paging;
        state.isFirstLoad = false;
      })
      .addCase(getWebhooks.rejected, (state, { payload }) => {
        state.getWebhooksLoading = false;
        state.getWebhooksFailed = payload;
        state.isFirstLoad = false;
      })

      .addCase(createWebhook.pending, (state) => {
        state.createWebhookLoading = true;
      })
      .addCase(createWebhook.fulfilled, (state, { payload }) => {
        state.createWebhookLoading = false;
        state.createWebhookSuccess = payload;
      })
      .addCase(createWebhook.rejected, (state, { payload }) => {
        state.createWebhookLoading = false;
        state.createWebhookFailed = payload;
      })

      .addCase(updateWebhook.pending, (state) => {
        state.updateWebhookLoading = true;
      })
      .addCase(updateWebhook.fulfilled, (state, { payload }) => {
        state.updateWebhookLoading = false;
        state.updateWebhookSuccess = payload;
        state.webhooks = state.webhooks.map((webhook) => (webhook.id === payload.id ? payload : webhook));
      })
      .addCase(updateWebhook.rejected, (state, { payload }) => {
        state.updateWebhookLoading = false;
        state.updateWebhookFailed = payload;
      })

      .addCase(deleteWebhook.pending, (state) => {
        state.deleteWebhookLoading = true;
      })
      .addCase(deleteWebhook.fulfilled, (state, { payload: deletedId }) => {
        state.deleteWebhookLoading = false;
        state.deleteWebhookSuccess = deletedId;
      })
      .addCase(deleteWebhook.rejected, (state, { payload }) => {
        state.deleteWebhookLoading = false;
        state.deleteWebhookFailed = payload;
      })

      .addCase(resetStore, () => {
        return initialState;
      });
  },
});

export const selectWebhookListState = ({
  webhook: { webhooks, getWebhooksLoading, getWebhooksFailed, webhooksPaging },
}: RootState): WebhookListState => ({
  webhooks,
  getWebhooksLoading,
  getWebhooksFailed,
  webhooksPaging,
});

export const selectCreateWebhookState = ({
  webhook: { createWebhookFailed, createWebhookLoading, createWebhookSuccess },
}: RootState): CreateWebhookState => ({
  createWebhookFailed,
  createWebhookLoading,
  createWebhookSuccess,
});

export const selectUpdateWebhookState = ({
  webhook: { updateWebhookFailed, updateWebhookLoading, updateWebhookSuccess },
}: RootState): UpdateWebhookState => ({
  updateWebhookFailed,
  updateWebhookLoading,
  updateWebhookSuccess,
});

export const selectDeleteWebhookState = ({
  webhook: { deleteWebhookFailed, deleteWebhookLoading, deleteWebhookSuccess },
}: RootState): DeleteWebhookState => ({
  deleteWebhookFailed,
  deleteWebhookLoading,
  deleteWebhookSuccess,
});

export const selectFirstLoadState = ({ webhook: { isFirstLoad } }: RootState) => isFirstLoad;

export const { resetWebhook, resetFirstLoad } = webhookSlice.actions;

export default webhookSlice.reducer as Reducer<WebhookState>;
