import { createSlice, Reducer } from '@reduxjs/toolkit';
import paymentAPI from './paymentAPI';
import CheckoutAPI from 'features/checkout/checkoutAPI';
import { createAppAsyncThunk } from 'app/hooks';
import { RootState } from 'app/store';
import { Charge, GetChargesState } from './types';
import { resetStore } from 'features/auth/authSlice';
import pagingHelper from 'utils/pagingHelper';

export const getCharges = createAppAsyncThunk(
  'checkout/getCharges',
  async (
    {
      isGoNext = true,
      isFilterChanged = false,
      queryParams = {},
    }: { isGoNext?: boolean; isFilterChanged?: boolean; queryParams?: any },
    { rejectWithValue, getState },
  ) => {
    try {
      const {
        payment: { charges, chargesPaging },
      } = getState();

      const params = {
        data: charges,
        request: paymentAPI.getCharges,
        searchParams: queryParams,
        paging: chargesPaging,
      };

      let pageDataPromise;

      if (isFilterChanged) {
        pageDataPromise = pagingHelper.getFirstPage<Charge>(params);
      } else if (isGoNext) {
        pageDataPromise = pagingHelper.goNext<Charge>(params);
      } else {
        pageDataPromise = pagingHelper.goBack<Charge>(params);
      }

      const [
        { data, paging },
        {
          data: { data: checkouts },
        },
      ] = await Promise.all([pageDataPromise, CheckoutAPI.getCheckouts({})]);

      return {
        data,
        paging,
        hasCheckout: !!checkouts.length,
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
      })
      .addCase(getCharges.fulfilled, (state, { payload }) => {
        state.getChargesLoading = false;
        state.charges = payload.data;
        state.hasCheckout = payload.hasCheckout;
        state.chargesPaging = payload.paging;
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
