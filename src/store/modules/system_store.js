import {
	// 根据分区编码获取相应工程
	getGcByAreaCode
} from '../../api/interfaces/dataManage_api';
import {
	// 单个附件上传（上传到服务器，不入库）
	// uploadFile,
	// 获取（查询附件列表）
	getDseUploadFileList,
	// 根据附件ID 删除附件
	deleteFileById
} from '../../api/interfaces/common_api';
// import {
// 	// 根据附件ID 删除附件
// 	deleteFileById
// } from '../../api/urls';

export default {
	namespaced: true,
	state: {
		// 获取系统配置 监测站点的 tabs选项索引
		sys_monitor_tabIndex: null,
		// 监测工程列表
		monitorPoints: [],

		// 工程配置
		engineering: {
			// 工程名称关键字
			keyword: '',
			// 监测工程类型
			monitorPoint: '',
			// 站点类型
			prtype: '',
			fileList: []
		},
	},
	mutations: {
		set_sys_monitor_tabIndex(state, val) {
			state.sys_monitor_tabIndex = val;
			sessionStorage.setItem('sys_monitor_tabIndex', val);
		},
		// 设置监测工程列表
		SET_MONITORPOINTS(state, value) {
			state.monitorPoints = value;
		},
		// 设置工程配置-监测工程类型
		SET_ENGINEERING_MONITORPOINT(state, value) {
			state.engineering.monitorPoint = value;
		},
		// 设置工程配置-站点类型
		SET_ENGINEERING_PRTYPE(state, value) {
			state.engineering.prtype = value;
		},
		// 设置工程配置-详情图片列表
		SET_ENGINEERING_FILELIST(state, value) {
			state.engineering.fileList = value;
		},
		SET_ENGINEERING_REMOVE_FILELIST(state, value) {
			state.engineering.fileList = value;
		}
	},
	actions: {
		// 获取工程配置-详情/新增-泵站监测点工程列表
		handleMonitorPoints({
			commit
		}, payload = {}) {
			const {
				code = '6403',
					// prtypeList = ['3'],
					// jcType = '3',
					prtypeList = ['0', '1'],
					// jcType = '1',
					keyname = '',

					that
			} = payload;
			/**
			 * 根据分区编码获取相应工程
			 * @param {code}      		[true string 6403] 			分区编号
			 * @param {prtypeList}      [true array[number] [1]] 	所属工程类型:1水厂,2水库,3泵站4, 蓄水池5. 联户表井,6管线
			 * @param {keyname}      	[true string] 				工程名称模糊搜索
			 * @param {jcType}      	[true string] 				监测类型
			 */
			getGcByAreaCode({
					code,
					prtypeList,
					keyname,
					// jcType
				},
				that
			).then((results = {}) => {

				const {
					status,
					data
				} = results;
				if (Array.isArray(data) && data[0]) {
					const list = data.map((item = {}) => ({
						...item,
						key: item.cwscd,
						label: item.gcname,
						value: item.gccd,
						name: item.gccd
					}));

					commit('SET_MONITORPOINTS', list);
				}
			});
		},
		// 获取工程配置-详情图片列表
		handleEngineeringFileList({
			commit,
			rootState
		}, payload = {}) {

			// console.warn(aaa);
			// 清空附件列表
			commit('SET_ENGINEERING_FILELIST', []);

			/**
			 * 查询附件列表
			 * @param {fileBiz}      [true string] 	业务ID
			 * @param {pageNum}      [true string] 	页码
			 * @param {pageSize}     [true string] 页面条数
			 */
			const {
				fileBiz,
				that
			} = payload;

			getDseUploadFileList({
				fileBiz,
				pageNum: 1,
				pageSize: 100
			}, that).then((results = {}) => {
				const {
					status,
					data = {}
				} = results;

				const {
					list = []
				} = data;
				if (status) {

					const {
						root_store = {}
					} = rootState;
					const {
						imgStaticPath = ''
					} = root_store;
					// console.warn('imgStaticPath start');
					// console.warn(rootState);
					// console.warn('imgStaticPath end');
					const fileList = Array.isArray(list) && list[0] ? list.map((item = {}) => ({
						...item,
						name: item.fileName,
						url: (imgStaticPath || 'http://10.100.50.77:8018/ncysgc_upload/') + item.filePath
					})) : [];

					commit('SET_ENGINEERING_FILELIST', fileList);
				}
			});
		},
		// 删除工程配置-详情图片
		handleEngineeringRemoveFile(commit, payload = {}) {
			const {
				fileId,				
				isEdit = true,
				that,
				callback
			} = payload;

			if(isEdit) return;

			/**
			 * 移除附件接口
			 * @param {fileId}      [true string] 	文件ID
			 */
			const params = {
				fileId
			};
			deleteFileById(params, that)
				.then((results = {}) => {
					const {
						status
					} = results;
					callback && callback(status);
				})
				.catch(e => console.warn(e));
		}
	},
	getters: {
		// 获取系统配置 监测站点的 tabs选项索引
		get_sys_monitor_tabIndex(state) {
			if (!state.sys_monitor_tabIndex) {
				state.sys_monitor_tabIndex = sessionStorage.getItem('sys_monitor_tabIndex');
			}
			return state.sys_monitor_tabIndex || 0;
		},

		// 获取监测工程列表
		GET_MONITORPOINTS(state) {
			return state.monitorPoints;
		},
		// 获取工程配置-监测工程类型
		GET_ENGINEERING_MONITORPOINT(state) {
			return state.engineering.monitorPoint;
		},
		// 获取工程配置-站点类型
		GET_ENGINEERING_PRTYPE(state) {
			return state.engineering.prtype;
		},
		// 获取工程配置-详情图片列表
		GET_ENGINEERING_FILELIST(state, value) {
			return state.engineering.fileList;
		}
	}
};
