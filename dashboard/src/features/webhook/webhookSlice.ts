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
import { DEFAULT_LIMIT } from 'config';
import { getPagingData } from 'utils/paging';
import { RootState } from 'app/store';
import { resetStore } from 'features/auth/authSlice';
import { GetListResponse } from 'types';

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
        webhook: {
          webhooks,
          webhooksPaging: { prevPageData, hasPrevPage },
        },
      } = getState();

      if (isRefreshCurrentPage) {
        const afterId = prevPageData[prevPageData.length - 1]?.id;
        const {
          data: { data: nextPageData },
        } = await webhookAPI.getWebhooks({ afterId, limit: DEFAULT_LIMIT + 1 });

        const { hasNextPage, data: nextWebhooks } = getPagingData(nextPageData);

        return {
          webhooks: nextWebhooks,
          paging: {
            hasNextPage,
            hasPrevPage: !!prevPageData.length,
            prevPageData: prevPageData,
          },
        };
      }

      // REFRESH AFTER DELETING
      if (deletedId) {
        const isDeletedTheOnlyOneRecord = webhooks.length === 1;

        if (isDeletedTheOnlyOneRecord) {
          // DELETE THE LAST ITEM OF AN USER
          if (!hasPrevPage) {
            return {
              webhooks: [],
              paging: {
                hasNextPage: false,
                hasPrevPage: false,
                prevPageData: [],
              },
            };
          }
          // DELETE THE LAST ITEM OF CURRENT PAGE
          else {
            const beforeId = prevPageData[0].id;
            const response = await webhookAPI.getWebhooks({ beforeId });
            const nextPrevPageData = response.data.data;
            const nextHasPrevPage = nextPrevPageData.length;
            return {
              webhooks: prevPageData,
              paging: {
                hasPrevPage: nextHasPrevPage,
                hasNextPage: false,
                prevPageData: nextPrevPageData,
              },
            };
          }
        }
        // DELETE ONE ITEM IN MULTIPLE ITEMS
        else {
          const afterId = prevPageData[prevPageData.length - 1]?.id;
          const response: GetListResponse<WebhookResponse> = await webhookAPI.getWebhooks({
            afterId,
            limit: DEFAULT_LIMIT + 1,
          });
          const { data: nextWebhooks, hasNextPage } = getPagingData(response.data.data);

          return {
            webhooks: nextWebhooks,
            paging: {
              hasNextPage,
              hasPrevPage,
              prevPageData,
            },
          };
        }
      } else {
        if (isGoNext) {
          const afterId = webhooks[webhooks.length - 1]?.id;

          const {
            data: { data: nextPageData },
          } = await webhookAPI.getWebhooks({ afterId, limit: DEFAULT_LIMIT + 1 });

          const { hasNextPage, data: nextWebhooks } = getPagingData(nextPageData);

          return {
            webhooks: nextWebhooks,
            paging: {
              hasNextPage,
              hasPrevPage: !!webhooks.length,
              prevPageData: webhooks,
            },
          };
        } else {
          const beforeId = prevPageData[0]?.id;

          const {
            data: { data: nextPrevPageData },
          } = await webhookAPI.getWebhooks({ beforeId });

          return {
            webhooks: prevPageData,
            paging: {
              hasNextPage: true,
              hasPrevPage: nextPrevPageData.length,
              prevPageData: nextPrevPageData,
            },
          };
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
        state.webhooks = payload.webhooks;
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
