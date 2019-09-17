/**
 * @description ...
 * @author wangsl 397838921@qq.com
 * @version v1.0.0
 * @date create Administrator on 2019/3/27
 *
 */
const build = require('./buildfra');
const types = require('../constants/appType');
build.executeBuildCmd(types.GIS_APP_FRA);
