import { useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch, useFailed } from 'app/hooks';
import { selectChargesState, getCharges } from './paymentSlice';

export const useCharges = () => {
  const state = useAppSelector(selectChargesState);
  const dispatch = useAppDispatch();

  const fetchCharges = useCallback(() => dispatch(getCharges()), [dispatch]);

  useEffect(() => {
    fetchCharges();
  }, [dispatch, fetchCharges]);

  useFailed(state.getChargesFailed);

  return { ...state, fetchCharges };
};
