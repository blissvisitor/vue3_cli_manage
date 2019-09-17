<template>
	<div id="press">
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
		<div class="sub-charts"><div id="pipe_press"></div></div>
	</div>
</template>

<script>
import {
	// 获取压力监测信息详情
	getYlList
} from '../../../api/interfaces/oneMap_api';

let pipe_press = null;
export default {
	name: 'press',
	props: ['temp_id', 'ext'],
	components: {},
	data() {
		return {
			sdate: '',
			edate: '',
			qc_radio: 'DP',
			wgageList: [],
			dpList: []
		};
	},
	methods: {
		selectThisParams() {
			const that = this;

			that.getPressureList_(() => that._drawLine());
		},
		// 水压
		getPressureList_(callback) {
			const that = this;

			that.sdate = that.$refs.sdate.value;
			that.edate = that.$refs.edate.value;
			// 选择的时间跨度不能大于 7天
			if (new Date(that.edate).getTime() - new Date(that.sdate).getTime() > 7 * 24 * 60 * 60 * 1000) {
				that.$message.error('开始时间和结束时间不能大于7天');
				return;
			}
			const { temp_id, sdate, edate } = that;
			/**
			 * 获取压力监测信息详情
			 * @param {stcd}      	[false string]	分区县编码
			 * @param {stm}     	[false string] 	关键字查询
			 * @param {etm}     	[false string] 	关键字查询
			 */
			const params = { stcd: temp_id, stm: sdate, etm: edate };
			getYlList(params, that)
				.then(results => {
					const { status, data } = results;

					const wgageList = [];
					const dpList = [];
					if (status) {
						Array.isArray(data) && data[0]
							? data.map((item = {}) => {
									const tm = new Date(item.tm).getTime();

									wgageList.push([tm, item.wgage]);
									dpList.push([tm, item.dp]);
							  })
							: [];

						that.wgageList = wgageList;
						that.dpList = dpList;
					}

					callback && callback();
				})
				.catch(e => console.error(e));
		},
		search() {
			const that = this;

			that.getPressureList_(() => that._drawLine());
		},
		_drawLine() {
			const that = this;

			const { ext = {}, qc_radio, wgageList = [], dpList = [] } = that;
			let data = qc_radio === 'DP' ? wgageList : qc_radio === 'WGAGE' ? dpList : [];
			console.warn(data);

			const { normalVal = '' } = ext;
			// let [up, down] = normalVal.split('~');
			// const upArr = up === '--' || !up ? [] : data.map((item = {}) => [item[0], up]);
			// const downArr = down === '--' || !down ? [] : data.map((item = {}) => [item[0], down]);
			let upArr = [];
			let downArr = [];
			const PLACEHOLDER = Array.from(new Array(7)).map((_, key) => [Date.now() + (7 - (key + 1)) * 24 * 60 * 60 * 1000, null]);
			if (String(normalVal).indexOf('~') !== -1) {
				let [down, up] = normalVal.split('~');
				let flag = Array.isArray(data) && data[0];
				flag || (data = PLACEHOLDER);
				upArr = up === '--' || !up ? [] : data.map((item = {}) => [item[0], up]);
				downArr = down === '--' || !down ? [] : data.map((item = {}) => [item[0], down]);
				flag || (data = []);
			}
			if (String(normalVal).indexOf('≤') !== -1) {
				const up = normalVal.substr(1);
				let flag = Array.isArray(data) && data[0];
				flag || (data = PLACEHOLDER);
				upArr = up === '--' || !up ? [] : data.map((item = {}) => [item[0], up]);
				flag || (data = []);
			}
			if (String(normalVal).indexOf('≥') !== -1) {
				const down = normalVal.substr(1);
				let flag = Array.isArray(data) && data[0];
				flag || (data = PLACEHOLDER);
				downArr = down === '--' || !down ? [] : data.map((item = {}) => [item[0], down]);
				flag || (data = []);
			}

			console.warn('gisProfileStart');
			console.warn(data);
			console.warn(upArr);
			console.warn(downArr);
			console.warn('gisProfileEnd');
			// 绘制图表 水位
			const tooltip = {
				trigger: 'axis',
				axisPointer: {
					type: 'line'
				}
			};
			const legend = {
				bottom: '-5px',
				left: 'center',
				data: ['上限', '实时压力', '下限']
			};
			// const chartColor = ['#1b84ea', '#d73a35', '#28ab75'];
			const lineStyleDotted = {
				type: 'line',
				lineStyle: {
					type: 'dotted',
					opacity: 1
				}
			};
			pipe_press.setOption({
				tooltip,
				grid: {
					top: '30px',
					left: '60px',
					right: '45px',
					bottom: '60px'
				},
				xAxis: {
					show: true,
					name: '时间',
					type: 'time',
					splitLine: {
						show: false
					}
				},
				yAxis: {
					show: true,
					name: '(MPa)',
					scale: true,
					splitLine: {
						show: false
					}
				},
				// color: chartColor,
				legend,
				series: [
					Array.isArray(upArr) &&
						upArr[0] && {
							...lineStyleDotted,
							name: '上限',
							itemStyle: { normal: { color: '#1b84ea' } },
							data: upArr
						},
					{
						name: '实时压力',
						itemStyle: { normal: { color: '#d73a35' } },
						type: 'line',
						data
					},
					Array.isArray(downArr) &&
						downArr[0] && {
							...lineStyleDotted,
							name: '下限',
							itemStyle: { normal: { color: '#28ab75' } },
							data: downArr
						}
				].filter(i => i)
			});
		}
	},
	mounted() {
		const that = this;
		pipe_press = that.$echarts.init(document.getElementById('pipe_press'));

		that.getPressureList_(() => that._drawLine());
	},
	created() {
		const that = this;

		const time = new Date();
		const currentDate = time.toLocaleDateString();
		that.edate = that.sdate = currentDate.replace(/\//g, '-');
	}
};
</script>

<style scoped lang="scss">
#press {
	width: 100%;
	height: 100%;
	padding: 10px;
	.row {
		width: 100%;
		height: 40px;
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
		height: calc(100% - 50px);
		& > div {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
