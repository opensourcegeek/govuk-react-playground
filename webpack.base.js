const { dirname, join, resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          plugins: [
            "@babel/plugin-transform-regenerator"
          ],
          presets: [
            '@babel/preset-env',
            '@babel/preset-react'
          ]
        }
      }
    ]
  }
};
