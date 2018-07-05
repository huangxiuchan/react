'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:3001',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        path.join(__dirname, 'app/final/index.js')
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './app/index.tpl.html',
            inject: 'body',
            filename: './index.html'
          }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    // devServer: {
    //     port:3001,
    //     host:'0.0.0.0',
    //     overlay: {
    //       error: true,
    //     },
    //     hot: true,
    //     historyApiFallback: true,
    //     disableHostCheck: true,
    // },
    module: {
               
        loaders: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: "babel-loader",
              query:
                {
                  presets:['react','es2015']
                }
            },
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, '../src/components'),
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            // JSON
            {
              test: /\.json$/,
              exclude: /node_modules/,
              loader: 'json-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.less/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, '../src/sass'),
                exclude: /node_modules/,
                loader: 'style-loader!css-loader!sass-loader'
              },
            // Images
            // Inline base64 URLs for <=8k images, direct URLs for the rest
            {
              test: /\.(png|jpg|jpeg|gif|svg)$/,
              loader: 'url-loader',
              exclude: /node_modules/,
              query: {
                limit: 8192,
                name: 'images/[name].[ext]?[hash]'
              }
            }, 
            // Fonts
            {
              test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
              loader: 'url-loader',
              exclude: /node_modules/,
              query: {
                limit: 8192,
                name: 'fonts/[name].[ext]?[hash]'
              }
            }   
        ]
    },
    resolve:{
        extensions:['*','.js','.json']
    }, 
    
};


