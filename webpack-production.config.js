const webpack = require('webpack');
const { resolve, join } = require('path');
const buildPath = resolve(__dirname, 'docs');
const nodeModulesPath = resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = {
  entry: [join(__dirname, '/src/app/app.js')],
  // Render source-map file for final build
  devtool: 'source-map',
  // output config
  output: {
    path: buildPath, // Path of output file
    filename: 'app.js', // Name of output file
  },
  plugins: [
    // Define production build to allow React to strip out unnecessary checks
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // Minify the bundle
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        // suppresses warnings, usually from module minification
        warnings: false,
      },
    }),
    // Transfer Files
    new TransferWebpackPlugin([
      { from: 'www' },
    ], resolve(__dirname, 'src')),
  ],
  module: {
    rules: [
      {
        test: /\.js$/, // All .js files
        use: ['babel-loader'], // react-hot is like browser sync and babel loads jsx and es6-7
        exclude: [nodeModulesPath],
      },
    ],
  },
};

module.exports = config;
