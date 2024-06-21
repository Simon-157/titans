import { useQuery } from '@tanstack/react-query';
import { useAllRentals } from './useAllRentals';

export function useRentalsListed() {
  const allRentals = useAllRentals();

  return useQuery(
    [
      'useRentalsListed',
      allRentals.data?.map((r) => r.pubkey.toString()).join(''),
    ],
    () => {
      return allRentals.data?.filter((r) => !r.parsed.taker);
    },
    {
      enabled: allRentals.isFetched,
    },
  );
}
