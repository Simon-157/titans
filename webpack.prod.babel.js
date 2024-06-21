const crypto = require('crypto');
const { existsSync, mkdirSync } = require('fs');
const { join, resolve } = require('path');
const dayjs = require('dayjs');
const dotenv = require('dotenv');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');
const { cwd } = require('./server/config');
const webpackModule = require('./webpack.module');

/**
* The MD4 algorithm is not available anymore in Node.js 17+ (because of library SSL 3).
* In that case, silently replace MD4 by the MD5 algorithm.
*/
try {
  crypto.createHash('md4');
} catch (err) {
  const origCreateHash = crypto.createHash;
  crypto.createHash = (alg, opts) => {
    return origCreateHash(alg === 'md4' ? 'md5' : alg, opts);
  };
}

const DIST_FOLDER = resolve(cwd, './dist');
const STATIC_FOLDER = resolve(cwd, './dist/static');

if (!existsSync(DIST_FOLDER)) {
  mkdirSync(DIST_FOLDER);
}

if (!existsSync(STATIC_FOLDER)) {
  mkdirSync(STATIC_FOLDER);
}

dotenv.config({
  path: resolve(cwd, './settings/.env'),
});
dotenv.config({
  path: resolve(cwd, './settings/.env.production'),
});
dotenv.config({
  path: resolve(cwd, './settings/.env.deploy'),
});

webpackModule.rules[0] = {
  test: /\.js$/,
  use: 'babel-loader',
};

module.exports = {
  target: 'web',

  mode: 'production',

  // In production, we skip all hot-reloading stuff
  entry: [
    'babel-polyfill',
    'regenerator-runtime', // Load this first
    'core-js', // Load this second
    'custom-event-polyfill',
    'es6-symbol/implement',
    'url-search-params-polyfill',
    'whatwg-fetch',
    'react', // Include this to enforce order
    'react-dom', // Include this to enforce order
    join(cwd, 'client/index.js'),
  ],

  module: webpackModule,

  resolve: {
    extensions: ['.js', '.cjs', '.mjs'],
  },

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: 'static/[name].[contenthash:5].js',
    chunkFilename: 'static/[name].[contenthash:5].chunk.js',
    publicPath: '/',
    path: resolve(cwd, 'dist'),
  },

  plugins: [
    new Dotenv({
      path: resolve(cwd, './settings/.env'),
    }),
    new Dotenv({
      path: resolve(cwd, './settings/.env.production'),
    }),
    new Dotenv({
      path: resolve(cwd, './settings/.env.deploy'),
    }),
    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: 'client/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),
    new ExtractCssChunks({
      filename: 'static/[name].[contenthash:5].css',
      chunkFilename: 'static/[name].[contenthash:5].css',
    }),
    new webpack.DefinePlugin({
      'process.env.BUILD_TIME': `"${dayjs().format('DD-MM-YYYY-HH-mm')}"`,
    }),
    new WebpackShellPlugin({
      onBuildStart: ['node ./onProductionBuildStart.js'],
      onBuildEnd: ['node ./onProductionBuildEnd.js'],
    }),
  ],

  optimization: {
    minimizer: [new TerserPlugin({
      terserOptions: {
        ecma: 5,
      },
    }), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
      chunks: 'async',
      minChunks: 2,
    },
  },

  performance: {
    hints: false,
  },
};
