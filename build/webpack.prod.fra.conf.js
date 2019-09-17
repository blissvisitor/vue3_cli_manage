/**
 * @description 用于将源代码构建出 前端框架,前端框架--组件，GIS框架,GIS框架--组件.
 * @author wangsl.
 * */

let CopyWebpackPlugin = require('copy-webpack-plugin');
const types = require('./constants/appType');

let buildType = process.env.BUILD_TYPE || types.WEB_APP_FRA;

const fraConfig = require('./config/index.js');
//

// let sources = info.sources || [];
let sources = [];
let files = sources.concat(fraConfig.getFrameworkConfig(buildType));

let htmlPlugins = [];
//
let prePlugins = [
    //GIS 工具打包时修改，此处和标准前端框架库有所区别.
    // @author wangsl.
    new CopyWebpackPlugin([].concat(files))
];

let allPlugins = prePlugins.concat(htmlPlugins);

let webpackConfig = {
    // entry: appConfigData.entryPoints,
    devtool: false,
    // output: outConfig,
    plugins: allPlugins,
    // entry: appConfigData.entryPoints
};
module.exports = webpackConfig;
