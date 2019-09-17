/**
 * @description ...
 * @author wangsl 397838921@qq.com
 * @version v1.0.0
 * @date create Administrator on 2019/3/27
 *
 */
const types = require('../constants/appType');

/**
 * @description 获取框架打包信息
 *
 * @param {String} frameType 类型 取值范围 web_app_fra, web_pkg_fra, gis_app_fra,gis_pkg_fra
 *
 * @return {Object} 框架配置文件.
 * */

function getFrameworkConfig(frameType) {
    //
    let extraConfig = {};
    //
    if (!frameType) {
        return;
    }
    switch (frameType) {
        case  types.WEB_APP_FRA:
            extraConfig = require('./web.app.conf.js');
            break;
        case  types.WEB_PKG_FRA:
            extraConfig = require('./web.pkg.conf.js');
            break;
        case types.GIS_APP_FRA:
            extraConfig = require('./gis.app.conf.js');
            break;
        case types.GIS_PKG_FRA:
            extraConfig = require('./gis.pkg.conf.js');
            break;
        default:
            break;
    }
    //
    return extraConfig;

}

/**
 * @description 获取 WebPack 配置文件.
 *
 * @author wangsl wangsl@dse.cn
 *
 * @param{Object} appType 打包类型.
 * @return {Object} 配置信息.
 * */
function getWebpackExtraConfig(appType) {
    //
    let extraConfig = {};
    //
    switch (appType) {
        case types.WEB_APP:
        case  types.GIS_APP:
            extraConfig = require('../webpack.prod.conf');
            break;
        // case  types.GIS_APP:
        //     extraConfig = require('../webpack.prod.gis.conf');
        //     break;
        // case types.GIS_PKG:
        //     extraConfig = require('../webpack.prod_pkg_gis.conf');
        //     break;
        case  types.WEB_PKG:
        case  types.GIS_PKG:
            extraConfig = require('../webpack.prod_pkg.conf');
            break;

        case  types.WEB_APP_FRA:
        case  types.WEB_PKG_FRA:
        case  types.GIS_APP_FRA:
        case  types.GIS_PKG_FRA:
            extraConfig = require('../webpack.prod.fra.conf');
            break;
        default:
            break;
    }

    return extraConfig;
}

//
function setBuildExtraParam(config) {
    //
    if (process.env.NODE_ENV === 'production') {
        //
        let compress = config.optimization.minimizer[0].options.terserOptions.compress;
        //
        if (compress) {
            //
            compress.drop_console = true;
            compress.drop_debugger = true;
        }
        // config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    }
    return config;
}

//获取框架配置文件..
module.exports.getFrameworkConfig = getFrameworkConfig;
//
module.exports.getWebpackExtraConfig = getWebpackExtraConfig;

module.exports.setMinimizer = setBuildExtraParam;
