import { createSlice, Reducer } from '@reduxjs/toolkit';
import {
  CheckoutListState,
  GetCheckoutState,
  CreateCheckoutState,
  UpdateCheckoutState,
  DeleteCheckoutState,
  CreatingCheckout,
  AddMoreInfo,
  UpdatingCheckout,
  GetCheckoutDetailsState,
} from './types';

import { NumberPriceCheckoutResponse, CheckoutResponse } from '@atscale/libra-ui';
import { createAppAsyncThunk } from 'app/hooks';
import checkoutAPI from './checkoutAPI';
import { RootState } from 'app/store';
import { resetStore } from 'features/auth/authSlice';
import { formatCheckoutToNumberPrice } from 'utils/format/balance';
import pagingHelper from 'utils/pagingHelper';
import { GetListPayload } from 'types';

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
  async (searchParams: GetListPayload, { rejectWithValue }) => {
    try {
      const params = { request: checkoutAPI.getCheckouts, searchParams };
      return await pagingHelper.fetchData<CheckoutResponse>(params);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getCheckout = createAppAsyncThunk('checkout/getCheckout', async (id: string, { rejectWithValue }) => {
  try {
    const response = await checkoutAPI.getCheckout(id);
    return response.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const createCheckout = createAppAsyncThunk(
  'checkout/createCheckout',
  async (checkout: CreatingCheckout, { rejectWithValue, getState }) => {
    try {
      const response = await checkoutAPI.createCheckout(addPayeeToCheckout<CreatingCheckout>(checkout, getState));
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const updateCheckout = createAppAsyncThunk(
  'checkout/updateCheckout',
  async (checkout: UpdatingCheckout, { rejectWithValue, getState }) => {
    try {
      const response = await checkoutAPI.updateCheckout(addPayeeToCheckout<UpdatingCheckout>(checkout, getState));
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const deleteCheckout = createAppAsyncThunk(
  'checkout/deleteCheckout',
  async (deletedId: string, { rejectWithValue }) => {
    try {
      await checkoutAPI.deleteCheckout(deletedId);
      return deletedId;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getCheckoutDetails = createAppAsyncThunk(
  'checkout/getCheckoutDetails',
  async (id: string, { rejectWithValue }) => {
    try {
      const [{ data: checkout }, { data: performance }, { data: payments }] = await Promise.all([
        checkoutAPI.getCheckout(id),
        checkoutAPI.getCheckoutSession(id),
        checkoutAPI.getCheckoutPayments(id),
      ]);

      return {
        checkout,
        performance,
        payments,
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

interface CheckoutState
  extends CheckoutListState,
    GetCheckoutState,
    CreateCheckoutState,
    UpdateCheckoutState,
    DeleteCheckoutState,
    GetCheckoutDetailsState {}

const initCheckout: NumberPriceCheckoutResponse = {
  id: '',
  branding: {},
  item: {
    name: '',
    price: {
      type: 'fixed',
      value: 0,
    },
  },
  afterPayment: {
    type: 'message',
    config: {
      message: '',
    },
  },
  payee: '',
  assetId: '',
  networkId: '',
  active: false,
  created: '',
};

const initialState: CheckoutState = {
  checkouts: [],
  getCheckoutsLoading: false,
  getCheckoutsFailed: undefined,
  checkoutsPaging: {
    hasNextPage: false,
    hasPrevPage: false,
  },

  isFirstLoad: true,

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

  getCheckoutDetailsLoading: false,
  checkoutDetails: undefined,
  getCheckoutDetailsFailed: undefined,
};

export const authSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    resetCheckout() {
      return initialState;
    },

    updateCheckoutAsset(state, { payload: { assetId, networkId } }) {
      state.checkout = {
        ...state.checkout,
        assetId,
        networkId,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCheckouts.pending, (state) => {
        state.getCheckoutsLoading = true;
      })
      .addCase(getCheckouts.fulfilled, (state, { payload }) => {
        state.getCheckoutsLoading = false;
        state.checkouts = payload.data;
        state.checkoutsPaging = payload.paging;
        state.isFirstLoad = false;
      })
      .addCase(getCheckouts.rejected, (state, { payload }) => {
        state.getCheckoutsLoading = false;
        state.getCheckoutsFailed = payload;
        state.isFirstLoad = false;
      })

      .addCase(getCheckout.pending, (state) => {
        state.getCheckoutLoading = true;
      })
      .addCase(getCheckout.fulfilled, (state, { payload }) => {
        state.getCheckoutLoading = false;
        state.checkout = formatCheckoutToNumberPrice(payload);
      })
      .addCase(getCheckout.rejected, (state, { payload }) => {
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

      .addCase(getCheckoutDetails.pending, (state) => {
        state.getCheckoutDetailsLoading = true;
      })
      .addCase(getCheckoutDetails.fulfilled, (state, { payload }) => {
        state.getCheckoutDetailsLoading = false;
        state.checkoutDetails = { ...payload, checkout: formatCheckoutToNumberPrice(payload.checkout) };
      })
      .addCase(getCheckoutDetails.rejected, (state, { payload }) => {
        state.getCheckoutDetailsLoading = false;
        state.getCheckoutDetailsFailed = payload;
      })

      .addCase(resetStore, () => {
        return initialState;
      });
  },
});

export const selectCheckoutListState = ({
  checkout: { checkouts, getCheckoutsLoading, getCheckoutsFailed, checkoutsPaging, isFirstLoad },
}: RootState): CheckoutListState => ({
  checkouts,
  getCheckoutsLoading,
  getCheckoutsFailed,
  checkoutsPaging,
  isFirstLoad,
});

export const selectCheckoutState = ({
  checkout: { checkout, getCheckoutFailed, getCheckoutLoading },
}: RootState): GetCheckoutState => ({
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

export const selectCheckoutDetailsState = ({
  checkout: { checkoutDetails, getCheckoutDetailsFailed, getCheckoutDetailsLoading },
}: RootState): GetCheckoutDetailsState => ({
  checkoutDetails,
  getCheckoutDetailsFailed,
  getCheckoutDetailsLoading,
});

export const { resetCheckout, updateCheckoutAsset } = authSlice.actions;

export default authSlice.reducer as Reducer<CheckoutState>;
