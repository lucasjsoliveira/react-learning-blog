var webpack = require('webpack');


var PROD = JSON.parse(process.env.PROD_ENV || '0');

let moduleExports = {
    // Aqui você define o arquivo de "entrada" do webpack. ele vai, a partir daqui, colocar todos os imports
    // no arquivo de saída.
    entry: {
        app: './src/index.js',
        vendor: [
            "es6-promise","exports-loader","imports-loader",
            "mobx","mobx-react","react","react-dom",
            "react-router","react-tether", "whatwg-fetch"
        ]
    },
    output: {
        filename: './js/bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    plugins: [
        // Isso aqui é um esquema pra incluir a função fetch do ES6 automaticamente
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        new webpack.optimize.CommonsChunkPlugin("vendor", "./js/vendor.bundle.js"),
    ]
};

if (PROD)
    moduleExports.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
    }));

module.exports = moduleExports;