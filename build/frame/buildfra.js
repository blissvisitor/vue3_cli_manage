const info = {
    "components": {
        "index": "./build/frame/buildIndex.js"
    },
    "sources": null
};

function exec(cmd, callback) {
    return require('child_process').exec(cmd, callback).toString().trim();
}

function executeBuildCmd(frameType) {
    //
    let comp = info.components || {};
    console.log('start build libary..');
    for (let keyField in comp) {
        //
        if (comp.hasOwnProperty(keyField)) {
            //
            let cmd = `cross-env BUILD_TYPE=${frameType} vue-cli-service build --target lib --name ./lib/${keyField} ${comp[keyField]}`;
            exec(cmd, (error, data) => {
                //
                if (error) {
                    throw  error;
                }
                console.log('build library ...');
            });
        }
    }
}

module.exports.executeBuildCmd = executeBuildCmd;
