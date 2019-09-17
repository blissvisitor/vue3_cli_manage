<template>
    <div id="addRepair">
        <div class="top-actions">
            <div class="back"><span class="go-back" @click="goback">返回</span></div>
        </div>
        <div class="wraper">
            <div class="top-head">
                <span>一、基本信息</span>
            </div>
            <div class="main-content">
                <el-form ref="form" :inline="lineFlag" :rules="rules" :model="form" label-width="120px">
                    <el-form-item label="上报时间:" prop="time">
                        <el-date-picker v-model="form.time" type="date" placeholder="上报时间"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="上报人:" prop="reporter">
                        <el-select v-model="form.reporter" placeholder="上报人">
                            <el-option
                                    v-for="item in reporters"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属水厂:" prop="factory">
                        <el-select v-model="form.factory" placeholder="所属水厂">
                            <el-option
                                    v-for="item in factoryList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="地点:" prop="address">
                        <el-input v-model="form.address" placeholder="地点"></el-input>
                    </el-form-item>
                    <el-form-item label="隐患对象:" prop="dangerObj">
                        <el-select v-model="form.dangerObj" placeholder="隐患对象">
                            <el-option
                                    v-for="item in hurryLevList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="紧急程度:" prop="hurryLev">
                        <el-select v-model="form.hurryLev" placeholder="紧急程度">
                            <el-option
                                    v-for="item in hurryLevList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="top-head">
                <span>二、隐患描述</span>
            </div>
            <div class="main-content">
                <el-input type="textarea" v-model="form.remark" placeholder="请输入描述信息"></el-input>
            </div>
            <div class="top-head">
                <span>三、图片</span>
            </div>
            <div class="main-content">
                <el-upload
                        action="#"
                        list-type="picture-card"
                        :auto-upload="false">
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{file}">
                            <img
                                    class="el-upload-list__item-thumbnail"
                                    :src="file.url" alt=""
                            >
                            <span class="el-upload-list__item-actions">
                                <span
                                    class="el-upload-list__item-preview"
                                    @click="handlePictureCardPreview(file)"
                                >
                                <i class="el-icon-zoom-in"></i>
                                </span>
                                <span
                                        v-if="!disabled"
                                        class="el-upload-list__item-delete"
                                        @click="handleDownload(file)"
                                >
                                  <i class="el-icon-download"></i>
                                </span>
                                <span
                                        v-if="!disabled"
                                        class="el-upload-list__item-delete"
                                        @click="handleRemove(file)"
                                >
                                <i class="el-icon-delete"></i>
                                </span>
                            </span>
                        </div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <div class="model-no-id"></div>
            </div>

            <div class="actions">
                <span class="goback" @click="goback">取消</span>
                <span class="save" @click="save">保存</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'add-repair',
        data() {
            return {
                lineFlag:true,
                form: {
                    time: '',
                    factory: '',
                    reporter: '',
                    address: '',
                    dangerObj: '1',
                    hurryLev: '',
                    remark: ''
                },
                rules: {
                    time: [
                        {
                            required: true,
                            trigger: 'blur'
                        }
                    ],
                    factory: [
                        {
                            required: true,
                            trigger: 'blur'
                        }
                    ],
                    reporter: [
                        {
                            required: true,
                            trigger: 'blur'
                        }
                    ],
                    address: [
                        {
                            required: true,
                            trigger: 'blur'
                        }
                    ],
                    dangerObj: [
                        {
                            required: true,
                            trigger: 'blur'
                        }
                    ],
                    hurryLev: [
                        {
                            required: true,
                            trigger: 'blur'
                        }
                    ],
                    remark: [
                        {
                            required: true,
                            trigger: 'blur'
                        }
                    ]
                },
                reporters: [
                    {
                        label: '张三',
                        value: '1'
                    },
                    {
                        label: '李四',
                        value: '2'
                    }
                ],
                factoryList: [
                    {
                        label: '水厂一',
                        value: '1'
                    },
                    {
                        label: '水厂二',
                        value: '2'
                    }
                ],
                hurryLevList: window.DSE.dangerlist,
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false
            };
        },
        methods: {
            goback() {
                this.$emit('showAside', true);
                this.$router.go(-1);
            },
            save() {
                let that = this;
                this.$refs.form.validate(valid => {
                    if (valid) {
                        console.log('哈哈哈哈哈');
                        that.$router.go(-1);
                        that.$emit('showAside', true);
                    }
                })

            },
            handleRemove(file) {
                console.log(file);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleDownload(file) {
                console.log(file);
            }
        },
        created() {
            this.form.time = this.$days().format('YYYY-MM-DD');
        }
    };
</script>

<style scoped lang="scss">
    #addRepair {
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

            .main-content {
                width: 100%;
                overflow-x: auto;
                margin-bottom: 10px;
                position: relative;

                /deep/ .el-form-item {
                    width: calc(50% - 10px);
                    &:nth-child(odd){
                        margin-right: 0px;
                    }
                }

                /deep/ .el-form-item__content {
                    width: calc(100% - 130px);

                    p {
                        width: 100%;
                        padding: 10px;
                        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.15);
                    }

                    .audio-item {
                        width: 200px;
                        height: 40px;
                        line-height: 40px;
                        background: #e9e9e9;
                        padding: 0 10px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border-radius: 4px;
                        position: relative;
                        cursor: pointer;

                        audio {
                            position: absolute;
                            top: 0;
                            left: 0;
                            z-index: -1;
                        }
                    }
                }

                .model-no-id{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 10;
                    background: rgba(0,0,0,0.02);
                    cursor: not-allowed;
                }

            }

        }
    }
</style>
