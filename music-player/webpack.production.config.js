'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractPlugin = require('extract-text-webpack-plugin');
var LoaderConfig = require('./postcss.config')

module.exports = {
    // The entry file. All your app roots fromn here.
    entry: [
        path.join(__dirname, 'app/final/index.js')
    ],
    // Where you want the output to go
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]-[hash].min.js',
    },
    plugins: [
        // webpack gives your modules and chunks ids to identify them. Webpack can vary the
        // distribution of the ids to get the smallest id length for often used ids with
        // this plugin
        new webpack.optimize.OccurrenceOrderPlugin(),

        // handles creating an index.html file and injecting assets. necessary because assets
        // change name because the hash part changes. We want hash name changes to bust cache
        // on client browsers.
        new HtmlWebpackPlugin({
            template: './app/index.tpl.html',
            inject: 'body',
            filename: './index.html'
        }),
        // handles uglifying js
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
                screw_ie8: true
            }
        }),
        // plugin for passing in data to the js, like what NODE_ENV we are in.
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: LoaderConfig
              }
          }),
          new ExtractPlugin('css/styles.[name].css')
    ],

    module: {
               
        rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: "babel-loader",
              query:
                {
                  presets:['React','es2015']
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
                use: [ 
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options:{
                            sourceMap:true,
                          }
                    },
                   ]

            },
            {
                test: /\.less$/,
                use: [ 
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options:{
                            sourceMap:true,
                          }
                    },
                    'less-loader'
                   ]
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

};
