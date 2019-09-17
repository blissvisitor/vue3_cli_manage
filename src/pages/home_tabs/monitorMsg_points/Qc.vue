<template>
	<div id="qc">
		<div class="row">
			<span>起始时间:</span>
			<input
				class="Wdate"
				ref="sdate"
				v-model="sdate"
				id="sdate"
				name="sdate"
				onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:'readOnly',minDate:'#F{$dp.$D(\'edate\',{M:-12})}',maxDate:'#F{ $dp.$D(\'edate\')}'})"
				placeholder="请选择开始时间"
				type="text"
			/>
			<span>至</span>
			<input
				class="Wdate"
				ref="edate"
				v-model="edate"
				id="edate"
				name="edate"
				onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:'readOnly',minDate:'#F{$dp.$D(\'sdate\')}',maxDate:'#F{$dp.$D(\'sdate\',{M:+12})}'})"
				placeholder="请选择结束时间"
				type="text"
			/>
			<el-button type="primary" @click="search">搜索</el-button>
		</div>
		<div class="row">
			<template>
				<el-radio v-model="qc_radio" @change="selectThisParams" label="PH">PH</el-radio>
				<el-radio v-model="qc_radio" @change="selectThisParams" label="TURB">浊度</el-radio>
				<el-radio v-model="qc_radio" @change="selectThisParams" label="CHL">余氯</el-radio>
			</template>
			<!-- <template v-if="factoryName == '东部净水厂水质监测点'">
				<el-radio v-model="qc_radio" @change="selectThisParams" label="PH">PH</el-radio>
				<el-radio v-model="qc_radio" @change="selectThisParams" label="TDS">导电率</el-radio>
				<el-radio v-model="qc_radio" @change="selectThisParams" label="DO">溶解氧</el-radio>
			</template>
			<template v-if="factoryName == '窑山扩建水厂水质监测点'">
				<el-radio v-model="qc_radio" @change="selectThisParams" label="PH">PH</el-radio>
				<el-radio v-model="qc_radio" @change="selectThisParams" label="TDS">导电率</el-radio>
				<el-radio v-model="qc_radio" @change="selectThisParams" label="DO">溶解氧</el-radio>
				<el-radio v-model="qc_radio" @change="selectThisParams" label="TURB">浊度</el-radio>
				<el-radio v-model="qc_radio" @change="selectThisParams" label="CL">余氯</el-radio>
			</template>
			<template v-if="factoryName == '麻疙瘩、合合山净水厂水质监测点' || factoryName == '马家洼子净水厂水质监测点' || factoryName == '王团净水厂水质监测点'">
				<el-radio v-model="qc_radio" @change="selectThisParams" label="PH">PH</el-radio>
				<el-radio v-model="qc_radio" @change="selectThisParams" label="TDS">导电率</el-radio>
				<el-radio v-model="qc_radio" @change="selectThisParams" label="DO">溶解氧</el-radio>
				<el-radio v-model="qc_radio" @change="selectThisParams" label="TURB">浊度</el-radio>
				<el-radio v-model="qc_radio" @change="selectThisParams" label="CL">余氯</el-radio>
			</template>
			<template v-if="factoryName == '小洪沟净水厂水质监测点'">
				<el-radio v-model="qc_radio" @change="selectThisParams" label="PH">PH</el-radio>
				<el-radio v-model="qc_radio" @change="selectThisParams" label="TDS">导电率</el-radio>
				<el-radio v-model="qc_radio" @change="selectThisParams" label="DO">溶解氧</el-radio>
				<el-radio v-model="qc_radio" @change="selectThisParams" label="CL">余氯</el-radio>
			</template> -->
		</div>
		<div class="sub-charts">
			<div v-show="qc_radio === 'PH'" id="pipe_ph"></div>
			<div v-show="qc_radio === 'TURB'" id="pipe_turb"></div>
			<div v-show="qc_radio === 'CHL'" id="pipe_chl"></div>
		</div>
	</div>
</template>

<script>
import {
	// 获取水质监测信息详情
	getSzList
} from '../../../api/interfaces/oneMap_api';

let chart_ph = null;
let chart_turb = null;
let chart_chl = null;
export default {
	name: 'qc',
	props: ['temp_id', 'ext', 'factoryName'],
	components: {},
	data() {
		return {
			stcd: '',
			sdate: '',
			edate: '',
			radio: 'TURB',
			current_id: '',
			name: '浊度',
			unit: '(NTU)',
			qc_radio: 'PH',
			chlList: [],
			phList: [],
			turbList: []
		};
	},
	methods: {
		// 水质
		getWqList_(callback) {
			const that = this;

			that.sdate = that.$refs.sdate.value;
			that.edate = that.$refs.edate.value;
			// 选择的时间跨度不能大于 7天
			if (new Date(that.edate).getTime() - new Date(that.sdate).getTime() > 7 * 24 * 60 * 60 * 1000) {
				that.$message.error('开始时间和结束时间不能大于7天');
				return;
			}
			const { stcd = '', sdate, edate } = that;

			/**
			 * 获取水质监测信息详情
			 * @param {stcd}      	[false string]	分区县编码
			 * @param {stm}     	[false string] 	关键字查询
			 * @param {etm}     	[false string] 	关键字查询
			 */
			const params = {
				stcd,
				stm: sdate,
				etm: edate
			};
			return getSzList(params, that)
				.then((results = {}) => {
					const { status, data } = results;

					if (status) {
						const chlList = [];
						const phList = [];
						const turbList = [];
						Array.isArray(data) && data[0]
							? data.forEach((item = {}) => {
									const tm = new Date(item.tm).getTime();

									chlList.push([tm, item.chl]);
									phList.push([tm, item.ph]);
									turbList.push([tm, item.turb]);
							  })
							: [];

						that.chlList = chlList;
						that.phList = phList;
						that.turbList = turbList;
					}

					callback && callback();
				})
				.catch(e => console.error(e));
		},
		search() {
			this.getWqList_(() => this.selectThisParams());
		},
		// 切换 水质的 监测点
		selectThisParams() {
			const that = this;
			const { ext = {}, chlList, phList, turbList, qc_radio } = that;

			const val = qc_radio;
			const { chlRange = '', phRange = '', turbRange = '' } = ext;

			const tooltip = {
				trigger: 'axis',
				axisPointer: {
					type: 'line'
				}
			};
			const grid = {
				top: '30px',
				left: '60px',
				right: '45px',
				bottom: '60px'
			};
			const xAxis = {
				show: true,
				name: '时间',
				type: 'time',
				splitLine: {
					show: false
				}
			};
			const yAxis = {
				show: true,
				name: '(PH)',
				scale: true,
				splitLine: {
					show: false
				}
			};
			const series0 = {
				type: 'line',
				barWidth: '10%',
				smooth: true
			};

			// 绘制图表 水位
			const legend = {
				bottom: '-5px',
				left: 'center',
				data: []
			};
			// const chartColor = ['#1b84ea', '#d73a35', '#28ab75'];
			const lineStyleDotted = {
				type: 'line',
				lineStyle: {
					type: 'dotted',
					opacity: 1
				}
			};

			let upArr = [];
			let downArr = [];
			let commonRange = '';
			let commonList = [];
			// PH
			if (val === 'PH') {
				commonRange = phRange;
				commonList = phList;
			}
			// 浊度
			if (val === 'TURB') {
				commonRange = turbRange;
				commonList = turbList;
			}
			// 余氯
			if (val === 'CHL') {
				commonRange = chlRange;
				commonList = chlList;
			}
			console.warn('start ext', ext, 'end ext');
			// console.warn('ext', ext, 'ext');
			// console.warn('gisProfileStart');
			// console.warn(turbRange);
			// console.warn(upArr);
			// console.warn(downArr);
			// console.warn('gisProfileEnd');
			const PLACEHOLDER = Array.from(new Array(7)).map((_, key) => [Date.now() + (7 - (key + 1)) * 24 * 60 * 60 * 1000, null]);
			if (String(commonRange).indexOf('~') !== -1) {
				const [down, up] = commonRange.split('~');
				const flag = Array.isArray(commonList) && commonList[0];
				flag || (commonList = PLACEHOLDER);
				upArr = up === '--' || !up ? [] : commonList.map((item = {}) => [item[0], up]);
				downArr = down === '--' || !down ? [] : commonList.map((item = {}) => [item[0], down]);
				flag || (commonList = []);
			}
			if (String(commonRange).indexOf('≤') !== -1) {
				const up = commonRange.substr(1);
				const flag = Array.isArray(commonList) && commonList[0];
				flag || (commonList = PLACEHOLDER);
				upArr = up === '--' || !up ? [] : commonList.map((item = {}) => [item[0], up]);
				downArr = [];
				flag || (commonList = []);
			}
			if (String(commonRange).indexOf('≥') !== -1) {
				const down = commonRange.substr(1);
				const flag = Array.isArray(commonList) && commonList[0];
				flag || (commonList = PLACEHOLDER);
				upArr = [];
				downArr = down === '--' || !down ? [] : commonList.map((item = {}) => [item[0], down]);
				flag || (commonList = []);
			}

			console.warn('val', val);
			console.warn('commonRange', commonRange);
			console.warn('upArr', upArr[0]);
			console.warn('downArr', downArr[0]);
			// PH
			if (val === 'PH') {
				const series = [
					Array.isArray(upArr) &&
						upArr[0] && {
							...lineStyleDotted,
							name: '上限',
							itemStyle: { normal: { color: '#1b84ea' } },
							data: upArr
						},
					{
						name: 'PH',
						itemStyle: { normal: { color: '#d73a35' } },
						type: 'line',
						data: phList
					},
					Array.isArray(downArr) &&
						downArr[0] && {
							...lineStyleDotted,
							name: '下限',
							itemStyle: { normal: { color: '#28ab75' } },
							data: downArr
						}
				].filter(i => i);

				chart_ph = that.$echarts.init(document.getElementById('pipe_ph'));
				that.$nextTick(() => {
					chart_ph.setOption({
						tooltip,
						grid,
						xAxis,
						yAxis: {
							...yAxis,
							name: '(PH)',
						},
						// color: chartColor,
						legend: {
							...legend,
							data: ['上限', 'PH', '下限']
						},
						series
					});
				});
			}
			// 浊度
			if (val === 'TURB') {
				const series = [
					Array.isArray(upArr) &&
						upArr[0] && {
							...lineStyleDotted,
							name: '上限',
							itemStyle: { normal: { color: '#1b84ea' } },
							data: upArr
						},
					{
						name: '浊度',
						itemStyle: { normal: { color: '#d73a35' } },
						type: 'line',
						data: turbList
					},
					Array.isArray(downArr) &&
						downArr[0] && {
							...lineStyleDotted,
							name: '下限',
							itemStyle: { normal: { color: '#28ab75' } },
							data: downArr
						}
				].filter(i => i);

				chart_turb = that.$echarts.init(document.getElementById('pipe_turb'));
				that.$nextTick(() => {
					chart_turb.setOption({
						tooltip,
						grid,
						xAxis,
						yAxis: {
							...yAxis,
							name: '(°)'
						},
						// color: chartColor,
						legend: {
							...legend,
							data: ['上限', '浊度', '下限']
						},
						series
					});
				});
			}
			// 余氯
			if (val === 'CHL') {
				const series = [
					Array.isArray(upArr) &&
						upArr[0] && {
							...lineStyleDotted,
							name: '上限',
							itemStyle: { normal: { color: '#1b84ea' } },
							data: upArr
						},
					{
						name: '余氯',
						itemStyle: { normal: { color: '#d73a35' } },
						type: 'line',
						data: chlList
					},
					Array.isArray(downArr) &&
						downArr[0] && {
							...lineStyleDotted,
							name: '下限',
							itemStyle: { normal: { color: '#28ab75' } },
							data: downArr
						}
				].filter(i => i);

				chart_chl = that.$echarts.init(document.getElementById('pipe_chl'));
				that.$nextTick(() => {
					chart_chl.setOption({
						tooltip,
						grid,
						xAxis,
						yAxis: {
							...yAxis,
							name: '(mg/L)'
						},
						// color: chartColor,
						legend: {
							...legend,
							data: ['上限', '余氯', '下限']
						},
						series
					});
				});
			}
		}
	},
	mounted() {
		this.getWqList_(() => {
			this.selectThisParams('PH');
		});
	},
	created() {
		let time = new Date();
		let currentDate = time.toLocaleDateString();
		this.edate = this.sdate = currentDate.replace(/\//g, '-');
		this.current_id = this.temp_id.split(',')[0];

		this.stcd = this.temp_id;
	}
};
</script>

<style scoped lang="scss">
#qc {
	width: 100%;
	height: 100%;
	padding: 10px;
	.row {
		width: 100%;
		height: 35px;
		padding: 10px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		span {
			display: inline-block;
			width: 80px;
			text-align: center;
		}
		.el-date-editor.el-input {
			width: 220px;
		}
		.el-button {
			margin-left: 10px;
		}
	}
	.sub-charts {
		width: 100%;
		height: calc(100% - 70px);
		& > div {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
