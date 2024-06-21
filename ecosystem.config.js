const env = {
  NODE_ENV: 'production',
  SSR: '1',
};

module.exports = {
  apps: [
    {
      name: 'prod',
      script: './dist/index.js',
      node_args: '--max_old_space_size=2048 --gc_interval=500',
      env_production: env,
    },
  ],
};
