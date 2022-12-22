const path = require('path');

// Docs
// https://webpack.js.org/guides/author-libraries/

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'sandbox'),
        library: "GM",   // Important
        // libraryTarget: 'umd',   // Important
        // umdNamedDefine: true   // Important
    },
};
