var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/js/app',
    watch: true,

    output: {
        path: __dirname + '/build/js',
        filename: 'rts.js'
    },

    resolve: {
        extensions: ['', '.jsx', '.scss', '.js', '.json']
    },

    module: {
        loaders: [
            {
                test: /(\.js|\.jsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel'
            }, {
                test: /(\.scss|\.css)$/,
                loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass'
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('style.css', { allChunks: true })
    ]
};