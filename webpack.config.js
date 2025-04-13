import { fileURLToPath } from 'url';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.jsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
          },
        },
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
  output: {
    clean: true,
    filename: 'index.js',
    path: path.resolve(dirname, 'dist'),
  },
  devServer: {
    static: path.resolve(dirname, 'dist'),
    port: 9000,
    hot: true,
    open: true,

  },
  ignoreWarnings: [
    {
      module: /module2\.js\?[34]/,
    },
    {
      module: /[13]/,
      message: /homepage/,
    },
    /warning from compiler/,
    () => true,
  ],
};
