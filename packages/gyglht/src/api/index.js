import axios from 'axios';
import qs from 'qs';
import Vue from 'vue';
import config from "../config/config";
import store from '../store/';

let VUE = new Vue()
let baseURL = ''

// 是否正在刷新的标记
window.isRefreshing = false

/*被挂起的请求数组*/
let refreshSubscribers = []

/*获取刷新token请求的token*/
function getRefreshToken() {
	return JSON.parse(sessionStorage.getItem("loginData")).refresh_token
}

/*push所有请求到数组中*/
function subscribeTokenRefresh(cb) {
	refreshSubscribers.push(cb)
}

/*刷新请求（ refreshSubscribers 数组中的请求得到新的token之后会自执行，用新的token去请求数据）*/
function onRrefreshed(token) {
	refreshSubscribers.map(cb => cb(token))
}

/*判断token是否过期*/
function isTokenExpired() {
	/*获取本地时间*/
	let nowTime = new Date().getTime()
	/* token有效期 */
	let expiredTime = JSON.parse(sessionStorage.getItem("loginData")).expires_in
	/* 登陆时间 */
	let loginTime = sessionStorage.getItem("loginTime")

	/*如果 < 5分钟，则说明即将过期*/
	var flag = (nowTime - loginTime) < ((expiredTime * 1000) - (1000 * 60 * 5))

	return !flag;
}
const regDev = RegExp(/development/);
/*获取turelore采购的地址*/
function getRequestUrl() {
	return regDev.test(process.env.NODE_ENV) ? '' : config.requestUrl
}

// 设置本地dev环境的baseURL，用于本地web服务器的代理的拦截名
if (regDev.test(process.env.NODE_ENV)) {
	baseURL = './qykzt'
	// baseURL = "http://111.206.219.82:8083/gt-jy-zhaobiao/api";
}

// 设置线上环境的baseURL
if (!regDev.test(process.env.NODE_ENV)) {
	// baseURL ="./GT_API"; // 正式环境
	baseURL = config.requestUrl + '/qykzt' // 正式环境
}

const service = axios.create({
	baseURL: baseURL,
	timeout: 60000, //响应时长可根据业务需求自行设置
	responseType: 'json',
	withCredentials: false,
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
	},
})

//请求拦截器
service.interceptors.request.use(
	(config) => {
		//统一清除请求前后空格
		for (let key in config.data) {
			if (typeof config.data[key] == 'string') {
				config.data[key] = config.data[key].toString().replace(/(^\s*)|(\s*$)/g, "")
			} else {
				config.data[key] = config.data[key]
			}
		}
		if (sessionStorage.getItem('access_token') == null) {
			config.headers.Authorization = ""
		}
		if (config.headers.contentType === 'formType') {
			config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
			config.data = qs.stringify(config.data)
		}
		if (config.method.toUpperCase() === 'GET') {
			config.params = {
				_t: Date.parse(new Date()) / 1000,
				...config.data,
			}
		}
		const authTmp = sessionStorage.getItem("loginData")
		/*判断是否已登录*/
		if (authTmp) {
			/*解析登录信息*/
			let auth = JSON.parse(authTmp)
			/*判断auth是否存在*/
			if (auth) {
				/*在请求头中添加token类型、token*/
				config.headers.Authorization = 'Bearer ' + sessionStorage.getItem('access_token')

				/*判断token是否将要过期*/
				//if (util.isTokenExpired() && config.url.indexOf('admin/auth/current') === -1) {
				if (isTokenExpired()) {
					/*判断是否正在刷新*/
					if (!window.isRefreshing) {
						/*将刷新token的标志置为true*/
						window.isRefreshing = true
						var loginForm = {
							client_id: "test_beijing",
							client_secret: "test",
							grant_type: "refresh_token",
							userType: 3,
							refresh_token: getRefreshToken()
						}
						/*发起刷新token的请求*/
						axios.post(`${getRequestUrl()}/guotou-auth/oauth/token`, qs.stringify(loginForm), {
								headers: {
									'Content-Type': 'application/x-www-form-urlencoded'
								},
							})
							.then(res => {
								/*将标志置为false*/
								window.isRefreshing = false
								/*成功刷新token*/
								config.headers.Authorization = 'Bearer ' + res.data.access_token
								store.dispatch("addToken", res.data.access_token)
								store.dispatch("addloginData", res.data)
								var nowTime = new Date()
								nowTime = nowTime.getTime()
								store.dispatch("addloginTime", nowTime)
								axios.get(`${getRequestUrl()}/guotou-auth/resource/userInfo`, {
									headers: {
										'Authorization': "Bearer " + res.data.access_token
									},
								}).then(res => {
									store.dispatch("addUserInfo", res.data)
								}).catch(res => {})
								/*执行数组里的函数,重新发起被挂起的请求*/
								onRrefreshed(res.data.access_token)
								/*执行onRefreshed函数后清空数组中保存的请求*/
								refreshSubscribers = []
							})
							.catch(error => {
								if (error.response.status == 400) {
									VUE.$message({
										type: "warning",
										center: true,
										duration: 2000,
										message: "登陆过期,请求重新登陆失败,请重新登陆!"
									});
									window.location.href = '#/login'
								} else if (error.response.status == 401) {
									VUE.$message({
										type: "warning",
										center: true,
										duration: 2000,
										message: "登陆过期,请重新登陆!"
									});
									window.location.href = '#/login'
								} else if (error.response.status == 403) {
									VUE.$message({
										type: "warning",
										center: true,
										duration: 2000,
										message: "越权访问,请重新登陆!"
									});
									window.location.href = '#/login'
								}
							})
					}
					/*把请求(token)=>{....}都push到一个数组中*/
					let retry = new Promise((resolve, reject) => {
						/*(token) => {...}这个函数就是回调函数*/
						subscribeTokenRefresh((token) => {
							config.headers.Authorization = 'Bearer ' + token
							/*将请求挂起*/
							resolve(config)
						})
					})

					return retry
				}
			}
			return config
		} else {
			return config
		}
	},
	(error) => {
		return Promise.reject(error)
	}
)

//响应拦截器
service.interceptors.response.use(
	(response) => {
		if (response.status === 200) {
			if (response.data.code == -1 || response.data.code == 0) {
				if (response.config.url == '/reg/isUserNameExists' || response.config.url == '/reg/isZhangHaoExists') {} else {
					VUE.$message({
						type: 'error',
						message: response.data.info,
					})
				}
				return {
					data: null,
					code: null
				}
			} else {
				return response.data
			}
		}
	},
	(error) => {
		if (error.response.data.code == 500) {
			VUE.$message({
				type: 'error',
				message: error.response.data.message,
			})
		} else if (error.response.status === 401 || error.response.status === 403) {
			/*判断是否正在刷新*/
			if (!window.isRefreshing) {
				/*将刷新token的标志置为true*/
				window.isRefreshing = true
				var loginForm = {
					client_id: "test_beijing",
					client_secret: "test",
					grant_type: "refresh_token",
					userType: 3,
					refresh_token: getRefreshToken()
				}
				/*发起刷新token的请求*/
				axios.post(`${getRequestUrl()}/guotou-auth/oauth/token`, qs.stringify(loginForm), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
					})
					.then(res => {
						/*将标志置为false*/
						window.isRefreshing = false
						/*成功刷新token*/
						config.headers.Authorization = 'Bearer ' + res.data.access_token
						store.commit("changeToken", res.data.access_token)
						store.dispatch("addToken", res.data.access_token)
						store.dispatch("addloginData", res.data)
						var nowTime = new Date()
						nowTime = nowTime.getTime()
						store.dispatch("addloginTime", nowTime)
						axios.get(`${getRequestUrl()}/guotou-auth/resource/userInfo`, {
							headers: {
								'Authorization': "Bearer " + res.data.access_token
							},
						}).then(res => {
							store.dispatch("addUserInfo", res.data)
						}).catch(res => {})
						/*执行数组里的函数,重新发起被挂起的请求*/
						onRrefreshed(res.data.access_token)
						/*执行onRefreshed函数后清空数组中保存的请求*/
						refreshSubscribers = []
					})
					.catch(error => {
						if (error.response.status == 400) {
							VUE.$message({
								type: "warning",
								center: true,
								duration: 2000,
								message: "登陆过期,请求重新登陆失败,请重新登陆!"
							});
							window.location.href = '#/login'
						} else if (error.response.status == 401) {
							VUE.$message({
								type: "warning",
								center: true,
								duration: 2000,
								message: "登陆过期,请重新登陆!"
							});
							window.location.href = '#/login'
						} else if (error.response.status == 403) {
							VUE.$message({
								type: "warning",
								center: true,
								duration: 2000,
								message: "越权访问,请重新登陆!"
							});
							window.location.href = '#/login'
						}
					})
			}
			/*把请求(token)=>{....}都push到一个数组中*/
			let retry = new Promise((resolve, reject) => {
				/*(token) => {...}这个函数就是回调函数*/
				subscribeTokenRefresh((token) => {
					config.headers.Authorization = 'Bearer ' + token
					/*将请求挂起*/
					resolve(config)
				})
			})

			return retry
		}
		return Promise.reject(error)
	}
)

export default service
