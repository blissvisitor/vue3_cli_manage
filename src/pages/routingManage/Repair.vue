<template>
    <div id="repair">
        <div class="block">
            <div class="card">
                <div class="search-wrap ">
                    <dse-search-input  :placeholder_="'请输入关键字'" @search="onHandleSearch"/>
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
                        <span>来源:</span>
                        <el-select v-model="search.from" placeholder="来源">
                            <el-option
                                    v-for="item in fromList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="search-item">
                        <el-date-picker
                                v-model="search.time"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                    <div class="search-item">
                        <el-button type="primary" @click="addNewRepair">新增</el-button>
                    </div>
                </div>
                <div class="table-content">
                    <dse-table-width-pagination :totalNum="totalPages" :currentPage="currentPage" @getThisPage="getThisPage">
                        <thead>
                        <tr>
                            <th width="60"><span>序号</span></th>
                            <th ><span>检修编号</span></th>
                            <th ><span>上报时间</span></th>
                            <th ><span>完成时间</span></th>
                            <th ><span>隐患对象</span></th>
                            <th ><span>来源</span></th>
                            <th ><span>紧急程度</span></th>
                            <th ><span>状态</span></th>
                            <th width="60"><span>隐患详情</span></th>
                            <th width="100"><span>操作</span></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in tableList" :key="index">
                            <td ><span>{{ search.pageSize*(search.currentPage-1)+index+1}}</span></td>
                            <td ><span>{{item.orderCode}}</span></td>
                            <td ><span>{{item.dispatchTime}}</span></td>
                            <td ><span>{{item.dispatchTime}}</span></td>
                            <td ><span>{{item.dispatchTime}}</span></td>
                            <td ><span>{{item.proForm}}</span></td>
                            <td >
                                <template v-if="item.lev=='0'">
                                    <span class="level3">紧急</span>
                                </template>
                                <template v-if="item.lev=='1'">
                                    <span class="level2">较急</span>
                                </template>
                                <template v-if="item.lev=='2'">
                                    <span class="level1">一般</span>
                                </template>
                            </td>
                            <td><span >状态</span></td>
                            <td class="btns" :class="{ifDispatch:dispatchFlag===true}" @click="gotoDesc(item.id,item.type,item.orderStatus)"><span>详情</span></td>
                            <td class="btns">
                                <template v-if="item.orderStatus=='0'">
                                    <span style=" width: 80px; margin-right: 0" class="ordering">已派单</span>
                                </template>
                                <template v-if="item.orderStatus=='1'">
                                    <span  style=" width: 80px; margin-right: 0" class="receive">已派单</span>
                                </template>
                                <template v-if="item.orderStatus=='2'">
                                    <span  style=" width: 80px; margin-right: 0" class="doing">处理中</span>
                                </template>
                                <template v-if="item.orderStatus=='3'">
                                    <span  style=" width: 80px; margin-right: 0"  class="doing"> 拒绝处理</span>
                                </template>
                                <template v-if="item.orderStatus=='4'">
                                    <span  style=" width: 80px; margin-right: 0"  class="down">处理完成</span>
                                </template>
                                <template v-if="item.orderStatus=='5'">
                                    <span style=" width: 80px; margin-right: 0"  class="checked">审核通过</span>
                                </template>
                                <template v-if="item.orderStatus=='6'">
                                    <span  style=" width: 80px; margin-right: 0"  class="doing">审核拒绝</span>
                                </template>
                            </td>
                        </tr>
                        </tbody>
                    </dse-table-width-pagination>
                </div>
            </div>
        </div>

        <dse-select-tips :closedModel_flag="showSelect_model_flag" @closeModel="close_selectModel" @configSelect="configTable"/>
    </div>
</template>

<script>
    import DseSelectTips from '../../common/components/DseselectTips';
    import DseTableWidthPagination from '../../common/components/DseTableWidthPagination';
    import DseSearchInput from '../../common/components/DseSearchInput';


    export default {
        components: {
            DseSearchInput,
            DseTableWidthPagination,
            DseSelectTips
        },
        data() {
            return {
                addFlag:false, //新增按钮的权限控制
                dispatchFlag:true, //工单详情和派发的按钮控制
                search:{
                  keyname:'',
                  status:'',
                  from:'',
                  time:[],
                  pageSize:10,
                  currentPage: 1,
                  totalPages: 1
                },
                statusList:[
                    {
                        label:'全部状态',
                        value:''
                    },
                    {
                        label:'启用',
                        value:'1'
                    },
                    {
                        label:'关闭',
                        value:'2'
                    }
                ],
                fromList:[
                    {
                        label:'全部来源',
                        value:''
                    },
                    {
                        label:'来源1',
                        value:'1'
                    },
                    {
                        label:'来源2',
                        value:'2'
                    }
                ],
                tableList: [
                    {
                        orderCode:'oreer001',
                        dispatchTime:'2019-3-21 8:32',
                        lev:'0',
                        proForm:'隐患',
                        dispatchAdvice:'尽快处理',
                        orderStatus:'0'
                    },
                    {
                        orderCode:'oreer002',
                        dispatchTime:'2019-3-21 8:32',
                        lev:'2',
                        proForm:'检修',
                        dispatchAdvice:'尽快处理',
                        orderStatus:'3'
                    },
                    {
                        orderCode:'oreer003',
                        dispatchTime:'2019-3-21 8:32',
                        lev:'1',
                        proForm:'检修',
                        dispatchAdvice:'尽快处理',
                        orderStatus:'2'
                    }
                ],
                orders: [],
                orderItem: '',
                totalPages: 1,
                currentPage:1,
                showSelect_model_flag: false, //管网抢修 选择进入 标准工单 或者原用工单 弹窗
                gotoDetail_id: null, // 管网抢修进入详情页的id
                addNew_detail_flag: null, // 判断是否是新增按钮或者是到详情按钮  1 为新增  2 为详情
            };
        },
        methods: {

            // 获取 检修管理列表
            getWorkorderList_(page=1) {

            },
            onHandleSearch(name) {
                this.search.keyname = name;
                this.getWorkorderList_(1);
            },
            handleCurrentTime(val) {
                this.getWorkorderList_(val);
            },
            getThisPage(obj){
                this.search.pageSize = obj.pageSize;
                this.getWorkorderList_(obj.pageNum);
            },
            gotoDesc(id,type,status) {
                this.$router.push({
                    name: 'repairDetail',
                    params: {
                        'id': '',
                        'tableType': '2',
                        'status':false
                    }
                });
                this.$emit('hiddenAside',false);

            },
            close_selectModel(val) {
                this.showSelect_model_flag = false;
            },
            configTable(val) {
                let flag = this.addNew_detail_flag;
                let temp_id = this.gotoDetail_id;
                if (flag == 1) {
                    this.$router.push({
                        name: 'pipe_rushrepair_workOrder',
                        params: {
                            'tableType': val
                        }
                    });
                } else {
                    this.$router.push({
                        name: 'pipe_rushrepair_piperepair',
                        params: {
                            'id': temp_id,
                            'tableType': val
                        }
                    });
                }

                this.$store.commit('setAside_status', false);
                this.$emit('hiddenAside');
            },
            // 新增 检修
            addNewRepair(){
                this.$router.push({
                    name:'addRepair',
                    params:{
                        'id': '',
                        'tableType': '2',
                        'status':false
                    }
                });
                this.$emit('hiddenAside',false);
            }
        },
        created() {
            let that = this;
            this.search.time = [
                that.$days().format('YYYY-MM-DD'),
                that.$days().format('YYYY-MM-DD')
            ]
        }
    };
</script>

<style lang='scss' scoped>
    #repair {
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
