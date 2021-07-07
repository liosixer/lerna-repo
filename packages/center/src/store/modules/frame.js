export default {
    state: {
        collapsed: false,
        colors: "wight",
        userType:"",
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
    },
    actions: {}
}