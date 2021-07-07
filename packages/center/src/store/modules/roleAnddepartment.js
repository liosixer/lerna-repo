// import { getDepartment,  } from '@/service/roleAndDepartment'
import { stateUserManageList } from '@/service/userPowerService'
// import {getEnterpriseInfo} from '@/service/enterpriseInfo'
// import menuList from "./menuData";

export default {
	state: {
		currentDepartment: {},
		department: [],
		copyDepartment: [],
		enterPriseInfo: {jyUser:{
				shenPi_ZhuangTai: 0,
				accountName:''
			}},
		menuList:[],
		loaded: false
	},
	mutations: {
		setCurrentDepartment(state, data) {
			state.currentDepartment = data
		},
		// 设置标题名称
		setCurrentDepartmentName(state, data) {
			state.setCurrentDepartmentName = data
		},
		// 设置部门数据
		setDepartment(state, data) {
			state.department = data
		},
		// 设置部门数据
		setCopyDepartment(state, data) {
			state.copyDepartment = data
		},
		setEnterpriseInfo (state, data) {
			state.enterPriseInfo = data
		},
		setLoaded (state, data) {
			state.loaded = data
		}
	},
	actions: {
		getDepartmentData({ state, commit }, req) {
			let _req = req || {pid: 0}
			stateUserManageList(_req).then((res) => {
				let data = res.data.data;
				data = data.filter(t => t.state === 'closed');
				  
				commit('setDepartment', data)
				commit('setCopyDepartment', data)
			}).then(() => {
				if (Object.keys(state.currentDepartment).length === 0) {
					if (state.department.length > 0) commit('setCurrentDepartment', state.department[0])
				}
			})
		}
	},
}
