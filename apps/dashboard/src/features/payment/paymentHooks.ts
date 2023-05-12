import { useEffect, useMemo } from 'react';
import { useAppSelector, useAppDispatch, useFailed, useURLQueryParams } from 'app/hooks';
import { selectChargesState, getCharges, resetPayments } from './paymentSlice';
import { useSearchParams } from 'react-router-dom';
import { GetChargesState } from './types';

export const CHARGES_PARAMS = {
  STATUS: 'status',
  CREATED_LTE: 'created[lte]',
  CREATED_GTE: 'created[gte]',
};

const { STATUS, CREATED_LTE, CREATED_GTE } = CHARGES_PARAMS;

export const useChargeParams = () => {
  const baseParams = useURLQueryParams();
  const [searchParams] = useSearchParams();
  const status = searchParams.get(STATUS) || undefined;
  const createdLte = searchParams.get(CREATED_LTE) || undefined;
  const createdGte = searchParams.get(CREATED_GTE) || undefined;

  return useMemo(() => ({ status, createdLte, createdGte, ...baseParams }), [
    status,
    createdLte,
    createdGte,
    baseParams,
  ]);
};

export const useCharges = (): GetChargesState => {
  const { beforeId, afterId, status, createdGte, createdLte } = useChargeParams();

  const state = useAppSelector(selectChargesState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getCharges({
        beforeId,
        afterId,
        status,
        [CREATED_LTE]: createdLte,
        [CREATED_GTE]: createdGte,
      }),
    );
  }, [dispatch, beforeId, afterId, status, createdGte, createdLte]);

  useEffect(() => {
    return () => {
      dispatch(resetPayments());
    };
  }, [dispatch]);

  useFailed(state.getChargesFailed);

  return state;
};
