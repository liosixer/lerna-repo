export default {
    state: {
        access_token:"",
        userInfo: {},
        loginData:{},
        loginTime:"",
        loginStaues:true
    },
    mutations: {
        setToken(state, token) {
            state.access_token = token
            sessionStorage.setItem("access_token", token)
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
            let qykztUserInfo = JSON.stringify(userInfo)
            sessionStorage.setItem("userInfo", qykztUserInfo)
        },
        setLoginData(state, loginData){
            state.loginData = loginData
            let loginDataInfo = JSON.stringify(loginData)
            sessionStorage.setItem("loginData", loginDataInfo)
        },
        setloginTime(state, token) {
            state.loginTime = token
            sessionStorage.setItem("loginTime", token)
        },
        setloginStaues(state, token) {
            state.loginStaues = token
            sessionStorage.setItem("loginStaues", token)
        }
    },
    actions: {
        addToken(context, payload) {
            context.commit('setToken', payload)
        },
        addUserInfo(context, payload) {
            context.commit('setUserInfo', payload)
        },
        addloginData(context, payload) {
            context.commit('setLoginData', payload)
        },
        addloginTime(context, payload) {
            context.commit('setloginTime', payload)
        },
        addloginStaues(context, payload) {
            context.commit('setloginStaues', payload)
        }
    }
}