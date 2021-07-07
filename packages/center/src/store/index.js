import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
	const value = modulesFiles(modulePath)
	modules[moduleName] = value.default
	return modules
}, {})

export default new Vuex.Store({
	state: {
		logoType:process.env.VUE_APP_LOGOTYPE?Number(process.env.VUE_APP_LOGOTYPE):1,
	},
	mutations: {},
	actions: {},
	modules,
	plugins: [
		createPersistedState({
			storage: window.sessionStorage,
		}),
	],
})
