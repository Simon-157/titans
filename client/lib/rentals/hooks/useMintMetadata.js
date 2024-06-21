import { useQuery } from '@tanstack/react-query';
import { findMintMetadataId } from '../common';
import { Metadata } from '../metadata';
import { useEnvironmentCtx } from '../providers/EnvironmentProvider';

export function useMintMetadata(mintId) {
  const { connection } = useEnvironmentCtx();

  return useQuery(
    ['useMintMetadata', mintId?.toString()],
    () => {
      if (!mintId) return null;
      return Metadata.fromAccountAddress(connection, findMintMetadataId(mintId));
    },
    {
      enabled: Boolean(mintId),
    },
  );
}
