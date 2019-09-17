<template>
    <div id="planList" >
        <div class="top-head-tabs">
            <div class="tab-item upload">
                <i class="el-icon-plus"></i>
                <span>上传</span>
            </div>
            <div class="tab-item">
                <span>下载</span>
            </div>
            <div class="tab-item">
                <span>删除</span>
            </div>
            <div class="tab-item">
                <span>移动到</span>
            </div>
            <div class="tab-item">
                <div class="dirctions">
                    <i class="el-icon-back"></i>
                    <i class="el-icon-right"></i>
                </div>
            </div>
            <div class="tab-item">
                <el-input v-model="keyname" placeholder="搜索文件名,回车结束" @keyup.enter.native="searchFiles"></el-input>
            </div>
        </div>
        <div class="files"  @contextmenu="showMenu">
            <template v-if="fileList&&fileList.length>0">
                <div  :title="item.name" class="file-wrapper-item" v-for="(item,i) in fileList" :key="i"  @contextmenu.prevent="selectThis(i,item)" @click="selectThis(i,item)">
                    <span class="select-box" :class="{select:item.status==true}"></span>
                    <img src="../../assets/images/common/folder.png" alt="">
                    <span class="hidden-long-text">{{item.name}}</span>
                </div>
            </template>

            <vue-context-menu :contextMenuData="contextMenuData"
                              @savedata="savedata"
                              @newdata="newdata"></vue-context-menu>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'plan-list',
        data(){
            return{
                keyname:'',
                fileIndex:null,
                fileList:[
                    {
                        name:'1',
                        status:false
                    },
                    {
                        name:'2',
                        status:false
                    },
                    {
                        name:'3',
                        status:false
                    },
                    {
                        name:'4',
                        status:false
                    }
                ],
                contextMenuData: {
                    menuName: 'actions',
                    axis: {
                        x: null,
                        y: null
                    },
                    menulists: [ {
                        fnHandler: 'newdata',
                        icoName: 'iconfont icon-inspectionPlan',
                        btnName: '新增文件夹'
                    }]
                }
            };
        },
        methods:{
            searchFiles(){
                console.log('————————————————————————————');
            },
            selectThis(index,data){
                let tempList = [...this.fileList];
                tempList[index].status = ! tempList[index].status;
                this.fileList = [...tempList];

                console.log('哈哈哈哈');
                this.contextMenuData.menulists = [
                    {
                        fnHandler: 'savedata', // Binding events(绑定事件)
                        icoName: 'iconfont icon-inspectionPlan', // icon (icon图标 )
                        btnName: '移动到' // The name of the menu option (菜单名称)
                    }, {
                        fnHandler: 'newdata',
                        icoName: 'iconfont icon-inspectionPlan',
                        btnName: '新增文件夹'
                    }
                ]
                console.log('******************');
            },
            showMenu () {
                event.preventDefault();
                var x = event.clientX;
                var y = event.clientY;
                // Get the current location
                this.contextMenuData.axis = {
                    x, y
                };
                this.contextMenuData.menulists = [ {
                        fnHandler: 'newdata',
                        icoName: 'iconfont icon-inspectionPlan',
                        btnName: '新增文件夹'
                    }
                ];
            },
            savedata () {
                alert(1)
            },
            newdata () {
                console.log('newdata!')
            }
        }
    };
</script>

<style scoped lang="scss">
#planList{
    width: 100%;
    height: 100%;
    background: #e9e9e9;
    .top-head-tabs{
        width: 100%;
        padding-top: 10px;
        display: flex;
        justify-content: left;
        align-items: center;
        height: 50px;
        margin-bottom: 10px;

        .tab-item{
            padding: 0 20px;
            height: 100%;
            line-height: 40px;
            text-align: center;
            cursor: pointer;
            background: #fff;
            margin-left: 20px;
            border-radius: 5px;
            &:hover{
                background: #ccc;
                color: #fff;
            }
            &.upload{
             background: #0b83fe;
             color: #fff;
            }
            .dirctions{
                width: 100%;
                height: 100%;
                padding:0  15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                i{
                    font-size: 18px;
                    font-weight: 600;
                    margin-right: 30px;
                    &:last-child{
                        margin-right: 0;
                    }
                }
            }
            .el-input{
                width: 300px;
            }

        }
    }
    .files{
        width: calc(100% - 20px);
        padding: 10px;
        margin: 0 auto;
        height: calc(100% - 70px);
        box-shadow:inset 0 0 10px rgba(0,0,0,0.12);
        display: flex;
        /*flex-direction: column;*/
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
        overflow-y: auto;
        background: #fff;

        .file-wrapper-item{
            width: 120px;
            height: 120px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            cursor: pointer;
            &:hover{
                background: rgba(0,0,0,0.01);
                border: 1px solid #0b83fe;
                .select-box{
                    opacity: 1;
                }
            }
            .select-box{
                display: inline-block;
                width: 16px;
                height: 16px;
                border: 1px solid #e9e9e9;
                position: absolute;
                top: 5px;
                left: 5px;
                opacity: 0;
                &.select{
                    background: url("../../assets/images/common/mult_selected.png");
                    opacity: 1 !important;
                }
            }
            .hidden-long-text{
                width: 100%;
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: center;
            }
        }













    }



}
</style>
