export default {
    state: {
        currentTime:""
    },
    mutations: {
        saveCurrentTime(state,changed){
            state.currentTime = changed
        }
    },
    actions: {}
}