/**
 * @description ...
 * @author wangsl 397838921@qq.com
 * @version v1.0.0
 * @date create Administrator on 2019/3/27
 *
 */

const path = require('path');
const fileUtil = require('./utils/fileUtils.js');
//
let filePath = path.resolve(process.cwd(), 'dist');
let deleteFiles = [
    "lib",
    "demo.html"
];
//
// console.log(filePath)
//

deleteFiles.forEach((fileName) => {
    //

    fileUtil.deleteDirectory(`${filePath}/${fileName}`);

});

