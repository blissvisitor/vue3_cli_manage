#  config-cli
    通用框架配置文档
## Build Setup

``` bash
# 安装依赖项
npm install

# 服务开启  默认 开启 服务 为 IP:8081
npm run dev

#  沿用 官方打包要求  同时在这个命令后新添加 把生产环境的 配置文件替换为  开发环境的配置文件
npm run build

```



##  项目目录结构

    
     特别值得注意的是 src中的静态文件是参与打包的
     与 src同级的static文件 打包中会原封不动挪到dist中的合并的static中
   ```
     -build  // 系统默认
     -config  // 系统默认
        -share.json // 项目默认打包位置
     -public  // 项目的入口 index.html在此
     -dist  // 项目默认打包位置
     -src
        -assets
            -imgs
        -common
            -components
                │  dseAside.vue   // 侧边菜单
                │  dseBreadcrumb.vue // 面包屑
                │  dseCalanderEvent.vue // 事件日历
                │  dseDashboard.vue // 图表面板
                │  dseFilterTab.vue // 含有(更多)的 多item 点选
                │  dseFuncTools.vue // gis工具栏
                │  dseFuzzySearch.vue // 模糊搜索 带有下拉列表 (需要定制)
                │  dseGisTools.vue // gis工具栏
                │  dseHeaderInner.vue // 通用的头部菜单文件
                │  dseLayerOut.vue // 通用的 左右布局的 内容和树的组件
                │  dseLegend.vue  // gis的图例组件
                │  dseLiveVideo.vue // 在线视频组件 (针对 easynvr)
                │  dseLoadAnimation.vue // 耗时的吃豆人动画组件
                │  dseLoadingAnimation.vue // 页面跳转和数据加载的 缓动动画
                │  dseMenu.vue  // 菜单的主文件 (可按需生成三级组文件)
                │  dseMyPagination.vue  // 自定义的 带有列表+自定义分页的 抽屉组件
                │  dsePagination.vue  // 细分的 自定义分页组件
                │  DseselectTips.vue // 根据情况 单选进入的组件（按需修改）
                │  DseSearchInput.vue // 根据情况 带搜索框的组件
                │  dseSelectWithTree.vue // 输入框嵌套树的 选择组件
                │  dseSeparatingTabs.vue // 分离式的 页签切换组件
                │  DseShuttleBox.vue // 支持两级切换的穿梭框(需要按需修改)
                │  dseSlideTableList.vue // 侧边抽屉的 表格列表和elment-ui分页样式的组件
                │  dseTab.vue
                │  dseTableList.vue // 侧边抽屉 表格和分页组件
                │  dseTableWidthPagination.vue // 大型表格和分页组件
                │  dseTabsToggle.vue // 页签切换组件
                │  dseTabsUnderline.vue // 带有下划线的组件
                │  dseToggleTable.vue  // 抽屉的 开关组件
                │  FirstMapHead.vue  // 可参考的 头部菜单组件
                │
                ├─tabs
                │      dseR_tableCard.vue // 竖向菜单和 内容区的组件
                │
                └─toast
                        DseBgModel.vue  // 大的弹窗
                        Dsedit.vue // 带有 取消和保存按钮的 自定义弹窗
                        DseGisModel.vue // 自由配置弹窗位置 无按钮 (宽大于高)
                        DseListModel.vue // 以展示为主的 无按钮弹窗 (高大于宽)
                        DseNormalModel.vue  // 通用的弹窗组件 无按钮
                        DseSaveStatus.vue // 保存状态的组件 (含有 确认删除和保存成功的组件)
                        DseView.vue // 自定义宽高的组件
            -config
                +inner_config.js    //内置配置共享数据 不可轻易配置  与外置/static/config.js 联动
            -styles
                  main.scss   // 各种样式文件导入的主文件 全局定义样式  包含基于element-ui的样式纠正 (尽量不要在组件中用 /deep/ 应该改文件中定义重置样式)
                │
                ├─generic  // 定义基本的通用样式
                │      base.scss  // 通用的全局样式
                │      iconfont.scss // 全局的字体文件
                │      reset.scss  // 全局的重置样式(重置element-ui)
                │
                └─settings
                        _fun.scss  // 定义 可传参数的 的函数样式或者(定义一段样式的混合器)
                        _vars.scss //定义 基准的 基准变量
        -store
           │  index.js  状态包裹器
           │
           └─modules
                   dataManage_store.js  数据管理状态器
                   emergencyManage_store.js  应急管理状态器
                   goodsManage_store.js      物资管理状态器
                   oneMap_store.js    一张图状态器
                   pipeManage_store.js   管网管理状态器
                   root.js   用户信息管理状态器
                   routingManager_store.js   巡检管理状态器
                   saveWaterManage_store.js  节水管理状态器
                   system_store.js   系统管理状态器
                   waterAnalysis_store.js    用水分析状态器
        -mixins  // 混合器目录
               arcgis_methods.js   gis相关的
               common_mixins.js     时间日历的使用函数
               pipeSetting_sites_mixin.js   水质、水压、水流、视频等站点的混合器
               chart_mixins.js 图表 (包含 线、柱子等，逐步完善) 
               README.md
        -pages
               404.vue   
            │  500.vue
            │  gisEdit.vue  gis编辑
            │  home.vue     一张图的主页
            │  init.vue     页面初始化
            │  Login.vue    登录的页面
            │  mainContent.vue  所有页面的 包裹器页面
            │  Temp.vue     判断是否登录的 跳转缓存页面
            │
            ├─analysis   用水分析  模块
            │  ├─county
            │  │  │  index.vue
            │  │  │
            │  │  └─style
            │  │          index.scss
            │  │
            │  ├─region
            │  │  │  index.vue
            │  │
            │  └─zhongyuan
            │      │  index.vue
            │
            ├─contingencyManagement
            ├─data  数据管理 模块
            │  │  enterpriseTable.vue  
            │  │  standingBook.vue
            │  │  target.vue  农饮指标
            │  │  warning.vue  预警消息
            │  │
            │  └─monitor  监测站点
            │      │  index.vue  
            │      │
            │      ├─comonents
            │      │      Cistern.vue
            │      │      Monitor.vue
            │      │      PumpingStation.vue
            │      │      Reservoir.vue
            │      │      WaterMeter.vue
            │      │      WaterWork.vue
            │
            ├─emergency  应急管理模块
            │  ├─incident
            │  │      index.vue
            │  │      modify.vue
            │  │
            │  └─resource
            │      │  index.vue
            │      │  modify.vue
            │      │
            │      └─comonents
            │              Cistern.vue
            │              Monitor.vue
            │              PumpingStation.vue
            │              Reservoir.vue
            │              WaterMeter.vue
            │              WaterWork.vue
            │
            ├─home_tabs  一张图 右侧抽屉的 页签模块
            │  │  DevWarking.vue
            │  │  Msg.vue
            │  │  PipeMsg.vue
            │  │  ProjectMsg.vue
            │  │  RoutingView.vue
            │  │  Waterate.vue
            │  │  DseGisMap.vue // 一张图的 gis主文件
            │  │
            │  ├─countMsg   // 用户数量弹窗
            │  │      CountMsg.vue
            │  │
            │  ├─monitorMsg_points  // 监测站点的 弹窗
            │  │      Flow.vue
            │  │      Press.vue
            │  │      Qc.vue
            │  │      Video.vue
            │  │      WaterLev.vue
            │  │
            │  ├─part  // 分区的弹窗
            │  │      PartToggle.vue
            │  │      WaterCapacity.vue
            │  │      WaterCost.vue
            │  │
            │  ├─pool  // 蓄水池  弹窗
            │  │      Base.vue
            │  │      Monitor.vue
            │  │      PoolToggle.vue
            │  │      Video.vue
            │  │      ViewRecord.vue
            │  │
            │  ├─pump  //泵站的弹窗 入口
            │  │      pumpToggle.vue
            │  │      BaseMsg.vue
            │  │      Configuration.vue
            │  │      MonitorManager.vue
            │  │      PumpViewRecord.vue
            │  │      VideoMonitor.vue
            │  │
            │  ├─showAllModel
            │  │      SModel.vue
            │  │
            │  ├─sk  // 水库 的弹窗
            │  │      SkBaseMsg.vue
            │  │      SkMsg.vue
            │  │      SkViewRecord.vue
            │  │      ToggleSk.vue
            │  │
            │  ├─userDev  // 联户表井的弹窗
            │  │      userDevToggole.vue
            │  │
            │  ├─waterate 右侧面板的  用水率列表
            │  │      AllArea.vue
            │  │      East.vue
            │  │      Haiyuan.vue
            │  │      Middle.vue
            │  │      West.vue
            │  │
            │  └─waterFactory  // 水厂的 弹窗
            │          FactoryBaseMsg.vue
            │          FactoryMonitor.vue
            │          FactoryViewRecord.vue
            │          ToggleWaterFactory.vue
            │          Zhutai.vue
            │
            ├─material
            │  ├─analysis
            │  │  │  DevStatistic.vue
            │  │  │  Index.vue
            │  │  │  SpareParts.vue
            │  │
            │  ├─device
            │  │      Index.vue
            │  │      Modify.vue
            │  │      Profile.vue
            │  │
            │  └─spareParts
            │      │  Index.vue
            │      │  Modify.vue
            │      │  Profile.vue
            │
            ├─pipeManage   管网管理模块
            │      AddDeves.vue
            │      AddPipes.vue
            │      DevStandingBook.vue
            │      PipeStandingBook.vue
            │
            ├─routingManage  巡检管理 模块
            │      Form.vue
            │      MakePlan.vue
            │      MonitorPlan.vue
            │      MonitorRecord.vue
            │      AddRecord.vue
            │      PlanList.vue
            │      Repair.vue
            │      AddRepair.vue
            │      RepairDetail.vue
            │      Standard.vue
            │      AddOrEditMonitorPlan.vue 
            │      RoutingManageMenu.vue 
            │
            ├─system  系统管理 模块
            │  │  Monitor.vue
            │  │  Partition.vue
            │  │  Pone.vue
            │  │
            |  |—— SupplyProject 供水工程
            │  ├─engineering  工程配置
            │  │  │  Index.vue
            │  │  │  Modify.vue
            │  │  │
            │  │  └─comonents
            │  │          Back.vue
            │  │          Cistern.vue
            │  │          PumpingStation.vue
            │  │          Reservoir.vue
            │  │          Tab.vue
            │  │          WaterMeter.vue
            │  │          WaterWork.vue
            │  │
            │  ├─inspectionItem  
            │  │      Index.vue
            │  │
            │  ├─monitor  监测点 配置
            │  │      Index.vue
            │  │      Modify.vue
            │  │
            │  └─patrolTeam
            │          Configure.vue
            │          Index.vue
            │
            ├─tipPanel
            │      TipTabs.vue
            │      ValIndex.vue
            │
            ├─water
            │  ├─calculate
            │  │  │  Index.vue
            │  │  │  Modify.vue
            │  │  │  Profile.vue
            │  │
            │  └─examine
            │          CompanyModify.vue
            │          Index.vue
            │          Modify.vue
            │          Profile.vue
            │
            └─WaterRate
        -api
           │  contentType_form_fetch.js   针对 www-form 接口封装
           │  fetch.js  一般 json 格式封装
           │  fetchForExport.js   导出数据流文件封装
           │  postFile.js  上传文件 带进度条封装
           │  README.md  
           │  urls.js  所有 接口地址的所在目录
           │
           └─interfaces
                   common_api.js  通用 接口回调
                   dataManage_api.js  数据管理 接口回调
                   emergencyManage_api.js  应急管理 接口回调
                   goodsManage_api.js   物资管理 接口回调
                   oneMap_api.js   一张图 接口回调
                   pipeManage_api.js  管网管理 接口回调
                   routingManager_api.js  巡检管理 接口回调
                   saveWaterManage_api.js  节水管理 接口回调
                   system_api.js   系统管理 接口回调
                   waterAnalysis_api.js   用水分析 接口回调
                   www_form.js  针对 www-form 的接口统一 位置
      -utils
           │  cookie.js  
           │  date_func.js
           │  el_validater.js  // 基于官方的element-ui 封装的自定义表单验证（持续增加）
           │  fileDownloadUtil.js
           │  geometryUtils.js // 高德和天地图的 坐标转化
           │  getDate.js  
           │  gisUtils.js  // gis的通用方法
           │  inputs_valid.js  // 普通的 变淡校验
           │  judgeTime.js  // 日期类的 比较
           │  lunar_solar.js // 阴历和农历的转换
           │  mapExportUtil.js // 导出gis地图
           │  month_days.js
           │  README.md
           │  uuid.js  //uuid
        -router
            index.js
     -static
        -imgs
            *.jpg
        +config.js  //外置配置全局变量
     
     vue.config.js
       ```
       // 修改为 相对路径打包 运维人员 无需 重新打包配置绝对路径
       webpackConfig = {
           publicPath: process.env.NODE_ENV === 'production' ? `./` : './',
           // 配置 跨域访问 （敲黑板: 这是重点）
           devServer: {
                  // proxy: proxyTable,
                  proxy: {
                      '/ncysgc': {
                          target: 'http://10.100.50.77:8018',
                          // target: 'http://10.100.50.170:8091',
                          // target: 'http://10.100.50.197:8091',
                          changeOrigin: true
                      },
                      '/api': {
                          target: 'http://10.100.50.155:3000',
                          changeOrigin: true
                      }
                  }
              },
       }
       
       ```
   



##   项目运行 需要  配置

        一、项目 main.js  加入 import 'babel-profill' 解决 IE 下的问题
 
        二、 基于业务的 配置 放置在  moduleConfig.js
         里面存放 项目的所有内置配置 (arcgis 的相关 配置 也放置其中)
         
        三、 项目 原有框架 采用 编译时 页面，但是 原有项目  大量采用 运行时 页面，有冲突
            故而所有 引入 Vue 的 地方 全部替换为  import Vue  from 'vue/dist/vue.js' 可以解决冲突
            
        四、项目 开发前 注意 删除 package.lock.json 然后下载 依赖
        
        五、项目其他组员  更新 static/config.js时 必须重置如下部分 (敲黑板:重点)
            ```
            
            // 服务端文件所在的根目录
            // window.baseURL = getIndexUrl('/tongxin/');
            //本地开发路径
            window.baseURL = getIndexUrl();
            
            
            
            //服务器端静态资源所在的目录
            // window.static_baseUrl = getIndexUrl('/tongxin/static');
            //本地静态资源所在的目录
            window.static_baseUrl = getIndexUrl('/static');
            
            ```
         
         
##  项目接口调用配置(spring boot)

     /static/config.js 下 
     ```
         window.base_api_url = ?????(注意 跟原来的写法不同 )
     
     ```
## 全局状态（基于store）
    开发使用相关功能，请参照相关的 状态文件的 开发实例
    (1): 完善store的 分模块存储，用来区分相同名字的变量
    (2): 强烈建议使用 异步加载数据 （store）
    (3): 针对store的刷新状态丢失，全部采用 基于sessionStorage的固化，来辅助状态的记忆和回放
    (4): 本项目使用 命名空间定义变量， 使用和设置变量，尽量使用 'vuex'相关的功能函数
     
## 纯粹 单页应用 优化路由 

    1、支持 浏览器地址栏刷新页面，而不会失去刷新前的状态
    2、页面的回退 建议 使用 go(-1); 同时加上 this.$emit('show_aside',true);
    3、页面内部跳转 添加 this.$emit('hiddenAside',false);
    4、弊端 暂时没有做成祖宗级及重孙级 也就是 一个脉系的事件唤醒，暂时支持单一的 父子组件实现菜单的开关
    5、路由使用二级路由嵌套、相关页面的增添 可查看相关文件 实例
    6、优化 面包屑组件的监听实现;



## SVN 更新和 提交前 需要 注意的 地方

    1、除了第一次上传配置文件外，任何其他人上传，必须屏蔽掉 /static/config.js


## 打包前需要新增 生产环境的 配置文件编写

   
        现有 配置文件  仅限于   index.html  和 static 下的 config.js
        
  
        SVN 更新前 注意修改 如下部分  /static/config.js  就像下面这样
        ```
            // 服务端文件所在的根目录
             window.baseURL = getIndexUrl('/tongxin/');
            //本地开发路径
            //window.baseURL = getIndexUrl();
            
            
            //服务器端静态资源所在的目录
             window.static_baseUrl = getIndexUrl('/tongxin/static');
            //本地静态资源所在的目录
            //window.static_baseUrl = getIndexUrl('/static');
       
        ```   
 ## 引用的 包
 
      1、 lodash   工具库   已注册全局  使用 方式 this.funTool.unil(XXX)
      2、 vee-valitor 表单校验 已注册全局  关注官方教程
      4、 element-ui
      5、 eris-loader
      6、 proj4  用于不同坐标系之间转换空间数据
      7、 xlsx   用于excel数据的导入
      8、 jquery 引入
      9、外置脚本库  video.js
      10、 外置 脚本库 my97date
      11、  el-tree-transfer  多级穿梭框
      12、 echarts 使用原生写法  使用 方式  this.$echarts.init(XXXXX) 使用方式 沿用 jq时代的方式，写法完全一致，不需要再造轮子
      13、 dayjs 时间处理插件 使用方式 this.$days().formate('YYYY-MM-DD HH:mm:ss'); 类似写法 具体参见官方文档
      14、 vue-contextmenu  重置右键绑定事件
 ##  打包 注意事项
 
       1、项目的 基本配置项中的 业务配置向项 写在 /moduleConfig.js 中
         （1）、大量的 字典项 需要 调用接口 会引起 性能问题，索性放入本地，减少请求（重新部署时，需要完善或者验证字典项的 ID是否变化）
       2、 项目配置浏览器图标    /public/img/icons/  下
            需要修改脚本的内部参数 方便生成该目录下 一大堆的icon 脚本很小 寥寥数行 有注释
            必须配置 该目录下 必须包含两个文件 (icon_1024.png 和 safari-pinned-tab.svg svg绘制大小为16*16)
 
 
 
 
    
            


 




    
