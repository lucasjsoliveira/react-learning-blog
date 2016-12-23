var webpack = require('webpack');

module.exports = {
    // Aqui você define o arquivo de "entrada" do webpack. ele vai, a partir daqui, colocar todos os imports
    // no arquivo de saída.
    entry: {
        app: './src/index.js',
        vendor: [
            "es6-promise","exports-loader","imports-loader",
            "mobx","mobx-react","moment","react","react-dom",
            "react-paginate-component","react-router","react-tether",
            "whatwg-fetch"
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
        new webpack.optimize.CommonsChunkPlugin("vendor", "./js/vendor.bundle.js")
    ]
};