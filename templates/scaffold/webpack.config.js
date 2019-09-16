const UI_ENV_VARS = require('./environment.build')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { resolve } = require('path')

function transformContent(content) {
  const contentStr = content.toString('utf8')
    .replace(new RegExp('9000', 'g'), process.env.UI_APP_PORT)
  return Buffer.from(contentStr)
}

module.exports = {
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    historyApiFallback: {
      rewrites: [
        { from: /.*\.html?/, to: '/' },
        { from: /^[\w/]+$/, to: '/' },
      ],
      verbose: true
    },
    open: true,
    port: process.env.UI_APP_PORT,
  },
  entry: {
    index: './src/main.js',
  },
  externals: {
    environment: JSON.stringify(UI_ENV_VARS)
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: false
          }
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist')
  },
  plugins: [
    new Dotenv({ path: resolve(__dirname, '.', '.env') }),
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      chunks: ['index', 'styles'],
      filename: './index.html',
      hash: true,
      template: './src/index.html'
    }),
    new CopyWebpackPlugin([
      { from: './assets', ignore: ['*.js'], to: 'assets' },
      { from: 'serve.template.js', to: 'serve.js', transform: transformContent },
      { from: 'package.template.json', to: 'package.json', transform: transformContent },
      { from: 'LICENSE.md', to: 'LICENSE.md' },
    ])
  ],
  resolve: {
    alias: {
      components: resolve(__dirname, 'src/components'),
      elements: resolve(__dirname, 'src/elements'),
      features: resolve(__dirname, 'src/features'),
      services: resolve(__dirname, 'src/services'),
      templates: resolve(__dirname, 'src/templates')
    },
    extensions: ['.js']
  },
  watch: false
}
