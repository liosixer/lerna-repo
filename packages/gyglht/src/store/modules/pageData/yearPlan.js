import procurementPlan from '@/service/procurementPlan'
const state = {
	yearPList: [],
}

const mutations = {
	SET_YEARPLIST: (state, list) => {
		state.yearPList = list
	},
}

const actions = {
	async getYearList({ commit }) {
		let data = await procurementPlan.yearsPP_yearsProcurementPlanAll()
		if (data && data.data && data.data.length) {
			commit('SET_YEARPLIST', data.data)
		}
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}
