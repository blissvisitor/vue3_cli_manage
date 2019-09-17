<template>
    <div id="yindong_detail">
        <div class="top-head">
            <span>工程概览</span>
        </div>
        <div class="row">

            <div class="col">
                <span class="green">{{tempData.ownArea}}</span>
                <span>覆盖范围</span>
            </div>
            <div class="col">
                <span class="green">{{tempData.lastDayOut}}</span>
                <span>供水规模(万m³/日)</span>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <span class="green">{{tempData.peopleCount}}</span>
                <span>受益人口(万)</span>
            </div>
            <div class="col">
                <span class="green">{{tempData.lastOutRate}}%</span>
                <span>供水用户(万户)</span>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <span class="green">{{tempData.lastDayIn}}</span>
                <span>昨日供水量(万m³)</span>
            </div>
            <div class="col">
                <span class="green">{{tempData.lastInRate}}%</span>
                <span>环比</span>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <span class="green">{{tempData.currentDayOut}}</span>
                <span>本年取水量(万m³)</span>
            </div>
            <div class="col">
                <span class="red">{{tempData.currentOutRate}}%</span>
                <span>同比</span>
            </div>
        </div>
        <div class="qc-panel">
            <four-rates-overview  ref="charts" />
        </div>

        <div class="top-head">
            <span>2019年度水厂考核排名</span>
        </div>
        <div class="bar-list-chart">
<!--            <span>图表</span>-->

            <div class="bar-chart" ref="barChart"></div>

        </div>

    </div>
</template>

<script>
    import {getGszbtj} from '../../api/interfaces/oneMap_api';
    import FourRatesOverview from "../../common/components/FourRatesOverview";

    let ChartPie1;
    let ChartPie2;
    let ChartPie3;
    let ChartPie4;

    let BarChart;

    export default {
        name: 'yindong_detail',
        components: {FourRatesOverview},
        data(){
            return{
                tempData:{
                    peopleCount:39.8,
                    ownArea:'全县',
                    lastDayOut:2.44,
                    lastOutRate:1.2,
                    lastDayIn:1.82,
                    lastInRate:1.2,
                    currentDayOut:4.62,
                    currentOutRate:-1.2,
                    currentDayIn:4.14,
                    currentInRate:-1.2,
                    resrvoirCount:2,
                    pumpCount:17,
                    userDevCount:8270,
                    factoryCount:5,
                    poolCount:17,
                    yearCost:1789723.95,
                    yearRate:1.5,
                    monthConst:174958.45,
                    monthRate:2.5
                }
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
            changeVal(type){
                switch (type) {
                    case '1':
                        this.tempData = this.pannelData;
                        break;
                    case '2':
                        this.tempData = this.pannelData_middle;

                        break;
                    case '3':
                        this.tempData = this.pannelData_west;
                        break;
                    case '4':
                        this.tempData = this.pannelData_east;
                        break;
                }
            },
            initBar(obj){
                return {

                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                        formatter: "{b} <br> 合格率: {c}%"
                    },
                    /*legend: {
                        data: [date]
                    },*/
                    grid: {
                        left: '4%',
                        right: '4%',
                        top:'10px',
                        // bottom: '20px',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01],
                        min: 0,
                        max: 100,
                        interval: 20,
                        axisLabel: {
                            formatter: '{value}%',
                            textStyle: {
                                //color: '#fff',
                                fontWeight: '80'
                            }
                        }
                    },
                    yAxis: {
                        type: 'category',
                        data: ['湖北省', '湖南省', '河南省', '安徽省', '浙江省', '山东省', '广东省'],
                        axisLabel: {
                            show: true,
                            interval: 0,
                            rotate: 0,
                            margin: 10,
                            inside: false,
                            textStyle: {
                                //color: '#fff',
                                fontWeight: '50'
                            }
                        }
                    },
                    series: [{
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                // formatter: '{c}',
                                formatter: function(v) {
                                    var val = v.data;
                                    if (val == 0) {
                                        return '';
                                    }
                                    return val;
                                },
                                color: '#fff'
                            }
                        },
                        data: [22, 33, 44, 55, 66, 77, 88]
                    }]
                }
            },
            // 获取四率一览的数据
            getGszbtj_(){
                let that = this;
                getGszbtj({
                    adcd:'6403'
                },that).then(res=>{
                    console.log(res);

                    let {data} = res;
                    data = {
                        gsbzl:data.gsbzl? parseFloat(data.gsbzl):0 ,
                        szdbl:data.szdbl? parseFloat(data.szdbl):0,
                        zlspjl:data.zlspjl? parseFloat(data.zlspjl):0,
                        jzgsl:data.jzgsl? parseFloat(data.jzgsl):0
                    };

                    that.$refs.charts.showChart(data);
                    BarChart =that.$echarts.init(that.$refs.barChart);
                    BarChart.setOption(
                        that.initBar({name:'集中供水',value:99,colorDeep:'#1CB092',colorShallow:'#44EECC'})
                    );
                });
            }
        },
        mounted() {
            let that = this;

            this.$nextTick(()=>{
                that.getGszbtj_();

            });
        }
    };
</script>

<style scoped lang="scss">
    #yindong_detail{
        width: 220px;
        border-radius: 5px;
        border: 1px solid #ccc;
        overflow-y: auto;
        background: #fff;
        color: #333;
        position: relative;
        @media screen and (max-width: 1600px) {
            max-height: 500px;
        }
        @media screen and (min-width: 1602px) {
            max-height: 800px;
        }
        .top-head{
            justify-content: center;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 10px;
        }

        .row{
            padding: 0 5px;
        }
        .row:first-child{
            width: 100%;
            height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .col{
                width: 50%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: #333;
                font-size: 12px;
                span.green{
                    color: #0BA1C2;
                    font-weight: 600;
                    font-size: 14px;
                    line-height: 20px;
                }
            }
        }
        .row:not(:first-child){
            width: 100%;
            height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .col{
                width: 50%;
                height: 100%;
                font-size: 12px;
                color: #333;
                display: flex;
                flex-direction: column;
                &:first-child{
                    justify-content: flex-start;
                    align-items: flex-start;;
                }
                &:last-child{
                    justify-content: flex-start;
                    align-items: center;
                    span{
                        display: inline-block;
                        width: 100%;
                        text-align: right;
                    }
                }
                span{
                    &.green{
                        color: #0BA1C2;
                        font-size: 14px;
                        font-weight: 600;
                        line-height: 20px;
                    }
                    &.red{
                        color: red;
                        font-size: 14px;
                        font-weight: 600;
                        line-height: 20px;
                    }
                }
            }
        }
        .qc-panel{
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
        .sm-title{
            width: 100%;
            text-align: center;
            height: 40px;
            color: #135688;
            font-weight: 600;
            span{
                line-height: 40px;
            }
        }
        .laber-wrap{
            width: 100%;
            .label-item{
                width: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height: 60px;
                margin-bottom: 10px;
                border: 1px solid #e9e9e9;
                &:last-child{
                    margin-bottom: 0;
                }
                .title{
                    width: 20px;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    font-size: 12px;
                    text-align: center;
                    color: #fff;
                }
                &:nth-child(1){
                    .title{
                        background: #FCB96C;
                    }
                }
                &:nth-child(2){
                    .title{
                        background: #0690F8;
                    }
                }
                &:nth-child(3){
                    .title{
                        background: #07C087;
                    }
                }

                .content-list{
                    width: calc(100% - 20px);
                    height: 100%;
                    display: flex;
                    justify-content: space-between;
                    .content-item{
                        width: 25%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        span.green{
                            color: #03C9FB;
                            line-height: 20px;
                            font-size: 14px;
                            font-weight: 600;
                        }
                        span:last-child{
                            font-size: 12px;
                        }
                    }
                }

            }
        }

        .bar-list-chart{
            width: 100%;
            .bar-chart{
                width: 100%;
                height: 400px;
            }
        }
    }
</style>
