import { createSlice, Reducer } from '@reduxjs/toolkit';
import paymentAPI from './paymentAPI';
import CheckoutAPI from 'features/checkout/checkoutAPI';
import { createAppAsyncThunk } from 'app/hooks';
import { RootState } from 'app/store';
import { GetChargesState, GetChargesResponse } from './types';
import { resetStore } from 'features/auth/authSlice';
import { DEFAULT_LIMIT } from 'config';

export const getCharges = createAppAsyncThunk('checkout/getCharges', async (_, { rejectWithValue, getState }) => {
  try {
    const {
      payment: { charges },
    } = getState();

    const beforeId = charges[0]?.id;
    const afterId = charges[charges.length - 1]?.id;
    const emptyResponse: GetChargesResponse = { data: { data: [] } };

    const prevChargesRequest = beforeId ? paymentAPI.getCharges({ beforeId }) : emptyResponse;
    const currentChargesRequest = paymentAPI.getCharges({ afterId, limit: DEFAULT_LIMIT + 1 });

    const [
      {
        data: { data: prevPageData },
      },
      {
        data: { data: currentData },
      },
      {
        data: { data: checkouts },
      },
    ] = await Promise.all<GetChargesResponse>([prevChargesRequest, currentChargesRequest, CheckoutAPI.getCheckouts({})]);

    const hasNextPage = currentData.length > DEFAULT_LIMIT;
    const currentCharges = hasNextPage ? currentData.filter((_, index) => index !== DEFAULT_LIMIT) : currentData;

    return {
      charges: currentCharges,
      hasCheckout: !!checkouts.length,
      paging: {
        hasPrevPage: !!prevPageData.length,
        hasNextPage,
      },
    };
  } catch (err) {
    return rejectWithValue(err);
  }
});

interface PaymentState extends GetChargesState {}

const initialState: PaymentState = {
  charges: [],
  getChargesFailed: undefined,
  getChargesLoading: false,
  hasCheckout: false,
  chargesPaging: {
    hasNextPage: false,
    hasPrevPage: false,
  },
};

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCharges.pending, (state) => {
        state.getChargesLoading = true;
        state.charges = [];
      })
      .addCase(getCharges.fulfilled, (state, { payload }) => {
        state.getChargesLoading = false;
        state.charges = payload.charges;
        state.hasCheckout = payload.hasCheckout;
      })
      .addCase(getCharges.rejected, (state, { payload }) => {
        state.getChargesLoading = false;
        state.getChargesFailed = payload;
      })
      .addCase(resetStore, () => {
        return initialState;
      });
  },
});

export const selectChargesState = ({
  payment: { charges, getChargesFailed, getChargesLoading, hasCheckout, chargesPaging },
}: RootState): GetChargesState => ({
  charges,
  getChargesFailed,
  getChargesLoading,
  hasCheckout,
  chargesPaging,
});

export default paymentSlice.reducer as Reducer<PaymentState>;
