const config = require('./config')
const colors = require('colors')
const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

console.log(`>>> mode: ${process.env.NODE_ENV}`.green)

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
        stats: 'errors-only'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json']
    },
    entry: {
        index: `./modules/${config.modules}/index.js`
    },
    output: {
        filename: './index.bundle.js',
        path: path.resolve(__dirname, `dist/${config.modules}`)
    },
    plugins: [
        ...plugins(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        // new CopyWebpackPlugin([{
        //     from: `./modules/${config.modules}/img`,
        //     to: `./img`
        // }]),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: `./modules/${config.modules}/index.html`
        }),
        new ExtractTextPlugin({
            filename: './index.bundle.css'
        })
    ],
    module: {
        rules: [
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
                    ]
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
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 50,
                        outputPath: 'img',
                        publicPath: `./img`
                    }
                }]
            }
        ]
    },
}