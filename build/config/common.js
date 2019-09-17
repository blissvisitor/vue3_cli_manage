/**
 * @description ...
 * @author wangsl 397838921@qq.com
 * @version v1.0.0
 * @date create Administrator on 2019/3/27
 *
 */
let commonFiles = [
    ['./.eslintrc.js', '', 'file'],
    ['./.eslintrc.js', '', 'file'],
    ['./babel.config.js', '', 'file'],
    // ['./components.json', '', 'file'],
    ['./custom.build.js', '', 'file'],
    ['./index.html', '', 'file'],
    ['./jest.config.js', '', 'file'],
    ['./README.md', '', 'file'],
    ['./sonar-project.properties', '', 'file'],
    ['./docs', 'docs', 'dir'],
    ['./tests', 'tests', 'dir'],
    ['./static', 'static', 'dir'],
    ['./public', 'public', 'dir'],
    ['./build', 'build', 'dir'],
];

// let copyFiles = [];
// //
// infoFiles.forEach((item) => {
//     copyFiles.push({
//         from: item[0],
//         to: item[1],
//         toType: item[2]
//     });
// });


function getCopyFiles(extraFiles = []) {
    let copyFiles = [];

    let infoFiles = commonFiles.concat(extraFiles);
//
    infoFiles.forEach((item) => {
        copyFiles.push({
            from: item[0],
            to: item[1],
            toType: item[2]
        });
    });
    return copyFiles;
}

module.exports.getCopyFiles = getCopyFiles;
