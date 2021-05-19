const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 抽取css文件
const OptimizeCSSAssetsplugin = require('optimize-css-assets-webpack-plugin');
const path = require("path");

const baseConfig = require('./webpack.config.base');
const { merge } = require('webpack-merge');

const proConfig = {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name]-[hash:6].js'
    },
    module: {
        rules: [{
            test: /(\.jsx?)$/,
            exclude: /(node_modules)/,
            use: ['babel-loader']
        },
        {
            test: /\.scss$/,
            include: path.resolve(__dirname, './src'),
            use: [
                MiniCssExtractPlugin.loader, // 抽离css
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
            template: path.join(__dirname, 'src/index.html'),
            minify: { // 压缩html文件的体积
                removeComments: true,
                collapseWhitespace: true,
                minifyCSS: true // 压缩内联css
            }
        }),
        new MiniCssExtractPlugin({ // 支持css的提取
            filename: "css/[name]-[contenthash:8].css",
        }),
        new OptimizeCSSAssetsplugin({ // 压缩css文件的体积
            cssProcessor: require('cssnano'),
            cssProcessorOption: {
                discardComments: { removeAll: true }
            }
        })
    ],
};

module.exports = merge(baseConfig, proConfig)