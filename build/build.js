const info = require('../components.json');

function exec(cmd, callback) {
    return require('child_process').exec(cmd, callback).toString().trim();
}

//
let comp = info.components || {};


console.log('start build libary..');

for (let keyField in comp) {
    //
    if (comp.hasOwnProperty(keyField)) {
        //
        let cmd = `cross-env BUILD_TYPE=web_pkg vue-cli-service build --target lib --name ./lib/${keyField} ${comp[keyField]}`;
        exec(cmd, (error, data) => {
            //
            if (error) {
                throw  error;
            }
            console.log('build library ...');
        });
    }

}
