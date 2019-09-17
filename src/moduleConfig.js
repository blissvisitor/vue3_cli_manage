/**
 * @description  项目中可根据需要扩展配置文件内容， 框架在升级时不会覆盖项目中扩展的配置.
 * */

let DSE = window.DSE || {};
//进行前后端分离开发时，设置后台接口Url
// DSE.serverPath = _serverPath;
const TOKEN_KEY_FIELD = '__app_token__';

//前后端分离用户配置.
const userInfo = {
    clientUser: 'DSE1',
    clientPwd: 'DSE123456',
    user: 'xbird',
    pwd: '123456'
};

//进行前后端分离开发时，设置后台接口根路径Url 跨域访问 server 时，需要配置代理进行跨域访问.
//示例, 为集群地址.
// DSE.serverPath = '//10.100.9.52:8081';
// token 认证接口.
DSE.tokenServer = '/oauth/token';
//登录页面.
// DSE.loginUrl = 'http://10.100.50.104:8085/baseplatform';
//是否集成到基础平台.
// DSE.isInBasePlatform = false;


// 服务端需要修改路径为 文件所在的根目录 DSE.baseURL = getIndexUrl('/pipe/pages/app/pipe/');
DSE.baseURL = window.baseURL; // ******
DSE.static_baseUrl = window.static_baseUrl;

DSE.arcgis_startJS = window.arcgis_IP + '/arcgis_js_v48_api/library/4.8/init.js';
DSE.arcgis_mainCss = window.arcgis_IP + '/arcgis_js_v48_api/library/4.8/esri/css/main.css';

// DSE.arcgis_startJS =  window.arcgis_IP+'/arcgis_js_v411_api/library/4.11/init.js';
// DSE.arcgis_mainCss =  window.arcgis_IP+'/arcgis_js_v411_api/library/4.11/esri/css/main.css';

DSE.version = '1.0.0';
// 说明 该地址既是接口地址 、也是跳转服务地址
DSE.base_api_url = window.base_api_url;

// 视频的基础APIURL
DSE.video_api_url = window.base_video_host + '/api/v1';


DSE.video_host = window.base_video_host;
DSE.video_streamHost = window.base_video_streamHost;

DSE.video_name = 'admin';
DSE.video_password = '21232f297a57a5a743894a0e4a801fc3';

// arcgis 外部模块导入配置
DSE.gisConfig = {
    async: true,
    packages: [{
        name: 'dse',
        location: ''+DSE.static_baseUrl + '/gisTools'
    }]
};


//配置 区域 ID
DSE.area = {
    old: '',
    new: '',
    deve: ''
};
// 设备类型
DSE.devices = [{
    label: '阀门',
    value: '1',
},
    {
        label: '消防栓',
        value: '2',
    },
    {
        label: '流量计',
        value: '3',
    },
    {
        label: '压力计',
        value: '4',
    },
    {
        label: '水质仪器',
        value: '5',
    },
    {
        label: '其他',
        value: '6',
    }, {
        label: '检查井',
        value: '7',
    }
];
//传输介质
DSE.transmissionMedium = [];
// 管口连接方式
DSE.interFace = [];
// 供水类型
DSE.waterSupply_type = [];
// 区域
DSE.areaLists = [];
// 管材
DSE.productLists = [];
//管径
DSE.caliberLists = [];

//防腐形式
DSE.anticorrosiveList = [
    {'value': '8ae4b2cd6c8373dc016c847e89af0026', 'label': '内壁涂防腐层'},
    {'value': '8ae4b2cd6c8373dc016c847ed09e0027', 'label': '外壁涂防腐层'},
    {'value': '8ae4b2cd6c8373dc016c847f22720028', 'label': '阴极保护'},
    {'value': '8ae4b2cd6c8373dc016c847f77100029', 'label': '其他'}
];


// 巡检对象 列表
DSE.inspectViewTypeList = [];

/**
 * 管网巡检抢修
 */
// 管网 巡检抢修 工单紧急程度
DSE.dangerlist = [{
    label: '重大',
    value: '4'
},
    {
        label: '较大',
        value: '2'
    },
    {
        label: '一般',
        value: '1'
    }
];
// 管网 巡检抢修 工单的检修类型
DSE.problem_type = [];
// 管网 巡检抢修 工单的派单状态
DSE.orderStatus = [{
    label: '全部',
    value: ''
},
    {
        label: '未处理',
        value: '0'
    },
    {
        label: '待处理',
        value: '1'
    },
    {
        label: '已处理',
        value: '2'
    },
    {
        label: '待审核',
        value: '3'
    },
    {
        label: '待处理',
        value: '4'
    },
    {
        label: '待归档',
        value: '5'
    },
    {
        label: '已完成',
        value: '6'
    },
    {
        label: '已销毁',
        value: '7'
    },
    {
        label: '待充填',
        value: '8'
    },
    {
        label: '待验收',
        value: '9'
    }
];

// 检修工单类型
DSE.repairOrderTypes = [{
    label: '巡检工单',
    value: '0'
},
    {
        label: '维护工单',
        value: '1'
    },
    {
        label: '抢修工单',
        value: '2'
    }
];


/**
 * 管网监测
 */
// 路面荷载
DSE.roadWeights = [];
// 管龄
DSE.pipe_age = [];
// 爆管次数
DSE.pipe_burst_num = [];
// 管道埋深
DSE.pipe_deep = [];
//管网水质监测主项
DSE.water_quality = [];

//水厂组织结构
DSE.tree = [];
// 方便在gis页面中引出弹窗的数据绑定
DSE.globalData = null;

DSE.compyName = '';
DSE.compyID = '';
DSE.userName = '';

DSE.this_ = null; //绑定 vue的实例

DSE.temp_arr = []; //必要条件下  需要挂载的数组

DSE.allowBtns = {};


export {DSE, TOKEN_KEY_FIELD, userInfo};
