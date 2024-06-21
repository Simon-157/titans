import { useQuery } from '@tanstack/react-query';

export function useMintJson(uri) {
  return useQuery(
    ['useMintJson', uri?.toString()],
    () => {
      if (!uri) return null;
      return fetch(uri).then((r) => r.json());
    },
    {
      enabled: Boolean(uri) && uri.length > 0,
    },
  );
}
