const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 抽取css文件
const webpack = require('webpack');
const path = require("path");

module.exports = {
    // context: process.cwd(), // 上下文，项目打包的相对路径,必须是绝对路径  
    mode: 'development', // none production development
    // entry: './src/index.js', // 执行构建的入口(项目入口),可支持字符串、数组、对象
    // entry: ['./src/index.js', './src/other.js'], // 数组
    entry: { // 对象
        index: './src/index.js',
        other: './src/other.js',
    },
    // entry 数组: webpack会自动生成另外一个入口模块，并将数组中的每个指定的模块加载进来，并将最后一个模块的module.exports作为入口模块的module.exports导出
    // entry 对象: 多页面应用构建，多入口对应多出口
    output: {
        path: path.join(__dirname, 'dist'), // 构建的文件资源放置位置,必须是绝对路径
        // filename: 'bundle.js' // 构建的文件资源名字 单页面应用
        filename: '[name]-[hash:6].js' // 构建的文件资源名字 多页面应用
            // 占位符: 
            // hash (最长20位，整个项目的hash值，每构建一次会生成新的hash) 
            // chunkhash ('[name]-[chunkhash:6].js')根据不同入口entry进行依赖解析，构建对应的chunk，生成相应的hash，只要组成entry的模块没有内容改动，则对应的hash不变
            // name 
            // id 
    },
    module: {
        rules: [{
                // js 文件才使用 babel
                test: /(\.jsx?)$/,
                loader: 'babel-loader?cacheDirectory=true',
                // 不再次编译node_modules文件夹下的js文件
                exclude: /(node_modules)/,
            },
            {
                test: /\.scss$/,
                // loader，模块转换，它的执行顺序是从后往前
                use: [
                    // css-loader 把css模块的内容加入到js模块中
                    // style-loader 是从js中提取css的loader，在html中创建style标签，把css的内容放到这个style标签中
                    // 'style-loader', // 要分离处理,不再需要style-loader
                    MiniCssExtractPlugin.loader,
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
                        outputPath: 'images/', // 图片输出的路径
                        limit: 2 * 1024 // 推荐小体积的图片资源转成base64
                    }
                }
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: '[name]-[hash:5].min.[ext]',
                        limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
                        publicPath: 'fonts/',
                        outputPath: 'fonts/'
                    }
                }]
            }
        ]
    },
    resolve: {
        // modules: [path.resolve(__dirname, './node_modules')],
        extensions: ['.js', '.jsx', '.scss', '.css'],
        alias: {
            '&': path.join(__dirname, './src'),
            '@': path.join(__dirname, './src/css'),
            pages: path.join(__dirname, './src/pages'),
            router: path.join(__dirname, './src/router'),
        }
    },
    optimization: {
        // 代码分割按需加载、提取公共代码
        splitChunks: {
            chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
        },
    },
    // devtool: 'source-map', // 生产环境默认为'none'，开发环境默认开启source-map  ?? 抱错根源
    // devtool: 'cheap-inline-eval-source-map', // 生产环境默认为'none'，开发环境默认开启source-map  ?? 抱错根源
    plugins: [ // 作用于webpack整个打包周期的
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // 选择html模板
            title: '首页',
            filename: 'index.html', // 最终创建的文件名
            template: path.join(__dirname, 'src/index.html') // 指定模板路径
        }),
        new webpack.HotModuleReplacementPlugin(), // HMR css
        // HMR 不支持 css的contenthash, 以及js的chunkhash
        new MiniCssExtractPlugin({ // 支持css的提取
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    devServer: {
        hot: true,
        contentBase: path.join(__dirname, './dist'),
        open: true,
        host: '127.0.0.1',
        port: 8000,
        historyApiFallback: true, // 所有的404都连接到index.html
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
        after() {

        }
    },
}