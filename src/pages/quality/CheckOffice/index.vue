<template>
	<div class="block">
		<div class="globalHandle">
			<div class="start">
				<el-form :inline="true" class="form">
					<el-form-item label="水质检测报告类型:">
						<el-select v-model="payload.value" placeholder="请选择水质检测报告类型" @change="onHandleListSearch">
							<el-option label="全部" value=""></el-option>
							<el-option v-for="item in payload.list" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="所属水厂:">
						<el-select v-model="payload.value" placeholder="请选择水厂" @change="onHandleListSearch">
							<el-option label="全部" value=""></el-option>
							<el-option v-for="item in payload.list" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
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
			<div class="end">
				<el-button type="primary" @click="onHandleListXlsx">查询</el-button>
				<el-button type="primary" @click="onHandleListXlsx">新增</el-button>
			</div>
		</div>
		<div class="globalTable">
			<dse-table-width-pagination :totalNum="pagination.total" :currentPage="pagination.current" @goto_page="onHandlePagination">
				<thead>
					<tr>
						<th width="60"><span>序号</span></th>
						<th><span>名称</span></th>
						<th><span>所属水厂</span></th>
						<th><span>类型</span></th>
						<th><span>检测结果</span></th>
						<th><span>报告日期</span></th>
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
							<td>
								<span>{{ item.c }}</span>
							</td>
							<td>
								<span>{{ item.d }}</span>
							</td>
							<td>
								<span>{{ item.e }}</span>
							</td>
							<td>
								<a @click="_page('qualityMonitorProfile', item)" style="cursor: pointer">查看</a>
								<a @click="_page('qualityMonitorProfile', item)" style="cursor: pointer">编辑</a>
								<a @click="_page('qualityMonitorProfile', item)" style="cursor: pointer">删除</a>
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

export default {
	name: 'monitorRecord',
	components: { DseSaveStatus, DseSearchInput, DseTableWidthPagination },
	computed: mapGetters({
		list: 'quality_store/GET_CHECKOFFICES_LIST',
		pagination: 'quality_store/GET_CHECKOFFICES_PAGINATION'
	}),
	data() {
		return {
			confirm: {
				visiable: false
			},
			payload: {
				keyword: '',
				value: '',
				list: [{ label: 'label', value: 1 }]
			}
		};
	},
	methods: {
		_page(name = '', payload = {}) {
			const that = this;

			const params = {
				...payload
			};
			that.$router.push({
				name,
				params
			});
		},
		onHandleConfirmOk() {},
		onHandleConfirmCancel() {},
		onHandleListSearch() {
			const that = this;

			// 获取列表数据导出
			that._fetchCheckOffices();
		},
		onHandlePagination() {},
		onHandleListXlsx() {
			const that = this;

			// 获取列表数据导出
			const payload = {
				callback(res) {
					that.$message.success('导出成功~');
				}
			};
			that.$store.dispatch('quality_store/fetchMonitorsXlsx', payload);
		},
		_fetchCheckOffices() {
			const that = this;

			// 获取列表数据
			const payload = {};
			that.$store.dispatch('quality_store/fetchCheckOffices', payload);
		},
		_initialization() {
			const that = this;

			// 获取列表数据
			that._fetchCheckOffices();
		}
	},
	mounted() {
		this._initialization();
	}
};
</script>
<style scoped lang="scss"></style>
