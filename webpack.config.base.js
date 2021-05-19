const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require("path");

// 环境设置
const node_env = process.env.NODE_ENV;

module.exports = {
    entry: { // 对象
        index: './src/index.js',
        other: './src/other.js',
    },
    resolve: {
        // modules: [path.resolve(__dirname, './node_modules')], // X
        modules: [path.resolve(__dirname, "src"), 'node_modules'],
        // modules: ['node_modules'],
        extensions: ['.js', '.jsx', '.scss', '.css'],
        alias: {
            '&': path.join(__dirname, './src'),
            '@': path.join(__dirname, './src/css'),
            pages: path.join(__dirname, './src/pages'),
            router: path.join(__dirname, './src/router'),
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'node_env': JSON.stringify(node_env),
        })
    ],
}