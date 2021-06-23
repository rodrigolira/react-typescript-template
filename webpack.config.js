const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (envVars) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const isDevelopment = !isProduction;
  const isDevelopmentBuild = isDevelopment && envVars.WEBPACK_BUILD === true;

  return {
    entry: path.resolve(__dirname, './src/index.tsx'),
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    output: {
      path: path.resolve(__dirname, './build'),
      filename: isProduction ? 'static/js/[name].[contenthash:8].js' : 'static/js/[name].js',
      chunkFilename: isProduction ? 'static/js/[name].[contenthash:8].chunk.js' : 'static/js/[name].chunk.js',
      assetModuleFilename: isProduction ? 'static/images/[name].[contenthash:8][ext]' : 'static/images/[name][ext]',
      clean: true,
    },
    devtool: isProduction ? false : 'cheap-module-source-map',
    devServer: isProduction
      ? undefined
      : {
          port: 3000,
          open: false,
          hot: true,
          contentBase: path.resolve(__dirname, './public'),
        },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'initial',
          },
        },
      },
      runtimeChunk: {
        name: (entrypoint) => `runtime-${entrypoint.name}`,
      },
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset',
        },
        {
          test: /\.s?css$/,
          use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'sass-loader'].filter(
            Boolean
          ),
        },
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            template: path.resolve(__dirname, './public/index.html'),
            inject: 'body',
          },
          isProduction
            ? {
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
              }
            : {}
        )
      ),
      isDevelopment && !isDevelopmentBuild && new ReactRefreshWebpackPlugin(),
      isProduction &&
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].[contenthash:8].css',
          chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        }),
    ].filter(Boolean),
  };
};
