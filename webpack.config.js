const crypto = require('crypto');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

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

const isDev = process.env.NODE_ENV !== 'production';

const plugins = [];

if (isDev) {
  const CircularDependencyPlugin = require('circular-dependency-plugin');
  const NodemonPlugin = require('nodemon-webpack-plugin');

  plugins.push(
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      failOnError: false,
    }),
    new NodemonPlugin({
      watch: ['dist/index.js'],
      script: './dist/index.js',
    }),
  );
}

module.exports = {
  entry: path.resolve(__dirname, `./server/index${process.env.SSR ? 'WithSSR' : ''}.js`),

  target: 'node',

  externals: [
    nodeExternals({
      allowlist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: 'current',
                  },
                  useBuiltIns: 'entry',
                  corejs: {
                    version: 3,
                  },
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[local]-[contenthash:5]',
              },
              onlyLocals: true,
              sourceMap: false,
              url: false,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ['css-loader'],
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
  },

  resolve: {
    extensions: ['.js', '.cjs', '.mjs'],
  },

  plugins,

  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist'),
  },

  performance: {
    hints: false,
  },

  optimization: {
    minimize: false,
  },
};
