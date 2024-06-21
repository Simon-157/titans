if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

// const isDev = process.env.NODE_ENV !== 'production';
// const isDev = false;

module.exports = {
  presets: [
    'babel-preset-react-app',
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          app: './client/app',
          assets: './assets',
          components: './client/components',
          pages: './client/pages',
          reducers: './client/reducers',
          routes: './client/routes',
          collections: './server/collections',
        },
      },
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-logical-assignment-operators',
  ],
  env: {
    production: {
      plugins: [
        [
          '@babel/plugin-proposal-class-properties',
          {
            loose: true,
          },
        ],
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-transform-logical-assignment-operators',
        '@babel/plugin-transform-modules-commonjs',
        '@babel/plugin-transform-react-constant-elements',
        'transform-react-remove-prop-types',
      ],
    },
  },
};
