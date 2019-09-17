<template>
    <div id="monitorRecord">
        <div class="block">
            <div class="card">
                <div class="search-wrap">
                    <dse-search-input  :placeholder_="'请输入水厂名字'" @search="onHandlesearch"/>
                    <div class="search-item">
                        <span>启用状态:</span>
                        <el-select v-model="search.status" placeholder="请选择">
                            <el-option
                                    v-for="item in statusList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="search-item">
                        <span>所属水厂:</span>
                        <el-select v-model="search.factoryName" placeholder="请选择水厂">
                            <el-option
                                    v-for="item in factoryList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="search-item">
                        <el-button type="primary" @click="addNewRecord">新增</el-button>
                    </div>
                </div>
                <div class="table-content">
                    <dse-table-width-pagination :totalNum="totalNum" :currentPage="currentPage" @goto_page="goto_page">
                        <thead>
                        <tr>
                            <th width="60"><span>序号</span></th>
                            <th><span>巡检日期</span></th>
                            <th><span>巡检班组</span></th>
                            <th><span>巡检人员</span></th>
                            <th><span>巡检完成率(%)</span></th>
                            <th><span>隐患数量</span></th>
                            <th width="120"><span>详情</span></th>
                        </tr>
                        </thead>
                        <tbody>
                        <template v-if="recordList && recordList.length>0">
                            <tr v-for="(item,index) in recordList" :key="index">
                                <td><span>{{index+1}}</span></td>
                                <td><span>{{item.inspectDate}}</span></td>
                                <td><span>{{item.groupName}}</span></td>
                                <td><span>{{item.userName}}</span></td>
                                <td><span>{{item.sumNum}}</span></td>
                                <td><span>{{item.probCount}}</span></td>
                                <td class="btns"><span  @click="onHandlEdit(item)">修改</span><span  @click="onHandleDel(item)">删除</span></td>
                            </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="7"><span>无数据</span></td>
                            </tr>
                        </template>
                        </tbody>
                    </dse-table-width-pagination>
                </div>

            </div>
        </div>
        <dse-save-status :type="false" :showModel="showModel" @sureDelThis="sureDelThis" @delThis="hiddenModel"/>
    </div>
</template>
<script>
    import DseTableWidthPagination from '../../common/components/DseTableWidthPagination';
    import DseSearchInput from '../../common/components/DseSearchInput';
    import DseSaveStatus from '../../common/components/toast/DseSaveStatus';


    export default {
        name: 'monitorRecord',
        components: {DseSaveStatus, DseSearchInput, DseTableWidthPagination},
        data() {
            return {
                name: '',//巡检人员名称关键字
                recordList: [{
                    'nowEndTime': '2019-03-31 23:23:00',
                    'sumCount': 3,
                    'inspectDate': '2019-03-27 10:25:00',
                    'planName': '同心县韦州镇同心村巡检计划',
                    'leadTime': 2400,
                    'userName': '张伟',
                    'recordId': '0048F16009C6429A5664B897E81CA23F',
                    'inspectLength': 0.0000,
                    'nowStartTime': '2019-06-01 00:00:00',
                    'sumNowCount': 0,
                    'groupName': '一班',
                    'probCount': 1,
                    'inspectSpeed': 0.00,
                    'planId': 'IS76LNFJPC0U3M1S9U1FUGJ79SSLA97V',
                    'startTime': '2019-03-27 10:25:00',
                    'sumNum': 30,
                    'endTime': '2019-03-27 10:26:00',
                    'inspectMode': '2'
                }, {
                    'nowEndTime': '2019-03-03 23:23:00',
                    'sumCount': 0,
                    'inspectDate': '2019-02-28 14:18:00',
                    'planName': '窑山管网巡检',
                    'leadTime': 33600,
                    'userName': '王华',
                    'recordId': '3D2057041567815F1074847BAE554A10',
                    'inspectLength': 2.6615,
                    'nowStartTime': '2019-02-25 00:00:00',
                    'sumNowCount': 4,
                    'groupName': '二班',
                    'probCount': 0,
                    'inspectSpeed': 0.00,
                    'planId': 'NJJ6QRH32IGAB4PU7NH7TVA2AE0OT5U5',
                    'startTime': '2019-02-28 14:18:00',
                    'sumNum': 40,
                    'endTime': '2019-02-28 14:32:00',
                    'inspectMode': '0'
                }, {
                    'nowEndTime': '2019-03-03 23:23:00',
                    'sumCount': 0,
                    'inspectDate': '2019-03-27 10:26:00',
                    'planName': '王团管网巡检',
                    'leadTime': 7200,
                    'userName': '黎明',
                    'recordId': 'C8BB47865330668607EA644E997A3A1D',
                    'inspectLength': 0.0000,
                    'nowStartTime': '2019-02-25 00:00:00',
                    'sumNowCount': 0,
                    'groupName': '三班',
                    'probCount': 0,
                    'inspectSpeed': 0.00,
                    'planId': 'NJJ6QRH32IGAB4PU7NH7TVA2AE0OT5U5',
                    'startTime': '2019-03-27 10:26:00',
                    'sumNum': 35,
                    'endTime': '2019-03-27 10:29:00',
                    'inspectMode': '0'
                }, {
                    'nowEndTime': '2019-03-03 23:23:00',
                    'sumCount': 0,
                    'inspectDate': '2019-03-27 10:25:00',
                    'planName': '河西加压泵站巡检',
                    'leadTime': 0,
                    'userName': '赵建国',
                    'recordId': 'E74964132978DAF95951DA5FADB07D4A',
                    'inspectLength': 0.0000,
                    'nowStartTime': '2019-02-25 00:00:00',
                    'sumNowCount': 0,
                    'groupName': '四班',
                    'probCount': 0,
                    'inspectSpeed': 0.00,
                    'planId': 'NJJ6QRH32IGAB4PU7NH7TVA2AE0OT5U5',
                    'startTime': '2019-03-27 10:25:00',
                    'sumNum': 55,
                    'endTime': '2019-03-27 10:25:00',
                    'inspectMode': '0'
                }, {
                    'nowEndTime': '2019-03-03 23:23:00',
                    'sumCount': 0,
                    'inspectDate': '2019-02-28 14:06:00',
                    'planName': '小西沟水库巡检',
                    'leadTime': 26400,
                    'userName': '刘晓庆',
                    'recordId': 'F9B4F6199A77B0F70D3EF2D55A989410',
                    'inspectLength': 1.6343,
                    'nowStartTime': '2019-02-25 00:00:00',
                    'sumNowCount': 0,
                    'groupName': '一班',
                    'probCount': 0,
                    'inspectSpeed': 0.00,
                    'planId': 'NJJ6QRH32IGAB4PU7NH7TVA2AE0OT5U5',
                    'startTime': '2019-02-28 14:06:00',
                    'sumNum': 80,
                    'endTime': '2019-02-28 14:17:00',
                    'inspectMode': '0'
                }],//巡检记录
                totalNum: 1,//总共记录条数
                currentPage: 1,//当前页码
                rowData: {},//行数据
                showModel: false,//是否打开删除弹窗
                search:{
                    status:'',
                    keyname:'',
                    factoryName:'',
                    currentPage: 1,
                    pageSize:10,
                    total:1,
                    list:[]
                },
                // 启用列表
                statusList:[
                    {
                        label:'全部状态',
                        value:''
                    } ,
                    {
                        label:'启用',
                        value:'1'
                    },
                    {
                        label:'停用',
                        value:'2'
                    }
                ],
                // 水厂列表
                factoryList:[
                    {
                        label:'一水厂',
                        value:'1'
                    }
                ]

            };
        },
        computed: {},
        methods: {
            //详情页返回列表页
            detailBack() {
                this.showDetail = false;
                this.$store.commit('set_asideStatus', true);
                this.$emit('showAside');
            },

            //去详情页
            onHandlEdit(rowData) {
                //当前页打开
                this.$router.push({
                    path:'/routing/monitorAddRecord',
                    params:{
                        rowData:rowData
                    }
                });
                this.$emit('hiddenAside',false);
            },
            // 删除
            onHandleDel(){
                this.showModel = true;
            },
            //获取巡检记录列表
            getInspectionInfo(page=1) {

            },

            //翻页事件
            goto_page(obj) {
                this.search.pageSize = obj.pageSize;
                this.queryInspectionInfo_(obj.pageNum);
            },

            //初始化 //设置初始开始时间结束时间
            init() {
                this.getInspectionInfo(1);
            },
            // 新增巡检记录
            addNewRecord(){
                //当前页打开
                this.$router.push({
                    path:'/routing/monitorAddRecord',
                    params:{
                        rowData:[]
                    }
                });
                this.$emit('hiddenAside',false);
            },
            // 搜索当前的符合条件的 数据
            onHandlesearch(keyname){
                this.search.keyname = keyname;
                this.getInspectionInfo(1);
            },
            // 确定删除该项
            sureDelThis(flag){
               this.showModel = false;
            },
            // 隐藏 弹窗
            hiddenModel(){
                this.showModel = false;
            }
        },
        mounted() {
            this.init();
        }
    };

</script>
<style scoped lang='scss'>
    #monitorRecord {
        width: 100%;
        height: 100%;
        .search-wrap {
            width: 100%;
            height: 30px;
            display: flex;
            margin-bottom: 10px;
            justify-content: flex-start;
            align-items: center;
            position: relative;
            .search-item{
                margin-left: 10px;
                span{
                    display: inline-block;
                    margin: 0 10px;
                }
                &:last-child{
                    position: absolute;
                    top: 0px;
                    right: 20px;
                }
            }
        }
        .table-content {
            width: 100%;
            height: calc(100% - 30px);

        }


    }
</style>
