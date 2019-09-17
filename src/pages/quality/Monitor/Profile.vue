<template>
	<div class="block">
		<div class="globalHandle">
			<div class="start">
				<el-form :inline="true" class="form">
					<el-form-item label="时间:">
						<el-date-picker
							v-model="payload.date"
							:placeholder_="'请输入开始结束时间'"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							@search="onHandleListSearch"
							@keyup.enter.native="onHandleListSearch"
						></el-date-picker>
					</el-form-item>
				</el-form>
			</div>
			<div class="end"><el-button type="primary" @click="_page">返回</el-button></div>
		</div>
		<div class="echart">
			<div class="bar">
				<el-radio v-model="payload.type" label="PH" @change="onHandleChartChange">PH</el-radio>
				<el-radio v-model="payload.type" label="TURB" @change="onHandleChartChange">浊度</el-radio>
				<el-radio v-model="payload.type" label="CHL" @change="onHandleChartChange">余氯</el-radio>
			</div>
			<div class="line" ref="echartLine"></div>
		</div>
		<div class="globalTable">
			<dse-table-width-pagination :totalNum="pagination.total" :currentPage="pagination.current" @goto_page="onHandlePagination">
				<thead>
					<tr>
						<th width="60"><span>序号</span></th>
						<th><span>所属水厂</span></th>
						<th><span>水质质量</span></th>
						<th><span>PH值（6.5-8.5）</span></th>
						<th><span>浊度（0-1）</span></th>
						<th><span>余氯（0.05mg/L）</span></th>
						<th><span>采集时间</span></th>
						<th><span>操作</span></th>
					</tr>
				</thead>
				<tbody>
					<template v-if="Array.isArray(list) && list[0]">
						<tr v-for="(item, index) in list" :key="index">
							<td>
								<span>{{ index + 1 }}</span>
							</td>
							<td>
								<span>{{ item.a }}</span>
							</td>
							<td>
								<span>{{ item.b }}</span>
							</td>
						</tr>
					</template>
					<template v-else>
						<tr>
							<td colspan="7"><span>无数据</span></td>
						</tr>
					</template>
				</tbody>
			</dse-table-width-pagination>
		</div>
		<dse-save-status :type="false" :showModel="confirm.visiable" @sureDelThis="onHandleConfirmOk" @delThis="onHandleConfirmCancel" />
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import DseTableWidthPagination from '../../../common/components/DseTableWidthPagination';
import DseSearchInput from '../../../common/components/DseSearchInput';
import DseSaveStatus from '../../../common/components/toast/DseSaveStatus';

let ECHART_LINE;

export default {
	name: 'monitorRecord',
	components: { DseSaveStatus, DseSearchInput, DseTableWidthPagination },
	computed: mapGetters({
		list: 'quality_store/GET_MONITOR_LIST',
		pagination: 'quality_store/GET_MONITOR_PAGINATION'
	}),
	data() {
		return {
			confirm: {
				visiable: false
			},
			payload: {
				type: 'PH',
				date: '',
				value: '',
				list: [{ label: 'label', value: 1 }]
			}
		};
	},
	methods: {
		_page(name = '', payload = {}) {
			const that = this;

			that.$router.back();
		},
		onHandleConfirmOk() {},
		onHandleConfirmCancel() {},
		onHandleListSearch() {
			const that = this;

			// 获取列表数据导出
			const payload = {};
			that.$store.dispatch('quality_store/fetchMonitors', payload);
		},
		onHandlePagination() {},
		onHandleChartChange() {
			const that = this;

			// 获取列表数据导出
			const payload = {};
			that.$store.dispatch('quality_store/fetchMonitors', payload);
		},
		_fetchMonitor() {
			const that = this;

			// 获取列表数据
			const payload = {};
			that.$store.dispatch('quality_store/fetchMonitors', payload);
		},
		_initChart() {
			const that = this;

			const TITLE = {
				text: '',
				x: 'center',
				y: 'top',
				textStyle: {
					color: '#1B84EA',
					fontStyle: 'normal',
					fontWeight: '600',
					fontFamily: 'Microsoft Yahei',
					fontSize: 16
				}
			};
			const subTitle = 'PH';
			const xAxisName = '时间';
			const yAxisUnit = 'mg/L';
			const seriesFirstName = 'aaa';
			const grid = {
				right: '150px',
				left: '50px'
			};
			const chartList = [[1568623861546, 1], [1568653861546, 2]];

			ECHART_LINE = that.$echarts.init(that.$refs.echartLine);
			that.$nextTick(() => {
				ECHART_LINE.setOption({
					// toolbox: {
					// 	feature: {
					// 		dataZoom: {
					// 			yAxisIndex: 'none'
					// 		},
					// 		restore: {},
					// 		saveAsImage: {}
					// 	}
					// },
					grid,
					title: {
						...TITLE,
						text: `${subTitle}趋势图`
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							animation: false
						}
					},
					color: ['#f5a72b'],
					xAxis: {
						name: xAxisName,
						type: 'time',
						splitLine: {
							show: false
						}
					},
					yAxis: {
						name: yAxisUnit,
						type: 'value',
						splitLine: {
							show: false
						}
					},
					series: [
						{
							type: 'line',
							name: seriesFirstName,
							data: chartList
						}
					]
				});
			});
		},
		_initialization() {
			const that = this;

			// 获取列表数据
			that._fetchMonitor();
			// 初始化图表
			that._initChart();
		}
	},
	mounted() {
		this._initialization();
	}
};
</script>
<style scoped lang="scss">
.echart {
	.bar {
		text-align: right;
		margin-top: 32px;
		margin-right: 32px;
	}
	.line {
		width: 100%;
		height: 370px;
	}
}
</style>
