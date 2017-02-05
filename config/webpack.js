var path = require('path');
var webpack = require('webpack');

var plugins = [];
if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    comments: false
  }));
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }));
}

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, '../src/client/scripts/client.js')
  },
  output: {
    path: path.resolve(__dirname, '../src/client/static/dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /src\/.+.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: plugins
};
