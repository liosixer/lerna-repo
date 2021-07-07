import portService from "../../service/index"
export default {
    state: {
        currentTime:""
    },
    mutations: {
        saveCurrentTime1(state,changed){
            state.currentTime = changed
            let num = 0, timer = '', time = 0
            timer = setInterval(() => {
                num += 1
                time = changed + 1000 * num
                state.currentTime = time
            }, 1000)

        }
    },
    actions: {
        // 在index.vue中使用this.$store.dispatch("updateCurrentTime");
        updateCurrentTime(context){
            let num = 0;
            portService.getServeTive().then(res=>{
                context.commit('saveCurrentTime1', res.dateTime);
            })
        }
    }
}