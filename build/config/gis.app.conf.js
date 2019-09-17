/**
 * @description 构建GIS框架--项目
 * @author wangsl wangsl@dse.cn
 * @version v1.0.0
 * @date create Administrator on 2019/3/27
 *
 */

const com = require('./common.js');
//
let infoFiles = [
    ['./config/share.json', 'config/share.json', 'file'],
    ['./config/index.js', 'config/index.js', 'file'],
    ['./config/gis.base.conf.js', 'config/gis.base.conf.js', 'file'],
    ['./config/module.base.conf.js', 'config//module.base.conf.js', 'file'],
    ['./templates/static/gisconfig.js', 'static/config.js', 'file'],
    //
    ['./templates/app', 'src', 'dir'],
    ['./templates/gisConfig.js', 'src/gisConfig.js', 'file'],
    ['./templates/gisMain.js', 'src/main.js', 'file'],
    ['./templates/gisModuleConfig.js', 'src/moduleConfig.js', 'file'],
    //
    ['./vue.config.js', 'vue.config.js', 'file'],
    ['./templates/packages/package_gis_app.json', 'package.json', 'file'],
    // ['./templates/gispkg/store/index.js', 'src/store/index.js', 'file'],
    ['./templates/gispkg', 'src', 'dir'],

];


let copyFiles = com.getCopyFiles(infoFiles);

console.log(copyFiles);

module.exports = copyFiles;




