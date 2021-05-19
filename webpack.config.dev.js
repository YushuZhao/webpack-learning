const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

const baseConfig = require('./webpack.config.base');
const { merge } = require('webpack-merge');

const devConfig = {
    mode: 'development',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]-[hash:6].js'
    },
    module: {
        rules: [{
            test: /(\.jsx?)$/,
            exclude: /(node_modules)/,
            use: ['babel-loader']
        },
        {
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ]
        },
        {
            test: /\.(png|jpe?g|gif|svg)/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name]-[contenthash:6].[ext]',
                    outputPath: 'images/',
                    limit: 2 * 1024
                }
            }
        },
        {
            test: /\.(eot|woff2?|ttf|svg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    name: '[name]-[hash:5].min.[ext]',
                    limit: 5000,
                    publicPath: 'fonts/',
                    outputPath: 'fonts/'
                }
            }]
        }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '首页',
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        }),
    ],
    // devtool: 'cheap-inline-eval-source-map', // 生产环境默认为'none'，开发环境默认开启source-map  ?? 抱错根源
    // devtool: 'source-map',
    devServer: {
        hot: true,
        contentBase: path.join(__dirname, './dist'),
        open: true,
        host: '127.0.0.1',
        port: 8000,
        historyApiFallback: true,
        proxy: {
            // 代理到后端的服务地址，会拦截所有以api开头的请求地址
            '/api': {
                target: 'http://localhost:9092'
            }
        },
        before(app, server) { // 启动之前
            app.get("/api/mock.json", (req, res) => {
                res.json({
                    hello: "express"
                });
            });
        },
    },
}

module.exports = merge(baseConfig, devConfig)


// "scripts": {
//     // "dev": "webpack-dev-server",
//     "dev": "webpack-dev-server --config ./webpack.config.dev.js",
// }