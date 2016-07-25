var webpack = require('webpack');
var SplitByPathPlugin = require('webpack-split-by-path');
module.exports = {
    entry: {app: './src/index.js'},
    output: {
        filename: './[name].js',
        chunkFilename: './[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        new SplitByPathPlugin([
                {name: 'vendor', path: __dirname + '/node_modules'}
            ], [])
    ]
};