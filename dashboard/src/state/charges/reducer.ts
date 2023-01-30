import { createSlice } from '@reduxjs/toolkit';
import { shallowEqual } from 'react-redux';

interface Charge {
  id: string;
  object: string;
  from: string;
  to: string;
  amount: number;
  asset: string;
  description: string;
  metadata: any;
  hash: string;
  created: string;
}

interface ChargesState {
  loading: boolean;
  charges: Charge[];
}

const initialState: ChargesState = {
  loading: false,
  charges: [],
};

const chargesSlices = createSlice({
  name: 'charges',
  initialState,
  reducers: {
    setLoading(state, { payload }) {
      state.loading = payload;
    },
    setCharges(state, { payload }) {
      state.charges = payload;
    },
  },
});

export const { setCharges } = chargesSlices.actions;
export default chargesSlices.reducer;
