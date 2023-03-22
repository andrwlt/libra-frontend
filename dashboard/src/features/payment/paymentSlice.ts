import { createSlice, Reducer } from '@reduxjs/toolkit';
import paymentAPI from './paymentAPI';
import CheckoutAPI from 'features/checkout/checkoutAPI';
import { createAppAsyncThunk } from 'app/hooks';
import { RootState } from 'app/store';
import { GetChargesState } from './types';
import { resetStore } from 'features/auth/authSlice';
import { DEFAULT_LIMIT } from 'config';
import { getPagingData } from 'utils/paging';

export const getCharges = createAppAsyncThunk(
  'checkout/getCharges',
  async ({ isGoNext = false }: { isGoNext?: boolean }, { rejectWithValue, getState }) => {
    try {
      const {
        payment: {
          charges,
          chargesPaging: { prevPageData },
        },
      } = getState();

      if (isGoNext) {
        const afterId = charges[charges.length - 1]?.id;

        const [
          {
            data: { data: nextPageData },
          },
          {
            data: { data: checkouts },
          },
        ] = await Promise.all([
          paymentAPI.getCharges({ afterId, limit: DEFAULT_LIMIT + 1 }),
          CheckoutAPI.getCheckouts({}),
        ]);

        const { hasNextPage, data: nextCharges } = getPagingData(nextPageData);

        return {
          charges: nextCharges,
          hasCheckout: !!checkouts.length,
          paging: {
            hasNextPage,
            hasPrevPage: !!charges.length,
            prevPageData: charges,
          },
        };
      }
      // GO TO PREV PAGE
      else {
        const beforeId = charges[0]?.id;

        const [
          {
            data: { data: nextPrevPageData },
          },
          {
            data: { data: checkouts },
          },
        ] = await Promise.all([
          paymentAPI.getCharges({ beforeId, limit: DEFAULT_LIMIT }),
          CheckoutAPI.getCheckouts({}),
        ]);

        return {
          charges: prevPageData,
          hasCheckout: !!checkouts.length,
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

interface PaymentState extends GetChargesState {}

const initialState: PaymentState = {
  charges: [],
  getChargesFailed: undefined,
  getChargesLoading: false,
  hasCheckout: false,
  chargesPaging: {
    hasNextPage: false,
    hasPrevPage: false,
    prevPageData: [],
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
