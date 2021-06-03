const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    port: 3000,
    open: false,
    hot: true,
    contentBase: path.resolve(__dirname, '..', 'public'),
  },
  plugins: [
    new ReactRefreshWebpackPlugin()
  ]
}
