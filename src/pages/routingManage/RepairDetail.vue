<template>
    <div id="pipeRepair">
        <div class="top-actions">
            <div class="back"><span class="go-back" @click="goback">返回</span></div>
        </div>
        <div class="wraper">
            <div class="top-head">
                <span>一、基本信息</span>
            </div>
            <div class="main-content">
                <el-form ref="form" inline=true  :model="form" label-width="120px">
                    <el-form-item label="上报时间:" >
                        <span>{{ form.time}}</span>
                    </el-form-item>
                    <el-form-item  label="上报人:" >
                        <span>{{form.reporter}}</span>
                    </el-form-item>
                    <el-form-item  label="所属水厂:">
                        <span>{{form.factory}}</span>
                    </el-form-item>
                    <el-form-item  label="地点:" >
                        <span>{{form.address}}</span>
                    </el-form-item>
                    <el-form-item  label="隐患对象:">
                        <span>{{form.dangerObj}}</span>
                    </el-form-item>
                    <el-form-item  label="紧急程度:" >
                        <span>{{form.hurryLev}}</span>
                    </el-form-item>
                </el-form>
            </div>
            <div class="top-head">
                <span>二、隐患描述</span>
            </div>
            <div class="main-content">
                <el-form ref="form" inline=true  :model="form" label-width="120px">
                    <el-form-item label="语音:" style="width: 100%">
                        <div class="audio-item">
                            <span>图标</span>
                            <span>13″</span>
                            <audio preload="auto" hidden="true">
                                <source src="" type="audio/mpeg">
                            </audio>
                        </div>
                    </el-form-item>
                    <el-form-item  label="描述信息:" style="width: 100%">
                        <p>哈哈哈哈哈</p>
                    </el-form-item>
                </el-form>
            </div>
            <div class="top-head">
                <span>三、图片</span>
            </div>
            <div class="main-content">
                <div class="imgs">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {

        },
        data() {
            return {
                form:{
                    time:'',
                    factory:'',
                    reporter:'',
                    address:'',
                    dangerObj:'1',
                    hurryLev:''
                },
            };
        },
        methods: {
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
        },
        created() {


        },
        filters: {


        },
        beforeDestroy() {

        }

    };
</script>

<style lang="scss" scoped>
    #pipeRepair {
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
                }
                /deep/ .el-form-item__content{
                    width: calc(100% - 130px);
                    p{
                       width: 100%;
                        padding: 10px;
                        box-shadow:inset 0 0 10px rgba(0,0,0,0.15);
                    }
                    .audio-item{
                        width: 200px;
                        height: 40px;
                        line-height: 40px;
                        background: #e9e9e9;
                        padding:0 10px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border-radius: 4px;
                        position: relative;
                        cursor: pointer;
                        audio{
                            position: absolute;
                            top: 0;
                            left: 0;
                            z-index: -1;
                        }
                    }
                }

            }

        }

    }
</style>
