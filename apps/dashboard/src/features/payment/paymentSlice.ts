import { createSlice, Reducer } from '@reduxjs/toolkit';
import paymentAPI from './paymentAPI';
import CheckoutAPI from 'features/checkout/checkoutAPI';
import { createAppAsyncThunk } from 'app/hooks';
import { RootState } from 'app/store';
import { GetChargesState, GetChargesPayload } from './types';
import { resetStore } from 'features/auth/authSlice';
import { LIMIT_PLUS_1 } from 'config';
import { getPagingData } from 'utils/paging';

export const getCharges = createAppAsyncThunk(
  'checkout/getCharges',
  async (searchParams: GetChargesPayload, { rejectWithValue, getState }) => {
    try {
      const [
        {
          data: { data: hasMoreOneRecordData },
        },
        {
          data: { data: checkouts },
        },
      ] = await Promise.all([
        paymentAPI.getCharges({ limit: LIMIT_PLUS_1, ...searchParams }),
        CheckoutAPI.getCheckouts({}),
      ]);

      const { data, paging } = getPagingData(hasMoreOneRecordData, searchParams);

      return {
        data,
        paging,
        hasCheckout: !!checkouts.length,
        firstCheckoutAsset: checkouts.length > 0 && checkouts[0].asset,
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

interface PaymentState extends GetChargesState {}

const initialState: PaymentState = {
  charges: [],
  getChargesFailed: undefined,
  getChargesLoading: false,
  hasCheckout: false,
  firstCheckoutAsset: '',
  isFirstLoad: true,
  chargesPaging: {
    hasNextPage: false,
    hasPrevPage: false,
  },
};

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    resetPayments() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCharges.pending, (state) => {
        state.getChargesLoading = true;
      })
      .addCase(getCharges.fulfilled, (state, { payload }) => {
        state.getChargesLoading = false;
        state.charges = payload.data;
        state.hasCheckout = payload.hasCheckout;
        state.firstCheckoutAsset = payload.firstCheckoutAsset;
        state.chargesPaging = payload.paging;
        state.isFirstLoad = false;
      })
      .addCase(getCharges.rejected, (state, { payload }) => {
        state.getChargesLoading = false;
        state.getChargesFailed = payload;
        state.isFirstLoad = false;
      })
      .addCase(resetStore, () => {
        return initialState;
      });
  },
});

export const selectChargesState = ({
  payment: {
    charges,
    getChargesFailed,
    getChargesLoading,
    hasCheckout,
    firstCheckoutAsset,
    chargesPaging,
    isFirstLoad,
  },
}: RootState): GetChargesState => ({
  charges,
  getChargesFailed,
  getChargesLoading,
  hasCheckout,
  firstCheckoutAsset,
  chargesPaging,
  isFirstLoad,
});

export const { resetPayments } = paymentSlice.actions;

export default paymentSlice.reducer as Reducer<PaymentState>;
