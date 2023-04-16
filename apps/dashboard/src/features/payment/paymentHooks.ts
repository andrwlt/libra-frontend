import { useEffect, useCallback, useMemo } from 'react';
import { useAppSelector, useAppDispatch, useFailed } from 'app/hooks';
import { selectChargesState, getCharges, resetPayments } from './paymentSlice';
import { useSearchParams } from 'react-router-dom';

export const useChargeParams = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');
  const createdLte = searchParams.get('created[lte]');
  const createdGte = searchParams.get('created[gte]');

  return useMemo(() => ({ status, createdLte, createdGte }), [status, createdLte, createdGte]);
};

export const useCharges = () => {
  const { status, createdLte, createdGte } = useChargeParams();

  const state = useAppSelector(selectChargesState);
  const dispatch = useAppDispatch();

  const queryParams = useMemo(() => {
    return { status, 'created[lte]': createdLte, 'created[gte]': createdGte };
  }, [status, createdLte, createdGte]);

  const fetchCharges = useCallback((params = {}) => dispatch(getCharges({ ...params, queryParams })), [
    dispatch,
    queryParams,
  ]);

  useEffect(() => {
    fetchCharges({ isFilterChanged: true });
  }, [dispatch, fetchCharges, queryParams]);

  useEffect(() => {
    return () => {
      dispatch(resetPayments());
    };
  }, [dispatch]);

  useFailed(state.getChargesFailed);

  return { ...state, fetchCharges };
};
