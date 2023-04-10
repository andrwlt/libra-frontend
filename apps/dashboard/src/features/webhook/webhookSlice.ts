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

export const getWebhooks = createAppAsyncThunk(
  'webhook/getWebhooks',
  async (
    {
      deletedId,
      isGoNext = true,
      isRefreshCurrentPage = false,
    }: { deletedId?: string; isGoNext?: boolean; isRefreshCurrentPage?: boolean },
    { rejectWithValue, getState },
  ) => {
    try {
      const {
        webhook: { webhooks, webhooksPaging },
      } = getState();

      const params = {
        request: webhookAPI.getWebhooks,
        data: webhooks,
        paging: webhooksPaging,
      };

      if (isRefreshCurrentPage) {
        return await pagingHelper.refreshCurrentPage<WebhookResponse>(params);
      }

      if (deletedId) {
        return await pagingHelper.refreshAfterDeleting<WebhookResponse>(params);
      } else {
        if (isGoNext) {
          return await pagingHelper.goNext<WebhookResponse>(params);
        } else {
          return await pagingHelper.goBack<WebhookResponse>(params);
        }
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const createWebhook = createAppAsyncThunk(
  'webhook/createWebhook',
  async (webhook: WebhookBase, { rejectWithValue, dispatch }) => {
    try {
      const response = await webhookAPI.createWebhook(webhook);
      await dispatch(getWebhooks({ isRefreshCurrentPage: true }));
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
  async (deletedId: string, { rejectWithValue, dispatch }) => {
    try {
      await webhookAPI.deleteWebhook(deletedId);
      dispatch(getWebhooks({ deletedId }));
      return deletedId;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

interface WebhookState extends WebhookListState, CreateWebhookState, UpdateWebhookState, DeleteWebhookState {}

const initialState: WebhookState = {
  webhooks: [],
  getWebhooksLoading: false,
  getWebhooksFailed: undefined,
  webhooksPaging: {
    hasNextPage: false,
    hasPrevPage: false,
    prevPageData: [],
  },

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
    resetWebhook() {
      return initialState;
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
      })
      .addCase(getWebhooks.rejected, (state, { payload }) => {
        state.getWebhooksLoading = false;
        state.getWebhooksFailed = payload;
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

export const { resetWebhook } = webhookSlice.actions;

export default webhookSlice.reducer as Reducer<WebhookState>;
