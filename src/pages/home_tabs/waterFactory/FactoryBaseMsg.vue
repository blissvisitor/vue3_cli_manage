<template>
    <div id="BaseMsg_">
      <div class="table-content">
        <table class="innerTable first-no-line">
          <tbody>
          <tr>
            <td><span>日生产能力:</span></td>
            <td><span>{{baseInfo.dayCap}}</span></td>
            <td><span>供水范围:</span></td>
            <td><span>{{baseInfo.wsReg}}</span></td>
          </tr>
          <tr>
            <td><span>供水对象:</span></td>
            <td><span>{{baseInfo.wsObj}}</span></td>
            <td><span>供水人口（万人）:</span></td>
            <td><span>{{baseInfo.wsPp}}</span></td>
          </tr>
          <tr>
            <td><span>负责人:</span></td>
            <td><span>{{baseInfo.fzrnm}}</span></td>
            <td><span>负责人电话:</span></td>
            <td><span>{{baseInfo.fzrtel}}</span></td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="imgs">
        <div class="img-head">
          <span class="rect"></span>
          <span>图片</span>
        </div>
        <div class="img-list">
         <template v-if="imgs&&imgs.length>0">
           <img :src="imgStaticPath+val.filePath" alt="" v-for="(val,index) in imgs" :key="index">
         </template>
        </div>
      </div>


    </div>
</template>

<script>

  import {mapGetters} from 'vuex';

    import {getWrWfctB} from '../../../api/interfaces/oneMap_api';
    import {getDseUploadFileList} from '../../../api/interfaces/common_api';

    export default {
      name: 'factoryBaseMsg',
      props:{
        factoryId:{
          type:String,
          defaultProps:''
        }
      },
      computed:{
        ...mapGetters({
          imgStaticPath:'root_store/get_imgStaticPath'
        })
      },
      data(){
          return{
            baseInfo:{
              dayCap:'',
              wsReg:'',
              wsObj:'',
              wsPp:'',
              fzrnm:'',
              fzrtel:''
            },
            imgs:[],
            staticPathUrl:''
          };
      },
      methods:{
        // 获取 水厂的 基本信息
        getWaterworksBase_(){
          let that = this;
          getWrWfctB({
            wfctCd:that.factoryId
          },that).then(res=>{

            let {data} = res;
            that.baseInfo = {
              ...that.baseInfo,
              ...data
            }

          });
        },
        // 获取 附件 图片信息
        getDseUploadFileList_(){
          let that = this;
          getDseUploadFileList({
            fileBiz: that.factoryId,
            pageNum: '1',
            pageSize: '100'
          },that).then(res=>{
              let {data} = res;
              let {list=[]} = data;
              list = list&&list.length>0?list:[];
              that.imgs = [...list];
          });
        }
      },
      created() {
          this.getWaterworksBase_();
          this.getDseUploadFileList_();
      }
    };
</script>

<style scoped lang="scss">
#BaseMsg_{
  width: 100%;
  height: 100%;

  table{
    border-top:1px solid #e9e9e9;
  }
  .imgs{
    width: 100%;
    height: calc(100% - 106px);
    overflow-y: auto;
    .img-head{
      width: 100%;
      height: 30px;
      margin-bottom: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      span{
        display: inline-block;
        margin-right: 10px;
      }
    }
    .img-list{
      width: 100%;
      height: calc(100% - 40px);
      overflow-y: auto;
      display: flex;
      flex-flow: wrap;
      justify-content: flex-start;
      align-items: center;
      img{
       width: calc(50% - 10px);
        margin-right: 10px;
        &:nth-child(even){
          margin-right: 0;
        }
      }

    }
  }



















}
</style>
