import { getToken, setToken, removeToken } from "@/assets/js/utils/auth";
import loginSvs from "@/service/login";
const state = {
	tonken: getToken(),
};
const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token;
	},
};

const actions = {
	async login({ commit }, userInfo) {
		const { username, password } = userInfo;
		try {
			let res = await loginSvs.Login({ username: username.trim(), password });
		} catch (error) {
			console.log(error);
		}
		console.log(res);
	},
};
export default {
	namespaced: true,
	state,
	mutations,
	actions,
};
