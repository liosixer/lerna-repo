<template>
  <div>
    <span class="time">当前时间：</span>
    <span class="time">{{ time }}</span>
  </div>
</template>

<script>
import moment from 'moment';
import { getServeTime } from '@/service/index.js';

export default {
  name: 'CurTime',
  data() {
    return {
      time: '',
      week: '',
      timer: '',
    };
  },
  created() {
    this.getTimes();
  },
  methods: {
    async getTimes() {
      const res = await getServeTime();

      if (res && res.dateTime) {
        const arr = [
          '星期日',
          '星期一',
          '星期二',
          '星期三',
          '星期四',
          '星期五',
          '星期六',
        ];
        this.week = arr[moment(res.dateTime).day()];
        this.time = moment(res.dateTime).format('YYYY-MM-DD HH:mm:ss');
        this.reDuceTimes(res.dateTime);
      }
    },
    reDuceTimes(time) {
      let num = 0;
      this.timer = setInterval(() => {
        num += 1;
        this.time = moment(time + 1000 * num).format('YYYY-MM-DD HH:mm:ss');
        this.$forceUpdate();
      }, 1000);
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
};
</script>

<style lang="scss" scoped>
.time {
  font-size: 14px;
}
.week {
  font-size: 16px;
}
</style>
