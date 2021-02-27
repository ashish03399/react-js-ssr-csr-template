const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// will extract css in new file
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
console.log('Starting client side webpack')
module.exports = {
  // define entry file and output
  name: 'client',
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
  entry: {
    main: [
      'webpack-hot-middleware/client',
      resolveApp('src/index.js')
    ]
  },
  target: 'web',
  output: {
    path: path.resolve('build'),
    publicPath: '/static/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  // define babel loader
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [ExtractCssChunks.loader, 'css-loader'],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: [
          ExtractCssChunks.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[local]--[hash:base64:5]',
              },
            },
          },
        ],
        include: /\.module\.css$/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new ExtractCssChunks({
      filename: 'css/[name].css'
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
};
