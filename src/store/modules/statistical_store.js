const __PAGINATION__ = {
	total: 0,
	currnet: 1,
	pageSize: 10
}

export default {
	namespaced: true,
	state: {
		// 统计分析-监测信息列表
		monitors: {
			list: [],
			pagination: {
				...__PAGINATION__
			}
		},
		// 统计分析-监测信息详情列表
		monitor: {
			list: [],
			pagination: {
				...__PAGINATION__
			}
		},
		// 统计分析-综合信息列表
		syntheticals: {
			list: [],
			pagination: {
				...__PAGINATION__
			}
		},
		// 统计分析-综合信息详情列表
		synthetical: {
			list: [],
			pagination: {
				...__PAGINATION__
			}
		}
	},
	mutations: {
		// 设置统计分析-监测信息列表
		SET_MONITORS_LIST(state, value) {
			state.monitors.list = value;
		},
		SET_MONITORS_PAGINATION(state, payload = {}) {
			const pagination = {
				...state.monitors.pagination,
				...payload
			}

			state.monitors.pagination = pagination;
		},
		// 设置统计分析-监测信息详情列表
		SET_MONITOR_LIST(state, value) {
			state.monitor.list = value;
		},
		// 设置统计分析-监测信息详情分页
		SET_MONITOR_PAGINATION(state, payload = {}) {
			const pagination = {
				...state.monitor.pagination,
				...payload
			}

			state.monitor.pagination = pagination;
		},
		// 设置统计分析-综合信息列表
		SET_SYNTHETICALS_LIST(state, value) {
			state.syntheticals.list = value;
		},
		// 设置统计分析-综合信息详情分页
		SET_SYNTHETICALS_PAGINATION(state, payload = {}) {
			const pagination = {
				...state.syntheticals.pagination,
				...payload
			}

			state.syntheticals.pagination = pagination;
		},
		// 设置统计分析-综合信息详情列表
		SET_SYNTHETICAL_LIST(state, value) {
			state.synthetical.list = value;
		},
		// 设置统计分析-综合信息详情分页
		SET_SYNTHETICAL_PAGINATION(state, payload = {}) {
			const pagination = {
				...state.synthetical.pagination,
				...payload
			}

			state.synthetical.pagination = pagination;
		},
	},
	actions: {

	},
	getters: {
		// 获取统计分析-监测信息列表
		GET_MONITORS_LIST(state) {
			return state.monitors.list;
		},
		// 获取统计分析-监测信息分页
		GET_MONITORS_PAGINATION(state) {
			return state.monitors.pagination;
		},
		// 获取统计分析-监测信息详情列表
		GET_MONITOR_LIST(state) {
			return state.monitor.list;
		},
		// 获取统计分析-监测信息详情分页
		GET_MONITOR_PAGINATION(state) {
			return state.monitor.pagination;
		},
		// 获取统计分析-综合信息列表
		GET_SYNTHETICALS_LIST(state) {
			return state.synthetical.list;
		},
		// 获取统计分析-综合信息分页
		GET_SYNTHETICALS_PAGINATION(state) {
			return state.synthetical.pagination;
		},
		// 获取统计分析-综合信息详情列表
		GET_SYNTHETICALE_LIST(state) {
			return state.synthetical.list;
		},
		// 获取统计分析-综合信息详情分页
		GET_SYNTHETICALE_PAGINATION(state) {
			return state.synthetical.pagination;
		}
	}
};
