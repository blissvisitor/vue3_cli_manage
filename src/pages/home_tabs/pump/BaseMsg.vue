<template>
  <div id="baseMsg">
    <div class="table-view">
      <table class="innerTable">
        <thead>
        <tr>
          <th><span>关键项</span></th>
          <th><span>参数值</span></th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><span>设计规模(万m³/天)</span></td>
          <td><span>{{baseInfo.dszfl}}</span></td>
        </tr>
        <tr>
          <td><span>扬程(m)</span></td>
          <td><span>{{baseInfo.desHead}}</span></td>
        </tr>
        <tr>
          <td><span>装机容量(KW)</span></td>
          <td><span>{{baseInfo.dsincp}}</span></td>
        </tr>
        <tr>
          <td><span>运行方式</span></td>
          <td><span>{{baseInfo.runMode}}</span></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="img-cards">
      <div class="top-title">
        <span class="rect"></span>
        <span>图片</span>
      </div>
      <div class="imgs">
        <template v-for="(val,index) in imgUrls">
          <img :src="imgStaticPath+val.filePath" alt="" :key="index">
        </template>

      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  import {getWrPumpB} from '../../../api/interfaces/oneMap_api';
  import {getDseUploadFileList} from '../../../api/interfaces/common_api';

  export default {
    name: 'baseMsg',
    props:{
      pumpId:{
        type:String,
        defaultProps:''
      }
    },
    computed:{
      ...mapGetters({
        imgStaticPath:'root_store/get_imgStaticPath'
      })
    },
    data() {
      return {
          baseInfo:{
            projScal:'',
            desHead:'',
            allEquWw:'',
            runCond:''
          },
          imgUrls:[],
         staticPathUrl:''
      };
    },
    methods:{
      // 获取泵站 基本信息
      getPumpAttrInfo_(){
        let  that  = this;
        getWrPumpB({
          pumpCd:that.pumpId
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
          fileBiz: that.pumpId,
          pageNum: '1',
          pageSize: '100'
        },that).then(res=>{
          let {data} = res;
          let {list=[]} = data;
          list = list&&list.length>0?list:[];
          that.imgUrls = [...list];
        });
      }
    },
    created() {
      this.getPumpAttrInfo_();
      this.getDseUploadFileList_();
    }
  };
</script>

<style scoped lang="scss">
  #baseMsg {
    width: 100%;
    height: 100%;

    .table-view {
      width: 100%;
      padding: 0 10px;
      /*height: 180px;*/
      /*overflow: auto;*/
    }

    .img-cards {
      width: 100%;
      height: calc(100% - 180px);

      .top-title {
        width: 100%;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #ccc;
        font-size: 16px;
        font-weight: 600;
        text-align: left;
      }

      .imgs {
        width: 100%;
        height: calc(100% - 30px);
        display: flex;
        justify-content: flex-start;
        flex-flow: wrap;
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
