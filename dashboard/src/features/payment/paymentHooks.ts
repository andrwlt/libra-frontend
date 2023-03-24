import { useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch, useFailed } from 'app/hooks';
import { selectChargesState, getCharges } from './paymentSlice';
import { useSearchParams } from 'react-router-dom';

export const useCharges = () => {
  let [searchParams] = useSearchParams();
  const status = searchParams.get('status');
  const createdLte = searchParams.get('created[lte]');
  const createdGte = searchParams.get('created[gte]');

  const state = useAppSelector(selectChargesState);
  const dispatch = useAppDispatch();

  const fetchCharges = useCallback((params = {}) => dispatch(getCharges(params)), [dispatch]);

  useEffect(() => {
    fetchCharges({ queryParams: { status, createdLte, createdGte }, isFilterChange: true });
  }, [dispatch, fetchCharges, status, createdLte, createdGte]);

  useFailed(state.getChargesFailed);

  return { ...state, fetchCharges };
};
