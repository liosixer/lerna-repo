<template>
  <div class="rate clearfix">
    <el-rate allow-half :score-template="func(data * multiple)" v-model="data" show-score @change="changeData" :disabled="disabled"></el-rate>
  </div>
</template>
<script>
import { changeDay } from "../views/fullCalendar/components/dateFunc";
export default {
  name: "rate",
  props: {
    rateData: {
      type: Number,
      default: 0,
    },
    multiple: {
      type: Number,
      default: 20,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return { data: 0 };
  },
  created() {},
  methods: {
    func(val) {
      if (val < 20) {
        return "很差";
      } else if (val < 40) {
        return "较差";
      } else if (val < 60) {
        return "不合格";
      } else if (val < 80) {
        return "合格";
      } else if (val < 100) {
        return "良好";
      } else if (val == 100) {
        return "优秀";
      }
    },
    changeData(val) {
      this.$emit("changeRate", val * this.multiple);
    },
  },
  watch: {
    rateData: {
      handler(n, o) {
        console.log(n, o);
        this.data = n / 20;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss">
.el-rate__item {
  line-height: 30px;

  .el-rate__icon {
    vertical-align: middle;
  }

  .el-rate__decimal {
    font-size: 18px;
  }
}
</style>
