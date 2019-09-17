// import {
// 	
// } from '../../api/interfaces/dataManage_api';
// import {
// 	
// } from '../../api/interfaces/common_api';

const __PAGINATION__ = {
	total: 0,
	currnet: 1,
	pageSize: 10
}

export default {
	namespaced: true,
	state: {


		// 水质信息 - 在线监测列表
		monitors: {
			list: [],
			pagination: {
				...__PAGINATION__
			}
		},
		// 水质信息 - 在线监测详情
		monitor: {
			list: [],
			pagination: {
				...__PAGINATION__
			}
		},
		// 水质信息 - 农饮办列表
		checkOffices: {
			list: [],
			pagination: {
				...__PAGINATION__
			}
		},
		// 水质信息 - 农饮办详情
		checkOffice: {
			list: [],
			pagination: {
				...__PAGINATION__
			}
		},
		// 水质信息 - 企业
		checkCompanies: {
			list: [],
			pagination: {
				...__PAGINATION__
			}
		},
		// 水质信息 - 企业详情
		checkCompany: {
			list: [],
			pagination: {
				...__PAGINATION__
			}
		},
	},
	mutations: {
		// 设置水质信息 - 在线监测列表
		SET_MONITORS_LIST(state, value) {
			state.monitors.list = value;
		},
		// 设置水质信息 - 在线监测详情
		SET_MONITOR_LIST(state, value) {
			state.monitor.list = value;
		},
		// 设置水质信息 - 在线监测列表分页
		SET_MONITORS_PAGINATION(state, payload = {}) {
			const pagination = {
				...state.monitors.pagination,
				...payload
			}

			state.monitors.pagination = pagination;
		},
		// 设置水质信息 - 在线监测详情分页
		SET_MONITOR_PAGINATION(state, payload = {}) {
			const pagination = {
				...state.monitor.pagination,
				...payload
			}

			state.monitor.pagination = pagination;
		},
		// 设置水质信息 - 农饮办列表
		SET_CHECKOFFICES_LIST(state, value) {
			state.checkOffices.list = value;
		},
		// 设置水质信息 - 农饮办详情列表
		SET_CHECKOFFICE_LIST(state, value) {
			state.checkOffice.list = value;
		},
		// 设置水质信息 - 农饮办列表分页
		SET_CHECKOFFICES_PAGINATION(state, payload = {}) {
			const pagination = {
				...state.checkOffice.pagination,
				...payload
			}

			state.checkOffice.pagination = pagination;
		},
		// 设置水质信息 - 农饮办分页
		SET_CHECKOFFICE_PAGINATION(state, payload = {}) {
			const pagination = {
				...state.checkOffice.pagination,
				...payload
			}

			state.checkOffice.pagination = pagination;
		},
		// 设置水质信息 - 企业列表
		SET_CHECKCOMPANIES_LIST(state, value) {
			state.checkCompanies.list = value;
		},
		// 设置水质信息 - 企业详情列表
		SET_CHECKCOMPANY_LIST(state, value) {
			state.checkCompany.list = value;
		},
		// 设置水质信息 - 企业分页
		SET_CHECKCOMPANIES_PAGINATION(state, payload = {}) {
			const pagination = {
				...state.checkCompanies.pagination,
				...payload
			}

			state.checkCompanies.pagination = pagination;
		},
		// 设置水质信息 - 企业详情分页
		SET_CHECKCOMPANY_PAGINATION(state, payload = {}) {
			const pagination = {
				...state.checkCompany.pagination,
				...payload
			}

			state.checkCompany.pagination = pagination;
		},
	},
	actions: {
		// 获取水质信息 - 在线监测列表
		fetchMonitors({
			commit,
			state
		}, payload = {}) {

			const list = [{
				// 所属水厂
				a: '郭营水厂',
				// 水质质量
				b: '合格',
				// PH值（6.5-8.5）
				c: '8',
				// 浊度（0-1）
				d: '0.4',
				// 余氯（0.05mg/L）
				e: '0.07',
				// 采集时间
				f: '2019/8/19  18:00',
			}, {
				// 所属水厂
				a: '王海水厂',
				// 水质质量
				b: '合格',
				// PH值（6.5-8.5）
				c: '7.5',
				// 浊度（0-1）
				d: '0.3',
				// 余氯（0.05mg/L）
				e: '0.09',
				// 采集时间
				f: '2019/8/19  18:00',
			}];

			commit('SET_MONITORS_LIST', list);

			const total = list.length;
			commit('SET_MONITORS_PAGINATION', {
				total
			});
		},
		// 获取水质信息 - 在线监测详情列表
		fetchMonitor({
			commit,
			state
		}, payload = {}) {

			const list = [{
				// 所属水厂
				a: '郭营水厂',
				// 水质质量
				b: 'PH值（6.5-8.5）',
				// 采集时间
				f: '2019/8/19  18:00',
			}];

			commit('SET_MONITOR_LIST', list);

			const total = list.length;
			commit('SET_MONITOR_PAGINATION', {
				total
			});
		},
		// 获取水质信息 - 在线监测列表导出
		fetchMonitorsXlsx({
			commit
		}, payload = {}) {

			const {
				callback
			} = payload;
			callback && callback();
		},
		// 获取水质信息 - 农饮办列表
		fetchCheckOffices({
			commit
		}, payload = {}) {

			const list = [{
				a: '郭营水厂水质检测结果',
				b: '郭营水厂',
				c: '季检',
				d: '合格',
				e: '2019-08-19'
			}, {
				a: '王海水厂水质检测结果',
				b: '王海水厂',
				c: '月检',
				d: '合格',
				e: '2019-08-19'
			}];
			commit('SET_CHECKOFFICES_LIST', list);
		},
		// 获取水质信息 - 农饮办详情列表
		fetchCheckOffice({
			commit
		}, payload = {}) {

			const list = [{
				a: '1',
				b: '2',
				c: '3',
				d: '4',
				e: '5',
				f: '6',
			}];
			commit('SET_CHECKOFFICE_LIST', list);
		},
		// 获取水质信息 - 企业列表
		fetchCheckCompanies({
			commit
		}, payload = {}) {

			const list = [{
				a: '1',
				b: '2',
				c: '3',
				d: '4',
				e: '5',
				f: '6',
			}];
			commit('SET_CHECKCOMPANIES_LIST', list);
		},
		// 获取水质信息 - 企业列表
		fetchCheckCompany({
			commit
		}, payload = {}) {

			const list = [{
				a: '1',
				b: '2',
				c: '3',
				d: '4',
				e: '5',
				f: '6',
			}];
			commit('SET_CHECKCOMPANY_LIST', list);
		}
	},
	getters: {
		// 获取水质信息 - 在线监测列表
		GET_MONITORS_LIST(state) {
			return state.monitors.list;
		},
		// 获取水质信息 - 在线监测详情列表
		GET_MONITOR_LIST(state) {
			return state.monitor.list;
		},
		// 获取水质信息 - 在线监测分页
		GET_MONITORS_PAGINATION(state) {
			return state.monitors.pagination;
		},
		// 获取水质信息 - 在线监测详情分页
		GET_MONITOR_PAGINATION(state) {
			return state.monitor.pagination;
		},
		// 获取水质信息 - 农饮办列表
		GET_CHECKOFFICES_LIST(state) {
			return state.checkOffices.list;
		},
		// 获取水质信息 - 农饮办详情列表
		GET_CHECKOFFICE_LIST(state) {
			return state.checkOffice.list;
		},
		// 获取水质信息 - 农饮办列表分页
		GET_CHECKOFFICES_PAGINATION(state) {
			return state.checkOffices.pagination;
		},
		// 获取水质信息 - 农饮办详情分页
		GET_CHECKOFFICE_PAGINATION(state) {
			return state.checkOffice.pagination;
		},
		// 获取水质信息 - 企业列表
		GET_CHECKCOMPANIES_LIST(state) {
			return state.checkCompanies.list;
		},
		// 获取水质信息 - 企业详情列表
		GET_CHECKCOMPANY_LIST(state) {
			return state.checkCompany.list;
		},
		// 获取水质信息 - 企业分页
		GET_CHECKCOMPANIES_PAGINATION(state) {
			return state.checkCompanies.pagination;
		},
		// 获取水质信息 - 企业详情分页
		GET_CHECKCOMPANY_PAGINATION(state) {
			return state.checkCompany.pagination;
		},
	}
};
