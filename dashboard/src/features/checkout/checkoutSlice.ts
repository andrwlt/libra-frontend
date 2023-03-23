import { createSlice, Reducer } from '@reduxjs/toolkit';
import {
  CheckoutListState,
  CheckoutDetailsState,
  CreateCheckoutState,
  UpdateCheckoutState,
  DeleteCheckoutState,
  GetCheckoutsResponse,
  CreatingCheckoutType,
  AddMoreInfo,
  UpdatingCheckoutType,
  CheckoutResponseAfterConvertingPrice,
} from './types';
import { createAppAsyncThunk } from 'app/hooks';
import checkoutAPI from './checkoutAPI';
import { RootState } from 'app/store';
import { resetStore } from 'features/auth/authSlice';
import { DEFAULT_LIMIT } from 'config';
import { getPagingData } from 'utils/paging';
import { formatCheckoutToNumberPrice } from 'utils/format/balance';

const addPayeeToCheckout: AddMoreInfo = (checkout, getState) => {
  const {
    auth: { libraConnectedAccount },
  } = getState();

  return {
    ...checkout,
    payee: libraConnectedAccount?.address ?? '',
  };
};

export const getCheckouts = createAppAsyncThunk(
  'checkout/getCheckouts',
  async ({ deletedId, isGoNext = true }: { deletedId?: string; isGoNext?: boolean }, { rejectWithValue, getState }) => {
    try {
      const {
        checkout: {
          checkouts,
          checkoutsPaging: { prevPageData, hasPrevPage },
        },
      } = getState();

      // REFRESH AFTER DELETING
      if (deletedId) {
        const isDeletedTheOnlyOneRecord = checkouts.length === 1;

        if (isDeletedTheOnlyOneRecord) {
          // DELETE THE LAST ITEM OF AN USER
          if (!hasPrevPage) {
            return {
              checkouts: [],
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
            const response = await checkoutAPI.getCheckouts({ beforeId });
            const nextPrevPageData = response.data.data;
            const nextHasPrevPage = nextPrevPageData.length;
            return {
              checkouts: prevPageData,
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
          const response: GetCheckoutsResponse = await checkoutAPI.getCheckouts({
            afterId,
            limit: DEFAULT_LIMIT + 1,
          });
          const { data: nextCheckouts, hasNextPage } = getPagingData(response.data.data);

          return {
            checkouts: nextCheckouts,
            paging: {
              hasNextPage,
              hasPrevPage,
              prevPageData,
            },
          };
        }
      }
      // FETCH IN NORMAL CASE
      else {
        // GO TO NEXT PAGE
        if (isGoNext) {
          const afterId = checkouts[checkouts.length - 1]?.id;

          const {
            data: { data: nextPageData },
          } = await checkoutAPI.getCheckouts({ afterId, limit: DEFAULT_LIMIT + 1 });

          const { hasNextPage, data: nextCheckouts } = getPagingData(nextPageData);

          return {
            checkouts: nextCheckouts,
            paging: {
              hasNextPage,
              hasPrevPage: !!checkouts.length,
              prevPageData: checkouts,
            },
          };
        }
        // GO TO PREV PAGE
        else {
          const beforeId = prevPageData[0]?.id;

          const {
            data: { data: nextPrevPageData },
          } = await checkoutAPI.getCheckouts({ beforeId });

          return {
            checkouts: prevPageData,
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

export const getCheckoutDetails = createAppAsyncThunk(
  'checkout/getCheckoutDetails',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await checkoutAPI.getCheckout(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const createCheckout = createAppAsyncThunk(
  'checkout/createCheckout',
  async (checkout: CreatingCheckoutType, { rejectWithValue, getState }) => {
    try {
      const response = await checkoutAPI.createCheckout(addPayeeToCheckout<CreatingCheckoutType>(checkout, getState));
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const updateCheckout = createAppAsyncThunk(
  'checkout/updateCheckout',
  async (checkout: UpdatingCheckoutType, { rejectWithValue, getState }) => {
    try {
      const response = await checkoutAPI.updateCheckout(addPayeeToCheckout<UpdatingCheckoutType>(checkout, getState));
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const deleteCheckout = createAppAsyncThunk(
  'checkout/deleteCheckout',
  async (deletedId: string, { rejectWithValue, dispatch }) => {
    try {
      await checkoutAPI.deleteCheckout(deletedId);
      dispatch(getCheckouts({ deletedId }));
      return deletedId;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

interface CheckoutState
  extends CheckoutListState,
    CheckoutDetailsState,
    CreateCheckoutState,
    UpdateCheckoutState,
    DeleteCheckoutState {}

const initCheckout: CheckoutResponseAfterConvertingPrice = {
  id: '',
  branding: {},
  item: {
    name: '',
    price: null,
  },
  afterPayment: {
    redirectUrl: '',
  },
  payee: '',
  asset: 'wnd',
  active: false,
  created: '',
};

const initialState: CheckoutState = {
  checkouts: [],
  getCheckoutsLoading: false,
  getCheckoutsFailed: undefined,
  checkoutsPaging: { hasPrevPage: false, hasNextPage: false, prevPageData: [] },

  checkout: initCheckout,
  getCheckoutLoading: false,
  getCheckoutFailed: undefined,

  createCheckoutLoading: false,
  createCheckoutSuccess: undefined,
  createCheckoutFailed: undefined,
  checkoutURL: '',

  updateCheckoutLoading: false,
  updateCheckoutSuccess: undefined,
  updateCheckoutFailed: undefined,

  deleteCheckoutLoading: false,
  deleteCheckoutSuccess: undefined,
  deleteCheckoutFailed: undefined,
};

export const authSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    resetCheckout() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCheckouts.pending, (state) => {
        state.getCheckoutsLoading = true;
      })
      .addCase(getCheckouts.fulfilled, (state, { payload }) => {
        state.getCheckoutsLoading = false;
        state.checkouts = payload.checkouts;
        state.checkoutsPaging = payload.paging;
      })
      .addCase(getCheckouts.rejected, (state, { payload }) => {
        state.getCheckoutsLoading = false;
        state.getCheckoutsFailed = payload;
      })

      .addCase(getCheckoutDetails.pending, (state) => {
        state.getCheckoutLoading = true;
      })
      .addCase(getCheckoutDetails.fulfilled, (state, { payload }) => {
        state.getCheckoutLoading = false;
        state.checkout = formatCheckoutToNumberPrice(payload);
      })
      .addCase(getCheckoutDetails.rejected, (state, { payload }) => {
        state.getCheckoutLoading = false;
        state.getCheckoutFailed = payload;
      })

      .addCase(createCheckout.pending, (state) => {
        state.createCheckoutLoading = true;
      })
      .addCase(createCheckout.fulfilled, (state, { payload }) => {
        state.createCheckoutLoading = false;
        state.createCheckoutSuccess = payload;
        state.checkoutURL = `${process.env.REACT_APP_CHECKOUT_URL}/${payload.id}`;
      })
      .addCase(createCheckout.rejected, (state, { payload }) => {
        state.createCheckoutLoading = false;
        state.createCheckoutFailed = payload;
      })

      .addCase(updateCheckout.pending, (state) => {
        state.updateCheckoutLoading = true;
      })
      .addCase(updateCheckout.fulfilled, (state, { payload }) => {
        state.updateCheckoutLoading = false;
        state.updateCheckoutSuccess = payload;
      })
      .addCase(updateCheckout.rejected, (state, { payload }) => {
        state.updateCheckoutLoading = false;
        state.updateCheckoutFailed = payload;
      })

      .addCase(deleteCheckout.pending, (state) => {
        state.deleteCheckoutLoading = true;
      })
      .addCase(deleteCheckout.fulfilled, (state, { payload: deletedId }) => {
        state.deleteCheckoutLoading = false;
        state.deleteCheckoutSuccess = deletedId;
      })
      .addCase(deleteCheckout.rejected, (state, { payload }) => {
        state.deleteCheckoutLoading = false;
        state.deleteCheckoutFailed = payload;
      })

      .addCase(resetStore, () => {
        return initialState;
      });
  },
});

export const selectCheckoutListState = ({
  checkout: { checkouts, getCheckoutsLoading, getCheckoutsFailed, checkoutsPaging },
}: RootState): CheckoutListState => ({
  checkouts,
  getCheckoutsLoading,
  getCheckoutsFailed,
  checkoutsPaging,
});

export const selectCheckoutDetailsState = ({
  checkout: { checkout, getCheckoutFailed, getCheckoutLoading },
}: RootState): CheckoutDetailsState => ({
  checkout,
  getCheckoutFailed,
  getCheckoutLoading,
});

export const selectCreateCheckoutState = ({
  checkout: { createCheckoutFailed, createCheckoutLoading, createCheckoutSuccess, checkoutURL },
}: RootState): CreateCheckoutState => ({
  createCheckoutFailed,
  createCheckoutLoading,
  createCheckoutSuccess,
  checkoutURL,
});

export const selectUpdateCheckoutState = ({
  checkout: { updateCheckoutFailed, updateCheckoutLoading, updateCheckoutSuccess },
}: RootState): UpdateCheckoutState => ({
  updateCheckoutFailed,
  updateCheckoutLoading,
  updateCheckoutSuccess,
});

export const selectDeleteCheckoutState = ({
  checkout: { deleteCheckoutFailed, deleteCheckoutLoading, deleteCheckoutSuccess },
}: RootState): DeleteCheckoutState => ({
  deleteCheckoutFailed,
  deleteCheckoutLoading,
  deleteCheckoutSuccess,
});

export const { resetCheckout } = authSlice.actions;

export default authSlice.reducer as Reducer<CheckoutState>;
