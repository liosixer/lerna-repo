export default {
    state: {
        collapsed: false,
        colors: "wight-red",
        userType:"",
        token:"",
        isInfo:""
    },
    mutations: {
        toggleSideBar(state) {
            state.collapsed = state.collapsed ? false : true;
        },
        changeColor(state, changed) {
            state.colors = changed
        },
        changeUserType(state, changed) {
            state.userType = changed
        },
        changeToken(state, changed) {
            state.token = changed
        },
        changeInfo(state,changed){
            state.isInfo = changed
        }
    },
    actions: {}
}