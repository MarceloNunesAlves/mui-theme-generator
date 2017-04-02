const webpack = require('webpack');
const { resolve, join } = require('path');
const buildPath = resolve(__dirname, 'build');
const nodeModulesPath = resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = {
  // Entry points to the project
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    join(__dirname, '/src/app/app.js')
  ],
  // Server Configuration options
  devServer: {
    contentBase: resolve(__dirname, 'src/www'),
    hot: true, // Live-reload
    inline: true,
    port: 3000, // Port Number
    host: 'localhost', // Change to '0.0.0.0' for external facing server
  },
  devtool: 'source-map',
  output: {
    path: buildPath, // Path of output file
    filename: 'app.js',
  },
  plugins: [
    // Enables Hot Modules Replacement
    new webpack.HotModuleReplacementPlugin(),
    // Moves files
    new TransferWebpackPlugin([
      { from: 'www' },
    ], resolve(__dirname, 'src')),
  ],
  module: {
    rules: [
      {
        test: /\.js$/, // All .js files
        use: ['babel-loader'],
        exclude: [nodeModulesPath],
        include: join(__dirname, 'src')
      }
    ]
  }
};

module.exports = config;
