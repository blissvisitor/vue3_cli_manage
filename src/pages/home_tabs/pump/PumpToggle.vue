<template>
    <div id="pumpToggle">
      <template v-if="tabIndex==0">
        <configuration :pumpId="pumpId"/>
      </template>
      <template v-if="tabIndex==1">
        <monitor-manager ref="pump_monitor" :pumpId="pumpId"/>
      </template>
      <template v-if="tabIndex==2">
        <video-monitor :pumpId="pumpId"/>
      </template>
      <template v-if="tabIndex==3">
        <base-msg :pumpId="pumpId"/>
      </template>
      <template v-if="tabIndex==4">
        <pump-view-record :pumpName="pumpName"/>
      </template>
    </div>
</template>

<script>
    import Configuration from './Configuration';
    import MonitorManager from './MonitorManager';
    import VideoMonitor from './VideoMonitor';
    import BaseMsg from './BaseMsg';
    import PumpViewRecord from './PumpViewRecord';
    export default {
        name: 'pumpToggle',
      components: {PumpViewRecord, BaseMsg, VideoMonitor, MonitorManager, Configuration},
      props:['pumpId','pumpName'],
      data(){
          return{
            tabIndex:0
          };
      },
      methods:{
          activeThis(index){
            this.tabIndex = index;
          },
        resize(){
          let that = this;
          this.$nextTick(()=>{
            if(that.tabIndex==1){
              that.$refs.pump_monitor.resize();
            }
          });
        }
      },
      beforeDestroy() {
          this.tabIndex = 0;
      }
    };
</script>

<style scoped lang="scss">
#pumpToggle{
  width: 100%;
  height: 100%;
}
</style>
