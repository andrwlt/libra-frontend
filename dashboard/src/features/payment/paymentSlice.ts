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
  async (
    {
      isGoNext = false,
      isFilterChanged = false,
      queryParams = {},
    }: { isGoNext?: boolean; isFilterChanged?: boolean; queryParams?: any },
    { rejectWithValue, getState },
  ) => {
    try {
      const {
        payment: {
          charges,
          chargesPaging: { prevPageData },
        },
      } = getState();

      if (isGoNext || isFilterChanged) {
        const afterId = isFilterChanged ? undefined : charges[charges.length - 1]?.id;

        const [
          {
            data: { data: pageData },
          },
          {
            data: { data: checkouts },
          },
        ] = await Promise.all([
          paymentAPI.getCharges({ afterId, limit: DEFAULT_LIMIT + 1, ...queryParams }),
          CheckoutAPI.getCheckouts({}),
        ]);

        const { hasNextPage, data: chargesData } = getPagingData(pageData);

        return {
          charges: chargesData,
          hasCheckout: !!checkouts.length,
          paging: {
            hasNextPage,
            hasPrevPage: isFilterChanged ? false : !!charges.length,
            prevPageData: isFilterChanged ? [] : charges,
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
          paymentAPI.getCharges({ beforeId, limit: DEFAULT_LIMIT, ...queryParams }),
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
      .addCase(getCharges.fulfilled, (state) => {
        state.getChargesLoading = false;
        // state.charges = payload.charges;
        // state.hasCheckout = payload.hasCheckout;
        state.charges = [
          {
            id: '12345',
            from: 'abc',
            to: 'abcd',
            amount: 123456,
            asset: 'wnd',
            description: 'test',
            metadata: {},
            hash: 'string',
            created: '1231313131',
            status: 'pending',
          },
        ];
        state.hasCheckout = true;
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
