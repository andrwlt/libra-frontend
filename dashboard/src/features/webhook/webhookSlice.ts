import { createSlice, Reducer } from '@reduxjs/toolkit';
import { WebhookListState } from './types';
import { createAppAsyncThunk } from 'app/hooks';
import webhookAPI from './webhookAPI';
import { DEFAULT_LIMIT } from 'config';
import { getPagingData } from 'utils/paging';
import { RootState } from 'app/store';

interface WebhookState extends WebhookListState {}

export const getWebhooks = createAppAsyncThunk(
  'webhook/getWebhooks',
  async ({ isGoNext = true }: { deletedId?: string; isGoNext?: boolean }, { rejectWithValue, getState }) => {
    try {
      const {
        webhook: {
          webhooks,
          webhooksPaging: { prevPageData },
        },
      } = getState();

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
      }
      // GO TO PREV PAGE
      else {
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
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const initialState: WebhookState = {
  webhooks: [],
  getWebhooksLoading: false,
  getWebhooksFailed: undefined,
  webhooksPaging: {
    hasNextPage: false,
    hasPrevPage: false,
    prevPageData: [],
  },
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

export const { resetWebhook } = webhookSlice.actions;

export default webhookSlice.reducer as Reducer<WebhookState>;
