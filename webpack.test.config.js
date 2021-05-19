const baseConfig = require('./webpack.config.base');
const devConfig = require('./webpack.config.dev');
const proConfig = require('./webpack.config.pro');
const { merge } = require('webpack-merge');

// module.exports可暴露一个函数，环境变量作为此函数的参数
module.exports = (env) => {
    if (process.env.NODE_ENV == 'pro') {
        return merge(baseConfig, proConfig);
    } else {
        return merge(baseConfig, devConfig);
    }
}

// env参数可以直接从package.json的scripts里获取的写法:
// "test:build": "webpack --env.production --config webpack.test.config.js",

/*
    if (env && env.production) {
        return merge(baseConfig, proConfig);
    } else {
        return merge(baseConfig, devConfig);
    }
*/

// cross-env 能跨平台地设置及使用环境变量的工具;抹平windows平台 macos平台的路径差异

// windows \ \ \ \
// mac / / / /
// process.env.NODE_ENV 获取环境变量