/* global process */
/* eslint-disable no-process-env */

import path from 'path';
import webpack from 'webpack';

import clientConfig from '../client';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  context: path.resolve(__dirname, '../../'),
  entry: {
    bundle: './src/client/scripts/client.js'
  },
  output: {
    path: './src/client/static/dist',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /src\/.+.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.txt$/,
        exclude: /node_modules/,
        loader: 'raw-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      config: JSON.stringify(clientConfig),
      ...(isProduction && {
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      })
    }),
    isProduction && new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      comments: false
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
      // Don't bundle Raven if Sentry isn't used; alias it to a dummy import that's already included
      'raven-js': clientConfig.sentry.dsn ? 'raven-js' : 'react'
    }
  }
};
