/**
 * @description ...
 * @author wangsl 397838921@qq.com
 * @version v1.0.0
 * @date create Administrator on 2019/3/27
 *
 */

const build = require('./buildfra.js');
const types = require('../constants/appType');

build.executeBuildCmd(types.WEB_PKG_FRA);
