var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './app/index.jsx',
    output: { path: __dirname + '/app/public', filename: 'bundle.js' },
    module: {
        loaders: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react'],
                plugins: ['transform-class-properties']
            }
        }]
    }
}