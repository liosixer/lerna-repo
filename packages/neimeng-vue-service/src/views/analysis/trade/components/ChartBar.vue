<template>
  <div class="chart-bar">
    <div class="header">
      <div class="tab-groups">
        <div
          v-for="(item, index) in tabs"
          :key="index"
          class="tab-item"
          :class="[
            item.code == tabValue ? 'active' : '',
            index == 0
              ? 'tab-item__first'
              : index == tabs.length - 1
              ? ' tab-item__last'
              : ' tab-item__center',
          ]"
          @click="btnTab(item.code)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="chart-body">
      <div class="chart-bar-wrap" id="chartBar"></div>
      <h1 class="chart-title">{{ tabs[tabValue - 1].name }}趋势</h1>
    </div>
  </div>
</template>

<script>
import { echartsUtil } from '@/assets/js/echarts-util';
import { chartBarOption } from './chart.option';
let chartObj = {};
window.onresize = function() {
  if (chartObj) {
    for (var key in chartObj) {
      chartObj[key].resize();
    }
  }
};
export default {
  name: 'ChartBar',
  props: {
    tabs: {
      type: Array,
      default: () => [],
      required: true,
    },
    tabValue: {
      type: String | Number,
      required: true,
    },
    chartData: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    btnTab(val) {
      this.$emit('update:tabValue', val);
    },
    drawChart() {
      const categories = this.chartData.dates;
      const data = this.chartData.datas;
      chartBarOption.categories = categories;
      chartBarOption.series[0].name = this.tabs[this.tabValue - 1].name;
      chartBarOption.series[0].data = data;
      chartObj['chartBar'] = echartsUtil.drawLineOrBarChart(
        'chartBar',
        chartBarOption
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.chart-bar {
  height: 572px;
  padding: 24px 32px 32px;
  background-color: #ffffff;
  border-radius: 12px;
  .header {
    display: flex;
    align-items: center;
  }
  .chart-bar-wrap {
    width: 100%;
    height: 400px;
    padding-top: 30px;
  }
  .chart-title {
    margin-top: 40px;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 22px;
    text-align: center;
  }
}
</style>
