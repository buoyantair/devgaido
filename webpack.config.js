const dev = process.env.NODE_ENV !== 'production' && process.argv.indexOf('-p') === -1;

const usePreact = false;

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  devServer: {
    host: 'localhost',
    port: '8081',
    historyApiFallback: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  devtool: dev ? 'eval' : false,
  entry: dev ? [
    'webpack-dev-server/client?http://localhost:8081',
    'react-hot-loader/patch',
    path.join(__dirname, '/src/client/index.jsx'),
  ] : path.join(__dirname, '/src/client/index.jsx'),
  output: {
    publicPath: 'http://localhost:8081/',
    path: path.join(__dirname, '/dist/public'),
    filename: 'client.bundle.js',
  },
  stats: {
    colors: true,
    reasons: false,
    chunks: false,
    progress: true,
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.styl$/,
        use: dev ? ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader'] :
        ExtractTextPlugin.extract([
          {
            loader: 'css-loader',
            options: { minimize: true },
          },
          'postcss-loader',
          'stylus-loader',
        ]),
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: usePreact ? {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
      'react-addons-css-transition-group': 'rc-css-transition-group',
      'preact-compat': 'preact-compat/dist/preact-compat',
    } : {},
  },
  plugins: dev ? [
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: ({ resource }) => /node_modules/.test(resource),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ] : [
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: ({ resource }) => /node_modules/.test(resource),
    }),
    new ExtractTextPlugin('style.css'),
  ],
};


module.exports = config;
