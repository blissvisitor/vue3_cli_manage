/**
 * @description ...
 * @author wangsl wangsl@dse.cn
 * @version v1.0.0
 * @date create Administrator on 2019/3/28
 *
 */

const custom = require('../../custom.build');
const types = require('../constants/appType');
//
let copyFiles = custom.copyFiles || [];

/**
 * @description 合并打包时需要复制的自定义文件
 * @param {Array} source  需要合并的数组
 * @param {String} appType 应用类型
 * @return {Array<Object>} 合并后的数组
 * */
function mergeCopyFiles(source = [], appType = '') {
    //
    //
    let items = [];
    copyFiles.forEach((item) => {
        source.push({
            //
            from: item[0],
            to: item[1],
            toType: item[2],
            ignore: item[3]
        });
    });
    //
    //
    items = source;

    //构建GIS框架打包个性化文件
    if (appType === types.GIS_APP) {

        let configData = require('../../package.json');
        let fileUtils = require('./fileUtils');
        //
        let gisFiles = fileUtils.getCopyFiles(configData) || [];
        //
        items = source.concat(gisFiles);
    }
    //
    return items;
}

module.exports.getCopyFiles = mergeCopyFiles;
