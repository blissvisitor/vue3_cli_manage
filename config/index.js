// see http://vuejs-templates.github.io/webpack for documentation.
// var path = require('path');
// let extConfigData = require('./extconfig');
let share = require('./share.json');
// let packageConfig = require('../package.json');


// let mainPoint = '../' + packageConfig.projectName + '/index.html';
// let assetsRoot = '../' + packageConfig.projectName;

// let rootDir = packageConfig.projectName.split('/')[1];
module.exports = {
    build: {
        // env: require('./prod.env'),
        // index: path.resolve(__dirname, mainPoint),
        // assetsRoot: path.resolve(__dirname, assetsRoot),
        // assetsSubDirectory: '',
        // assetsPublicPath: packageConfig.projectName,
        // productionSourceMap: false,
        // rootDir: rootDir,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report,
        //构建类型.. web_app , web_pkg, gis_app,gis_pkc
        buildType: 'web_app',
        projectName: share.projectName
        //是否提取Vue中的样式到单独的css文件. 懒加载的时候需要设置为false.
        // isExtractCss: false,
    },
    dev: {
        // 不设置为 自动获取端口.
        port: 8081,

        // autoOpenBrowser: false,
        // assetsSubDirectory: 'static',
        // assetsPublicPath: '/',
        // 开发时配置代理.
        proxyTable: {
            // '/oauth/': 'http://10.100.50.104:8070',
            // '/oauth/': 'http://10.100.50.185:8070',
            // //
            // '/user/': 'http://10.100.50.104:8050',
            // //
            // '/arcgis_js_api/': 'http://10.100.3.213:8096',
            // '/baseplatform/': 'http://10.100.50.104:8085',
            '/ncysgc': {
                // target: 'http://10.100.50.77:8018',
                target: 'http://10.100.50.170:8091',
                // target: 'http://10.100.50.197:8091',
                changeOrigin: true
            },
            '/api': {
                target: 'http://10.100.50.155:3000',
                changeOrigin: true
            }
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        // cssSourceMap: false
    },
    //是否分入口打包文件.
    isMultiPages: false,

    // projectName: 'gis3d'
};
