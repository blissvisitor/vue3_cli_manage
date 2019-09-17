// let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// let CopyWebpackPlugin = require('copy-webpack-plugin');
// let CopyWebpackPlugin = require('');
// let npmPackageProd = require('./build/webpack.prod_pkg_gis.conf');
// let packageConfig = require('./package.json');

let configData = require('./config/index');
// let packageConfig = require('./package.json');
// const fileUtils = require('./build/fileUtils');
const appConfig  = require('./build/appConfig');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const path = require('path');
// const coms = require('./components.json');
//
// const crossServers = configData.dev.proxyTable || {};

const app = require('./build/config/index');
//

// let proxyTable = {};
// for (let keyField in crossServers) {
//     if (crossServers.hasOwnProperty(keyField)) {
//         proxyTable[keyField] = {
//             target: crossServers[keyField],
//             ws: true,
//             changeOrigin: true
//         };
//     }
// }

//
let buildType = process.env.BUILD_TYPE || configData.build.buildType;
let webpackConfig = {
    //
    //配置应用根路径.
    // baseUrl: process.env.NODE_ENV === 'production' ? `/${configData.build.projectName}/` : '/',
    // publicPath: process.env.NODE_ENV === 'production' ? `/${configData.build.projectName}/` : '/',
    publicPath: process.env.NODE_ENV === 'production' ? `./` : './',
    // 设置打包文件夹..
    outputDir: configData.build.projectName,
//不生成 source map 文件.
    productionSourceMap: false,
    // 代理...
    devServer: {
        // proxy: proxyTable,
        proxy: {
            '/ncysgc': {
                // target: 'http://10.100.50.77:8018', // 虚拟机 开发
                target: 'http://10.100.50.72:8188', // 虚拟机 测试
                // target: 'http://10.100.50.170:8091', // 王
                // target: 'http://10.100.50.197:8091', // 雷
                changeOrigin: true
            },
            '/api': {
                target: 'http://10.100.50.155:3000',
                changeOrigin: true
            }
        }
    },
    // assetsDir:'static',
    // indexPath: path.resolve(__dirname, 'index.html'),


    // css: {
    //   sourceMap: false,
    //   extract: false
    // },
    //修改模块合并压缩方式...
    chainWebpack: (config) => {
        // config.optimization.minimize(false);
        //
        return config;

    },

    configureWebpack: (config) => {
        //
        app.setMinimizer(config);
        return app.getWebpackExtraConfig(buildType);
        // let extraConfig = {};
        // //
        // switch (buildType) {
        //     case 'web_app':
        //
        //         extraConfig = require('./build/webpack.prod.conf');
        //         break;
        //     case  'gis_app':
        //         extraConfig = require('./build/webpack.prod.gis.conf');
        //         break;
        //     case 'gis_pkg':
        //         extraConfig = require('./build/webpack.prod_pkg_gis.conf');
        //         break;
        //     case  'web_pkg':
        //         extraConfig = require('./build/webpack.prod_pkg.conf');
        //         break;
        //
        //     case  'web_app_fra':
        //     case  'web_pkg_fra':
        //     case  'gis_app_fra':
        //     case  'gis_pkg_fra':
        //         extraConfig = require('./build/webpack.prod.fra.conf');
        //         break;
        //     default:
        //         break;
        // }
        //
        // return extraConfig;
    },
    //配置 Webpack...

};
//页面多入口打包.
if (configData.isMultiPages) {
    //
    webpackConfig.pages = appConfig.getPages();
}

if (configData.dev.port) {
    //
    webpackConfig.devServer.port = configData.dev.port;
}
//
module.exports = webpackConfig;
