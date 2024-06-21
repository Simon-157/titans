import { useQuery } from '@tanstack/react-query';
import { useAllRentals } from './useAllRentals';

export function useRentalsRented() {
  const allRentals = useAllRentals();

  return useQuery(
    [
      'useRentalsRented',
      allRentals.data?.map((r) => r.pubkey.toString()).join(''),
    ],
    () => {
      return allRentals.data?.filter((r) => Boolean(r.parsed.taker));
    },
    {
      enabled: allRentals.isFetched,
    },
  );
}
