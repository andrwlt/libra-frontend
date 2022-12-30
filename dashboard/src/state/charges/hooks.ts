import { useAppDispatch, useAppSelector } from 'state/hooks'

import { setCharges,  } from './reducer'

export function useCharges() {
  const dispatch = useAppDispatch()
  const loading = useAppSelector((state) => state.charges.loading);
  const charges = useAppSelector((state) => state.charges.charges);

  const fetchCharges = () => {

  };

  return { loading, charges, fetchCharges };
}