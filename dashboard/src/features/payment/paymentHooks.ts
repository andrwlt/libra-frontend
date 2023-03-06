import { useEffect } from 'react';
import { useAppSelector, useAppDispatch, useFailed } from 'app/hooks';
import { selectChargesState, getCharges } from './paymentSlice';

export const useCharges = () => {
  const state = useAppSelector(selectChargesState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCharges());
  }, [dispatch]);

  useFailed(state.getChargesFailed);

  return state;
};
