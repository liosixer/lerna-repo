<template>
    <div>
        <span class="time">{{time}}</span>
        <span class="week">{{week}}</span>
    </div>
</template>

<script>
    import moment from "moment"
    import store from "../store/";
    export default {
        name: "CurTime",
        data() {
            return {
                time: '',
                week: '',
                timer: ''
            }
        },
        created() {
            this.getTimes()
        },
        methods: {
            async getTimes() {
                const res = await this.portService.getServeTive()
                if (res && res.dateTime) {
                    const arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
                    this.week = arr[moment(res.dateTime).day()]
                    this.time = moment(res.dateTime).format("YYYY-MM-DD HH:mm:ss")
                    this.reDuceTimes(res.dateTime)
                }
            },
            reDuceTimes(time) {
                let num = 0
                this.timer = setInterval(() => {
                    num += 1
                    // store.commit('saveCurrentTime', time + 1000 * num);
                    this.time = moment(time + 1000 * num).format("YYYY-MM-DD HH:mm:ss")
                    this.$forceUpdate()
                }, 1000)
            }
        },
        beforeDestroy() {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
</script>

<style lang="scss" scoped>
    .time {
        margin-right: 20px;
        font-size: 16px;
    }
    .week {
        font-size: 16px;
    }
</style>
