const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const getCacheIdentifier = require('react-dev-utils/getCacheIdentifier');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  rules: [
    {
      test: /\.js$/,
      include: /node_modules\/react-dom/,
      use: ['react-hot-loader/webpack'],
    },
    {
      test: /\.c?js$/,
      exclude:
        isDev ?
          /node_modules\/(?!(@noble|@solana|@wallet-standard|rpc-websockets)\/).*/ :
          /node_modules\/(?!(@noble|@solana|@wallet-standard|ansi-regex|debug|flatted|init-array|jsonwebtoken|redux-immer|rpc-websockets)\/).*/,
      loader: 'babel-loader',
      options: {
        // Make sure we have a unique cache identifier, erring on the
        // side of caution.
        // We remove this when the user ejects because the default
        // is sane and uses Babel options. Instead of options, we use
        // the react-scripts and babel-preset-react-app versions.
        cacheIdentifier: getCacheIdentifier(
          isDev
            ? 'development'
            : 'production',
          [
            'babel-plugin-named-asset-import',
            'babel-preset-react-app',
            'react-dev-utils',
            'react-scripts',
          ],
        ),
        // This is a feature of `babel-loader` for webpack (not Babel itself).
        // It enables caching results in ./node_modules/.cache/babel-loader/
        // directory for faster rebuilds.
        cacheDirectory: true,
        // See #6846 for context on why cacheCompression is disabled
        cacheCompression: false,
        compact: !isDev,
      },
    },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [
        (isDev && !process.env.SSR) ?
          'style-loader' :
          ExtractCssChunks.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: {
              localIdentName: '[local]-[contenthash:5]',
            },
            sourceMap: false,
            url: false,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: false,
          },
        },
      ],
    },
    {
      test: /\.css$/,
      include: /node_modules/,
      use: [
        (isDev && !process.env.SSR) ?
          'style-loader' :
          ExtractCssChunks.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            url: false,
          },
        },
      ],
    },
    {
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            expandProps: 'end',
          },
        },
      ],
    },
  ],
};
