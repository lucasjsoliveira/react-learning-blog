var webpack = require('webpack');
var SplitByPathPlugin = require('webpack-split-by-path');
module.exports = {
    // Aqui você define o arquivo de "entrada" do webpack. ele vai, a partir daqui, colocar todos os imports
    // no arquivo de saída.
    entry: {app: './src/index.js'},
    output: {
        filename: './[name].js',
        chunkFilename: './[name].js'
    },
    module: {
        loaders: [
            {
                // Aqui é onde a mágica acontece, o webkack passa os arquivos fonte pelos presets dentro da query
                // da direita para esquerda (primeiro JSX pra ES6, depois ES6 pra ES5)
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['decorators-legacy', 'es2015', 'react'],
                    plugins: ['transform-class-properties']
                }
            }
        ]
    },
    plugins: [
        // Isso aqui é um esquema pra incluir a função fetch do ES6 automaticamente
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),

        // Isso aqui é um plugin que me permite separar meu código em um js de saída diferente da pasta node_modules.
        // o output do meu webpack são 3 arquivos, vendor.js, app.js (nome este definido lá em cima no entry) e um
        // manifest.js (que o plugin SplitByPath gera por algum motivo pra manter todos os arquivos separados funcionando.
        new SplitByPathPlugin([
                {name: 'vendor', path: __dirname + '/node_modules'}
            ], [])
    ]
};