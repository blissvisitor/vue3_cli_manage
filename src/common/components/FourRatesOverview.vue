<template>
    <div id="fourRatesOverview">
        <div class="top">
            <span>四率一览</span>
        </div>
        <div class="chart-main">
            <div class="row">
                <div class="chart-item" ref="cycle1"></div>
                <div class="chart-item" ref="cycle2"></div>
            </div>
            <div class="row">
                <div class="chart-item" ref="cycle3"></div>
                <div class="chart-item" ref="cycle4"></div>
            </div>
        </div>
    </div>
</template>

<script>

    /**
     *  使用方式 父组件使用 this.refs.dom.showChart({xxx,xxx,xxx,xxx})
     *  @desc
     *  {
     *      gsbzl:'',
     *      szdbl:'',
     *      zlspjl:'',
     *      jzgsl:''
     *  }
     *
     */

    let ChartPie1;
    let ChartPie2;
    let ChartPie3;
    let ChartPie4;

    export default {
        name: "four-rates-overview",
        data(){
            return{

            };
        },
        methods:{
            initPie(obj){
                let label_fontSize=null;
                let fontSize =13;
                if(this.initWidth>1600){
                    label_fontSize = 18;
                }else{
                    label_fontSize = 18;
                }
                return  {
                    title: {
                        text: obj.value+'%',
                        top: '40px',
                        left: 'center',
                        textStyle: {
                            color:obj.colorShallow,
                            fontSize: label_fontSize
                        }
                    },
                    backgroundColor: '#fff',
                    'color': [obj.colorShallow, obj.colorShallow, obj.colorDeep],
                    series: [{
                        type: 'pie',
                        center: ['50%', '50%'],
                        radius: ['80%', '90%'],
                        hoverAnimation: false,
                        data: [{
                            name: '',
                            value: obj.value,
                            label: {
                                show: true,
                                color: obj.colorShallow,
                                fontSize: fontSize,
                                position:'center',
                                fontWeight: 'bold'
                            }
                        },
                            { //画中间的图标
                                name: '',
                                value: 0,
                                label: {
                                    position: 'inside',
                                    width: 30,
                                    height: 30,
                                    borderRadius: 30,
                                    padding: 30
                                }
                            }, { //画剩余的刻度圆环
                                name: '',
                                value: (100-obj.value),
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                }
                            }
                        ]
                    }]
                };
            },
            showChart(obj={}){
                let that = this;
                ChartPie1 =that.$echarts.init(that.$refs.cycle1);
                ChartPie1.setOption(
                    that.initPie({name:'供水保障',value:obj.gsbzl,colorDeep:'#ABF85E',colorShallow:'#6FC01F'})
                );
                ChartPie2 =that.$echarts.init(that.$refs.cycle2);
                ChartPie2.setOption(
                    that.initPie({name:'水质达标',value:obj.szdbl,colorDeep:'#D99606',colorShallow:'#F0BE54'})
                );
                ChartPie3 =that.$echarts.init(that.$refs.cycle3);
                ChartPie3.setOption(
                    that.initPie({name:'自来水普及',value:obj.zlspjl,colorDeep:'#137FB1',colorShallow:'#3BBAF5'})
                );
                ChartPie4 =that.$echarts.init(that.$refs.cycle4);
                ChartPie4.setOption(
                    that.initPie({name:'集中供水',value:obj.jzgsl,colorDeep:'#1CB092',colorShallow:'#44EECC'})
                );
            }
        },
        mounted() {
           this.showChart();
        }
    };
</script>

<style scoped lang="scss">
#fourRatesOverview{
    width: 100%;
    padding: 5px;
    border: 1px solid #e9e9e9;
    .top{
        width: 100%;
        text-align: center;
        font-size: 14px;
        line-height: 30px;
    }
    .chart-main{
        width: 100%;
        height: 240px;
        .row{
            width: 100%;
            height: 50%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .chart-item{
                width: 50%;
                height: 100%;
                padding: 10px;
                position: relative;
            }
            &:first-child{
                .chart-item{
                    &:first-child:after{
                        content: '供水保障';
                        position: absolute;
                        bottom: 0px;
                        left:20px;
                    }
                    &:last-child:after{
                        content: '水质达标';
                        position: absolute;
                        bottom: 0px;
                        left:20px;
                    }

                }
            }
            &:last-child{
                .chart-item{
                    &:first-child:after{
                        content: '自来水普及';
                        position: absolute;
                        bottom: 0px;
                        left:20px;
                    }
                    &:last-child:after{
                        content: '集中供水';
                        position: absolute;
                        bottom: 0px;
                        left:20px;
                    }

                }
            }
        }
    }
}
</style>
