
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/serverless/lambda.ts',
  mode: 'production',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [path.join(__dirname, 'test')],
        use: 'ts-loader',
      },
    ],
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.resolve(__dirname), 'node_modules'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: 'commonjs2',
    },
  },
  plugins: [new ForkTsCheckerWebpackPlugin(), new CleanWebpackPlugin()]
};

