export default {
    state: {
        collapsed: false,
        colors: "wight"
    },
    mutations: {
        toggleSideBar(state) {
            state.collapsed = state.collapsed ? false : true;
        },
        changeColor(state, changed) {
            state.colors = changed
        },
    },
    actions: {}
}