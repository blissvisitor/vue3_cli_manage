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
    //
    ['./vue.config_pkg.js', 'vue.config.js', 'file'],
    ['./templates/packages/package_web_pkg.json', 'package.json', 'file'],
    ['./types', 'types', 'dir'],
    ['./components.json', '', 'file']
];


let copyFiles = com.getCopyFiles(infoFiles);

console.log(copyFiles);

module.exports = copyFiles;
