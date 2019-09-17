/**
 * @description ...
 * @author wangsl 397838921@qq.com
 * @version v1.0.0
 * @date create Administrator on 2019/3/27
 *
 */
const com = require('./common.js');
//
//
let infoFiles = [
    ['./config/share.json', 'config/share.json', 'file'],
    ['./config/index.js', 'config/index.js', 'file'],
    ['./templates/pkg', 'src', 'dir'],
    ['./templates/app', 'examples', 'dir'],
    ['./templates/gispkg/gisLibs', 'src/gisLibs', 'dir'],
    //
    ['./vue.config_pkg.js', 'vue.config.js', 'file'],
    ['./templates/packages/package_gis_pkg.json', 'package.json', 'file'],
    ['./types', 'types', 'dir'],
    ['./templates/gispkg/store/index.js', 'examples/store/index.js', 'file'],
    ['./components.json', '', 'file'],
    //
    ['./templates/gisConfig.js', 'examples/gisConfig.js', 'file'],
    ['./templates/gisMain.js', 'examples/main.js', 'file'],
    ['./templates/gisModuleConfig.js', 'examples/moduleConfig.js', 'file'],

    ['./config/gis.base.conf.js', 'config/gis.base.conf.js', 'file'],
    ['./config/module.base.conf.js', 'config//module.base.conf.js', 'file'],
    ['./templates/static/gisconfig.js', 'static/config.js', 'file'],
];


let copyFiles = com.getCopyFiles(infoFiles);

console.log(copyFiles);

module.exports = copyFiles;
