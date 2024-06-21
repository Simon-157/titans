import React, { useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Connection } from '@solana/web3.js';
import { useQuery } from '../hooks/useQuery';

export const ENVIRONMENTS = [
  {
    label: 'mainnet-beta',
    primary:
      process.env.REACT_APP_MAINNET_PRIMARY ||
      'https://wispy-solitary-frost.solana-mainnet.discover.quiknode.pro/0706057323dc7ff3b31759f29c1b83104852bb09/',
  },
  {
    label: 'testnet',
    primary: 'https://api.testnet.solana.com',
  },
  {
    label: 'devnet',
    primary: 'https://api.devnet.solana.com',
  },
];

const EnvironmentContext = React.createContext(null);

export function EnvironmentProvider({ children }) {
  const query = useQuery();

  const cluster = (query.get('project') || query.get('host'))?.includes('dev') ?
    'devnet' :
    query.get('host')?.includes('test') ?
      'testnet' :
      query.get('cluster') || process.env.BASE_CLUSTER;

  const foundEnvironment = ENVIRONMENTS.find((e) => e.label === cluster);

  const [environment, setEnvironment] = useState(
    foundEnvironment ?? ENVIRONMENTS[0],
  );

  useMemo(() => {
    const env = ENVIRONMENTS.find((e) => e.label === cluster);

    setEnvironment(env ?? ENVIRONMENTS[0]);
  }, [cluster]);

  const connection = useMemo(
    () => new Connection(environment.primary, { commitment: 'recent' }),
    [environment],
  );

  return (
    <EnvironmentContext.Provider
      value={{
        environment,
        setEnvironment,
        connection,
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  );
}

EnvironmentProvider.displayName = 'EnvironmentProvider';

EnvironmentProvider.propTypes = {
  children: PropTypes.object,
};

export function useEnvironmentCtx() {
  const context = useContext(EnvironmentContext);

  if (!context) {
    throw new Error('Missing connection context');
  }

  return context;
}
