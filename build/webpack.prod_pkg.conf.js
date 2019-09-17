/**
 * @description 将项目打包为npm 包.
 * @author wangsl.
 * */
// let utils = require('./utils');
// let webpack = require('webpack');
// let config = require('../config');
// let merge = require('webpack-merge');
// let baseWebpackConfig = require('./webpack.base.conf');
let CopyWebpackPlugin = require('copy-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const info = require('../components.json');
// let ExtractTextPlugin = require('extract-text-webpack-plugin');
// let OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

// let CleanWebpackPlugin = require("clean-webpack-plugin");
// const configData = require("../package.json");
const customBuild = require('./utils/customBuildUtil');

let files = customBuild.getCopyFiles(info.sources || []);

// 组件包时不打包多个模块.
// let appConfigData = {
//   entryPoints: {}
// };
// 打包第三方库时使用.
// appConfigData.entryPoints.index = './src/index.js';

// let rootDir = configData.projectName.split('\/')[1];
//配置发布npm包的配置.
//npm 包源文件在src/目录中. 其余外部可忽略.

let htmlPlugins = [];
//
let outConfig = {
    // path: '/gis3d',
    // filename: utils.assetsPath('[name].[chunkhash:18].js'),
    // chunkFilename: utils.assetsPath('[id].[chunkhash:18].js')
    filename: '[name].js',//utils.assetsPath('[name].js'),
    chunkFilename: '[name].js'//utils.assetsPath('[name].js'),
};
/**
 * @description 组件包配置
 *
 * @author wangsl
 * @date 2018-07-31
 *
 */
let npmPackageConfig = require('../src/package.json');
outConfig.libraryTarget = 'umd';
// library: 'gisframework-web3d',
outConfig.library = npmPackageConfig.name;
outConfig.umdNamedDefine = true;
// outConfig.libraryExport = "default"; // 对外暴露default属性，就可以直接调用default里的属性
//
// outConfig.globalObject = 'this';// 定义全局变量,兼容node和浏览器运行，避免出现"window is not defined"的情况

//
let prePlugins = [
    //GIS 工具打包时修改，此处和标准前端框架库有所区别.
    // @author wangsl.
    new CopyWebpackPlugin([
        {
            from: './src/styles',
            to: 'styles',
            toType: 'dir',
        }, {
            from: './types',
            to: 'types',
            toType: 'dir',
        },
        {
            from: './src/package.json',
            to: '',
            toType: 'file'
        },
        {
            from: './src/README.md',
            to: '',
            toType: 'file'
        }
    ].concat(files)),

    // new UglifyJsPlugin({
    //     uglifyOptions: {
    //         compress: {
    //             warnings: false,
    //             drop_console: true,//console
    //             pure_funcs: ['console.log']//移除console
    //         }
    //     },
    //     sourceMap: false,
    //     parallel: true
    // })
];

let allPlugins = prePlugins.concat(htmlPlugins);

let webpackConfig = {
    // entry: appConfigData.entryPoints,
    devtool: false,
    // output: outConfig,
    plugins: allPlugins,
    entry: info.components,
};
module.exports = webpackConfig;
