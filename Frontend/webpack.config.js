const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
    'axios', 'lodash', 'promise', 'redux', 'react-redux', 'react-dom',
    'redux-promise', 'redux-thunk', 'react-router-dom', 'react-number-format',
    'redux-form', 'numeral', 'babel-polyfill'
];

var env_args = 'local';

process.argv.forEach((val, idx, arr) => {
    if (val.includes('--env=')) {
        console.log('ENV : ' + val.replace('--env=', ''))
        env_args = val.replace('--env=', '')
    }
})

const config = {
    entry: {
        bundle: './src/index.js',
        vendor: VENDOR_LIBS
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js',
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true,
        host: '0.0.0.0',
        port: '3031',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    },
    module: {
        rules: [
            {
                use: {
                    loader: 'babel-loader',
                },
                test: /\.(js|jsx)$/,
                exclude: /node_modules/
            },
            {
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'sass-loader']
                }),
                test: /\.(css|scss)$/
            },
            {
                use: {
                    loader: 'file-loader'
                },
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                include: [
                    path.resolve(__dirname, 'src/fonts/Eng'),
                    path.resolve(__dirname, 'src/fonts/Thai')
                ]
            },
            {
                use: [
                    {
                        loader: 'url-loader',
                        options: { limit: 8196 }
                    },
                    'image-webpack-loader'
                ],
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)$/,
            },
            
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new ExtractTextPlugin('style.[contenthash].css'),
        new webpack.DefinePlugin({
            'Config': JSON.stringify(require('./' + env_args + '.config.json')),
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
};

module.exports = config;