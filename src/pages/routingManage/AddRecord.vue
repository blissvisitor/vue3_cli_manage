<template>
    <div id="addRecord">
        <div class="top-actions">
            <div class="back"><span class="go-back" @click="goback">返回</span></div>
        </div>
        <div class="wraper">
            <div class="top-head">
                <span>一、基本信息</span>
            </div>
            <div class="main-content">
                <el-form ref="form" inline=true :rules="rules" :model="form" label-width="120px">
                    <el-form-item label="计划用水:" prop="planWater">
                        <el-input v-model="form.planWater" placeholder="计划用水"></el-input>
                    </el-form-item>
                    <el-form-item  label="所属水厂:" prop="factory">
                        <el-select v-model="form.factory" placeholder="所属水厂">
                            <el-option
                                    v-for="item in factoryList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  label="所属人员:" prop="worker">
                        <el-select v-model="form.worker" placeholder="所属人员">
                            <el-option
                                    v-for="item in works"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  label="巡检频率:" prop="rate">
                        <el-input v-model="form.rate" placeholder="巡检频率"></el-input>
                    </el-form-item>
                    <el-form-item  label="启用状态:" prop="status">
                        <el-select v-model="form.status" placeholder="启用状态">
                            <el-option
                                    v-for="item in statusList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="long-text" label="备注:" prop="remark">
                        <el-input  type="textarea" v-model="form.remark" placeholder="备注"></el-input>
                    </el-form-item>
                    <el-form-item >
                        <el-button type="primary" @click="goback">取消</el-button>
                        <el-button type="primary" @click="save">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "add-record",
        data(){
            return{
                form:{
                    planWater:'',
                    factory:'',
                    worker:'',
                    rate:'',
                    status:'1',
                    remark:''
                },
                rules:{
                    planWater:[
                        {
                            required:true,
                            trigger:'blur',
                            message:'请输入用水量'
                        }
                    ],
                    factory:[
                        {
                            required:true,
                            trigger:'blur',
                            message:'请输入水厂'
                        }
                    ],
                    worker:[
                        {
                            required:true,
                            trigger:'blur',
                            message:'请选择人员'
                        }
                    ],
                    rate:[
                        {
                            required:true,
                            trigger:'blur',
                            message:'请输入频率'
                        }
                    ],
                    status:[
                        {
                            required:true,
                            trigger:'blur',
                            message:'请选择启用状态'
                        }
                    ],
                    remark:[
                        {
                            required:false,
                            trigger:'blur',
                            message:'请输入备注'
                        }
                    ]
                },
                factoryList:[
                    {
                        label:'一水厂',
                        value:'1'
                    },
                    {
                        label:'二水厂',
                        value:'2'
                    }
                ],
                statusList:[
                    {
                        label:'启用',
                        value:'1'
                    },
                    {
                        label:'关闭',
                        value:'2'
                    }
                ],
                works:[
                    {
                        label:'张三',
                        value:'1'
                    },
                    {
                        label:'李四',
                        value:'2'
                    }
                ]
            };
        },
        methods:{
            goback(){
                this.$emit('showAside',true);
                this.$router.go(-1);
            },
            save(){
                let that = this;
                this.$refs.form.validate(valid=>{
                    if(valid){
                        console.log('哈哈哈哈哈');
                        that.$router.go(-1);
                        that.$emit('showAside',true);
                    }
                })

            }

        }
    };
</script>

<style scoped lang="scss">
#addRecord{
    width: 100%;
    height: 100%;
    .top-actions {
        position: relative;
        width: 100%;
        height: 50px;
        padding: 10px 10px;
        box-shadow: 3px 5px 15px rgba(0, 0, 0, 0.1);
        background-color: #fff;

        .back {
            width: 80px;
            height: 30px;
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 10;
            text-align: center;
        }
    }
    .wraper {
        width: 1200px;
        height: calc(100% - 50px);
        padding: 10px;
        margin: 0 auto;
        overflow-y: auto;

        .top-head {
            width: 100%;
            font-size: 16px;
            line-height: 25px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        .main-content{
            width: 100%;
            /deep/ .el-form-item{
                width: calc(50% - 10px);
                &.long-text{
                    width: 100%;
                    .el-form-item__content{
                        width: calc(100% - 200px);
                        textarea{
                            height: 200px;
                            width: calc(100% - 180px);
                        }
                    }

                }
            }
            .el-form-item:last-child{
                width: 100%;
                display: flex;
                justify-content: center;
                .el-button{
                    margin-left: 20px;
                }
            }
        }

    }
}
</style>
