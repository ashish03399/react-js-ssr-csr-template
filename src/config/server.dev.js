const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
var nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  entry: resolveApp('server/index.js'),
  output: {
    path: path.resolve('build'),
    filename: 'compiledServer.js',
  },
  externals: [nodeExternals()],
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
  plugins: [new ExtractCssChunks({
    filename: 'css/[name]_server.css' //TODO will change it to inline css
  })],
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
};
