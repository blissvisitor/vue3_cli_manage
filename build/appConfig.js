let fs = require("fs");
let path = require("path");

// let extConfigData = require("../config/extconfig");
//
let mainPath = "src";

/**
 * @description 获取优化模块. 默认匹配以 *main.js 结尾的文件为主文件.
 *
 * @param {String} directory 文件夹路径
 * @param {Boolean} isFirstCall 是否是第一次调用..
 *
 * @return {void} 无返回值
 *
 * @author wangsl
 * @version 1.1.0
 * */
function addOptModuleToBuildConfig(directory, isFirstCall) {
    // 当前文件为文件夹时
    let fullDir = isFirstCall ? path.join(process.cwd(), directory) : directory;
    //
    if (fs.statSync(fullDir).isDirectory()) {
        // debugger;
        let files = fs.readdirSync(fullDir);
        let len = files.length;
        if (len > 0) {

            files.forEach(function (file) {
                //
                let url = fullDir + "/" + file;
                if (fs.statSync(url).isDirectory()) {
                    addOptModuleToBuildConfig(url, false);
                } else {
                    addModuleToOpt(url);
                }
            });
        }
    } else {
        //设置优化模块
        addModuleToOpt(fullDir);
    }
}

let buildConfig = {};

/**
 * @description 添加需要优化的模块.
 * @param {String} directory 文件夹路径
 * @return {void} 无返回值.
 * */
function addModuleToOpt(directory) {
    //设置优化模块.

    let appIndex = directory.lastIndexOf(mainPath);
    let startIndex = appIndex + mainPath.length + 1;

    if (/(main\.js$)|(main\.ts$)/.test(directory)) {
        //
        //
        let entryPointUrl = directory.substring(startIndex, directory.length - 3).replace(/(\\)/gi, "/");
        // console.log(moduleUrl);
        //
        // let entryPoint = {};
        //
        // entryPoint[entryPointUrl] = "./" + directory.substring(appIndex, directory.length).replace(/(\\)/gi, "\/");
        // buildConfig.entryPoints[entryPointUrl] = "./" + directory.substring(appIndex, directory.length).replace(/(\\)/gi, "\/");

        let mainPoint = "./" + directory.substring(appIndex, directory.length).replace(/(\\)/gi, "/");
        //不用重复加载主模块
        buildConfig.entryPoints[entryPointUrl] = ['chunk-vendors', 'chunk-common', mainPoint];
        //读取需要分模块的模板.
        let pageUrl = directory.substring(appIndex, directory.length).replace(/(\\)/gi, "/").replace(/main\.js$/, 'index.html');

        let templateUrl = './' + pageUrl;
        if (templateUrl !== './index.html') {
            buildConfig.mainPages.push({
                // template: "./" + pageUrl,
                template: "./index.html",
                filename: pageUrl.substring(mainPath.length + 1, pageUrl.length),//"test/"+path.basename(directory),
                title: entryPointUrl,
                chunks: ['chunk-vendors', 'chunk-common', entryPointUrl],
                entry: mainPoint
            });
        }
        //
        // console.log(moduleUrl);
    }
    //设置页面入口.
    // if (/index\.html$/.test(directory)) {
    //   //
    //   let pageUrl = directory.substring(appIndex, directory.length).replace(/(\\)/gi, "\/");
    //   let shortUrl = directory.substring(startIndex, directory.length - 5).replace(/(\\)/gi, "\/");
    //   //
    //   let chunkIndex = shortUrl.lastIndexOf("\/");
    //   let mainChunk = shortUrl.substring(0, chunkIndex) + "/main";
    //
    //   let templateUrl = './' + pageUrl;
    //   if (templateUrl !== './src/index.html') {
    //     buildConfig.mainPages.push({
    //       // template: "./" + pageUrl,
    //       template: "./src/pagesindex.html",
    //       filename: pageUrl.substring(mainPath.length + 1, pageUrl.length),//"test/"+path.basename(directory),
    //       title: path.basename(directory, ".html"),
    //       chunks: [mainChunk]
    //     });
    //   }
    // }
}

//
buildConfig.entryPoints = {};
buildConfig.mainPages = [];
//
addOptModuleToBuildConfig(mainPath, true);
/**
 * 扩展参数.
 * */
// if (extConfigData) {
//   //
//   if (extConfigData.entryPoints) {
//     //
//     for (let key in extConfigData.entryPoints) {
//       //
//       buildConfig.entryPoints[key] = extConfigData.entryPoints[key];
//     }
//   }
//   //
//   if (extConfigData.mainPages) {
//     //
//     buildConfig.mainPages = buildConfig.mainPages.concat(extConfigData.mainPages || [])
//   }
// }

module.exports.mainPages = buildConfig.mainPages;
module.exports.entryPoints = buildConfig.entryPoints;
module.exports.getPages = function () {
    //
    let resultObject = {};
    //
    let entryPoints = buildConfig.entryPoints;
    let mainPages = buildConfig.mainPages;
    let pageIndex = 0;
    for (let keyField in entryPoints) {
        //
        //
        // let pageItem = mainPages[pageIndex];

        // pageItem.entry = keyField + '.js';
        //

        resultObject[keyField] = mainPages[pageIndex];
        //
        pageIndex++;
    }
    return resultObject;

};
