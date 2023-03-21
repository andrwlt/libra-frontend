import { createSlice, Reducer } from '@reduxjs/toolkit';
import {
  CheckoutListState,
  CheckoutDetailsState,
  CreateCheckoutState,
  UpdateCheckoutState,
  CheckoutType,
  DeleteCheckoutState,
  GetCheckoutsResponse,
} from './types';
import { createAppAsyncThunk } from 'app/hooks';
import checkoutAPI from './checkoutAPI';
import { RootState } from 'app/store';
import { resetStore } from 'features/auth/authSlice';
import { DEFAULT_LIMIT } from 'config';

const addPayeeToCheckout = (checkout: CheckoutType, getState: () => RootState): CheckoutType => {
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
  async ({ deletedId }: { deletedId?: string }, { rejectWithValue, getState }) => {
    try {
      const {
        checkout: {
          checkouts,
          checkoutsPaging: { prevPageData },
        },
      } = getState();

      if (deletedId) {
        const isDeletedLastItem = checkouts.length === 1;
        const shouldDecreasePageNumber = isDeletedLastItem;

        if (shouldDecreasePageNumber) {
          // TODO
        }
        const afterIdDeleteCase = prevPageData[prevPageData.length - 1]?.id;
        const {
          data: { data: currentDataDeleteCase },
        }: GetCheckoutsResponse = await checkoutAPI.getCheckouts({
          afterId: afterIdDeleteCase,
          limit: DEFAULT_LIMIT + 1,
        });
        const hasNextPage = currentDataDeleteCase.length > DEFAULT_LIMIT;
        const currentCheckoutsDeleteCase = hasNextPage
          ? currentDataDeleteCase.filter((_, index) => index !== DEFAULT_LIMIT)
          : currentDataDeleteCase;

        return {
          checkouts: currentCheckoutsDeleteCase,
          paging: {
            hasPrevPage: true,
            hasNextPage,
            prevPageData: prevPageData,
          },
        };
      } else {
        const beforeId = checkouts[0]?.id;
        const afterId = checkouts[checkouts.length - 1]?.id;
        const emptyResponse: GetCheckoutsResponse = { data: { data: [] } };

        const prevCheckoutsRequest = beforeId ? checkoutAPI.getCheckouts({ beforeId }) : emptyResponse;
        const currentCheckoutsRequest = checkoutAPI.getCheckouts({ afterId, limit: DEFAULT_LIMIT + 1 });

        const [
          {
            data: { data: prevPageData },
          },
          {
            data: { data: currentData },
          },
        ] = await Promise.all<GetCheckoutsResponse>([prevCheckoutsRequest, currentCheckoutsRequest]);

        const hasNextPage = currentData.length > DEFAULT_LIMIT;
        const currentCheckouts = hasNextPage ? currentData.filter((_, index) => index !== DEFAULT_LIMIT) : currentData;

        return {
          checkouts: currentCheckouts,
          paging: {
            hasPrevPage: !!prevPageData.length,
            hasNextPage,
            prevPageData: prevPageData,
          },
        };
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
  async (checkout: CheckoutType, { rejectWithValue, getState }) => {
    try {
      const response = await checkoutAPI.createCheckout(addPayeeToCheckout(checkout, getState));
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const updateCheckout = createAppAsyncThunk(
  'checkout/updateCheckout',
  async (checkout: CheckoutType, { rejectWithValue, getState }) => {
    try {
      const response = await checkoutAPI.updateCheckout(addPayeeToCheckout(checkout, getState));
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

const initCheckout = {
  branding: {},
  item: {
    name: '',
    price: null,
    image: '',
  },
  afterPayment: {
    redirectUrl: '',
  },
  payee: '',
  asset: 'wnd',
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
        state.checkout = payload;
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
        state.checkouts = state.checkouts.filter(({ id }) => id !== deletedId);
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
