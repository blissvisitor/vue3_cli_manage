export default {
	state: {
		// 工程名称关键字
		keyword: '',
		// 站点类型 & 监测点类型
		siteType: '',
		list: []
	},
	mutations: {
		SET_SITETYPE(state, value) {
			state.siteType = value;
		}
	},
	actions: {
		handleSiteType({
			commit
		}, payload = {}) {
			const {
				siteType
			} = payload;

			commit('SET_SITETYPE', siteType);
		}
	},
	getters: {
		GET_SITETYPE(state) {
			return state.siteType;
		}
	}
};
