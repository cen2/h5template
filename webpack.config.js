const config = require('./config')
const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function plugins() {
  switch (process.env.NODE_ENV) {
    case 'development':
      return [
        new webpack.HotModuleReplacementPlugin()
      ]
    case 'production':
      return [
        new CleanWebpackPlugin([`dist/${config.modules}/`])
      ]
  }
}

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: process.env.NODE_ENV === 'development' ? 'cheap-module-eval-source-map' : 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname),
    host: config.host,
    port: config.port,
    open: false,
    hot: false,
    overlay: true,
    stats: 'errors-only',
    proxy: {
      '/api': {
        target: 'https://api.github.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js'
    },
    extensions: ['.js', '.vue', '.json']
  },
  entry: {
    index: `./src/${config.modules}/index.js`
  },
  output: {
    filename: `./js/${config.modules}.js`,
    path: path.resolve(__dirname, `dist/${config.modules}`)
  },
  plugins: [
    ...plugins(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.SERVER_URL': JSON.stringify(config.server)
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: `./src/${config.modules}/index.html`
    }),
    new ExtractTextPlugin({
      filename: `./css/${config.modules}.css`
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        use: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: config.minimize && process.env.NODE_ENV === 'production'
              }
            },
            {
              loader: 'postcss-loader'
            }
          ],
          publicPath: '../'
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: config.minimize && process.env.NODE_ENV === 'production'
              }
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'less-loader'
            }
          ]
        })
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: '[hash:8].[name].[ext]',
            limit: 3072,
            outputPath: 'images'
          }
        }]
      }
    ]
  },
}
