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
        path: path.join(__dirname, '/dist/'),
        filename: '[name].js',
        publicPath: '/'
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
                test: /\.json?$/,
                loader: 'json'
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.less/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test:/\.(jpg|jpeg|png|svg|gif)$/,
                use:[
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 1024,
                      name: '[name]-aaa.[ext]'
                    }
                  }
                ]
              }
            
        ]
    },
    resolve:{
        extensions:['*','.js','.json']
    }, 
    
};


