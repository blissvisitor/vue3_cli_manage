const path = require('path');
const packageConfig = require('../config/share');
//
// const  comp=require('../components.json');
const fs = require('fs');
let rootDir = path.resolve(packageConfig.projectName);
let fileUtil = require('./utils/fileUtils');
let info = require('../components.json');

const START_BUILD_INFO = 'build completed!';
//
let comp = info.components;
//
if (!comp) {

    console.log(START_BUILD_INFO);
    return;
}
//
fileUtil.createDirectory(`${packageConfig.projectName}/lib/styles`);
//
let fileNames = [];
//
let deleteFiles = [
    // 'index.common.js',
    'demo.html'
];
//
for (let keyField in comp) {
    //
    if (comp.hasOwnProperty(keyField)) {
        deleteFiles.push(`${keyField}.common.js`);
        deleteFiles.push(`${keyField}.umd.js`);
        let filePath = `${rootDir}/lib`;
        fileNames.push({
            oldName: `${keyField}.umd.min.js`,
            newName: `${keyField}.js`,
            filePath: filePath,
        });
        //样式
        fileNames.push({
            oldName: `${keyField}.css`,
            newName: `styles/${keyField}.css`,
            filePath: filePath
        })
    }
}
//移动文件.
fileNames.forEach((item) => {
    //
    let newName = path.join(item.filePath, item.newName);
    let oldName = path.join(item.filePath, item.oldName);
    if (!fs.existsSync(oldName)) {
        fs.writeFile(oldName, '@charset "UTF-8";', 'utf8', function (error) {
            if (error) {
                console.log(error);
                return false;
            }
            fs.rename(oldName, newName, (err) => {
                if (err) throw err;
            });
            // console.log('创建缺失的样式文件...');
        });
    } else {
        fs.rename(oldName, newName, (err) => {
            if (err) throw err;
        });
    }
});
//
// //删除demo 文件
deleteFiles.forEach((item) => {
    let filePath = '';
    if (/^demo/.test(item)) {
        //
        filePath = rootDir;
    } else {
        //
        filePath = `${rootDir}/lib`;
    }
    fs.unlink(`${filePath}/${item}`, (error, data) => {
        if (error)
            throw  new Error(error.message);
    });
});
console.log(START_BUILD_INFO);
