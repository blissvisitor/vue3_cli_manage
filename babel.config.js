const packageConfig = require('./package.json');

/**
 * @description 获取公司需局部导入的组件库
 *
 * @version v2.0.1
 * @return {Array}  局部导入的插件数组。
 * */
function getDsePlugins() {
    let dependencies = packageConfig.dependencies;
    let plugins = [];
    for (let libraryName in dependencies) {
        if (dependencies.hasOwnProperty(libraryName)) {
            if (/^dse-/.test(libraryName)) {
                //
                let partItem = [
                    "component",
                    {
                        "libraryName": libraryName,
                        // "styleLibraryName": "components",
                        "style": false,
                        "libDir": "lib",
                        "camel2Dash": false,
                        styleLibrary: {
                            "name": "styles", // same with styleLibraryName
                            "base": false,  // if theme package has a base.css
                            "path": '[module].css'  // the style path. e.g. module Alert =>  alert/index.css
                            // "mixin": true  // if theme-package not found css file, then use [libraryName]'s css file
                        }
                    },
                    libraryName
                ];
                //
                plugins.push(partItem);
            }
        }
    }
    return plugins;
}

//第三方库局部导入.
let thirdPlugins = [
    [
        "component",
        {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk",
            // "style": true
        },
        "element-ui"
    ]
];
module.exports = {
    presets: [
        '@vue/app'
    ],
    plugins: thirdPlugins.concat(getDsePlugins())
};


//

console.log(module.exports.plugins);
