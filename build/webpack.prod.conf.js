/**
 * @description 将项目打包为可部署的Web应用.
 * @author wangsl.
 * */
let CopyWebpackPlugin = require('copy-webpack-plugin');

// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const config = require('../config/index');
const customBuild = require('./utils/customBuildUtil');
const types = require('./constants/appType');
//
let buildType = process.env.BUILD_TYPE || types.WEB_APP;

let files = customBuild.getCopyFiles([], buildType);


//配置发布npm包的配置.
//npm 包源文件在src/目录中. 其余外部可忽略.
let htmlPlugins = [];
/**
 * @description 组件包配置
 *
 * @author wangsl
 * @date 2018-07-31
 *
 */
let isProd = process.env.NODE_ENV === 'production';
let prePlugins = [
    new CopyWebpackPlugin([
        {
            from: './static',
            to: 'static',
            toType: 'dir',
            ignore: ['*.md']
        }
    ].concat(files)),
];

//


let allPlugins = prePlugins.concat(htmlPlugins);

let webpackConfig = {
    // entry: appConfigData.entryPoints,
    devtool: false,
    // mode: 'development',
    // output: outConfig,
    plugins: allPlugins,
    // plugins: [],
    // 分离配置文件...

    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             'appConfig': {
    //                 // test: /Config.js$/gi,
    //                 test: /gisConfig.js$|moduleConfig.js$/gi,
    //                 name: "appConfig",
    //                 chunks: "all",
    //                 minChunks: 1,
    //                 enforce: true,
    //                 priority: 10
    //             }
    //         }
    //     }
    // },
};

//
//


//
if (isProd) {

    // webpackConfig.optimization = {
    //     splitChunks: {
    //         cacheGroups: {
    //             'appConfig': {
    //                 // test: /Config.js$/gi,
    //                 test: /gisConfig.js$|moduleConfig.js$/gi,
    //                 name: "appConfig",
    //                 chunks: "all",
    //                 minChunks: 1,
    //                 enforce: true,
    //                 priority: 10
    //             }
    //         }
    //     }
    // };
    //
    // webpackConfig.plugins.push(
    //     new UglifyJsPlugin({
    //         cache: true,
    //         parallel: true,
    //         // exclude: /^appConfig/i,
    //         uglifyOptions: {
    //             compress: {
    //                 warnings: false,
    //                 drop_console: true,//console
    //                 pure_funcs: ['console.log', 'debugger']//移除console
    //             }
    //         },
    //         sourceMap: false,
    //         // parallel: true
    //     }));
    // 开启 gzip
    if (config.build.productionGzip) {
        let CompressionWebpackPlugin = require('compression-webpack-plugin');

        webpackConfig.plugins.push(
            new CompressionWebpackPlugin({
                // asset: '[path].gz[query]',
                // filename: '[path].gz[query]',
                filename(info) {
                    return `${info.path}.gz${info.query}`
                },
                algorithm: 'gzip',

                test: new RegExp(
                    '\\.(' +
                    config.build.productionGzipExtensions.join('|') +
                    ')$'),

                // test:productionGzipExtensions,
                threshold: 10240,
                minRatio: 0.8
            })
        )
    }

    if (config.build.bundleAnalyzerReport) {
        let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
        webpackConfig.plugins.push(new BundleAnalyzerPlugin())
    }
}


module.exports = webpackConfig;
