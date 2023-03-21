import { createSlice, Reducer } from '@reduxjs/toolkit';
import paymentAPI from './paymentAPI';
import CheckoutAPI from 'features/checkout/checkoutAPI';
import { createAppAsyncThunk } from 'app/hooks';
import { RootState } from 'app/store';
import { GetChargesState } from './types';
import { resetStore } from 'features/auth/authSlice';

export const getCharges = createAppAsyncThunk('checkout/getCharges', async (_, { rejectWithValue }) => {
  try {
    const [
      {
        data: { data: charges },
      },
      {
        data: { data: checkouts },
      },
    ]: [any, any] = await Promise.all([paymentAPI.getCharges(), CheckoutAPI.getCheckouts()]);

    return {
      charges,
      hasCheckout: !!checkouts.length,
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
  payment: { charges, getChargesFailed, getChargesLoading, hasCheckout },
}: RootState): GetChargesState => ({
  charges,
  getChargesFailed,
  getChargesLoading,
  hasCheckout,
});

export default paymentSlice.reducer as Reducer<PaymentState>;
