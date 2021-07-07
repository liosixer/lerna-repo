<template>
  <div class="chart-clrcle">
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
      <div class="chart-wrap" id="chartCircle"></div>
      <div class="tooltip-wrap">
        <div v-for="item in tooltipData" :key="item.bgColor" class="tooltip">
          <span
            class="i-sample"
            :style="{ 'background-color': item.bgColor }"
          ></span>
          <span class="name">{{ item.name }}</span>
          <span class="percent">{{ item.percent }}</span>
          <span class="value">{{ item.value }}宗</span>
        </div>
      </div>
      <h1 class="chart-title">近一年各行业{{ tabs[tabValue - 1].name }}占比</h1>
    </div>
  </div>
</template>

<script>
import { echartsUtil } from '@/assets/js/echarts-util';
import { chartCircleOption } from './chart.option';
const colors = chartCircleOption.colorArr;
let chartObj = {};
window.onresize = function() {
  if (chartObj) {
    for (var key in chartObj) {
      chartObj[key].resize();
    }
  }
};
export default {
  name: 'ChartCircle',
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
  data() {
    return {
      tooltipData: [],
    };
  },
  methods: {
    btnTab(val) {
      this.$emit('update:tabValue', val);
    },
    drawChart() {
      const data = this.chartData.datas;
      chartCircleOption.series[0].data = data;
      console.log(chartCircleOption);
      chartObj['chartCircle'] = echartsUtil.drawPieChart(
        'chartCircle',
        chartCircleOption
      );
      const tooltipData = JSON.parse(JSON.stringify(this.chartData.datas));
      const total = this._.sum(this._.map(tooltipData, 'value'));
      tooltipData.map((item, index) => {
        item.percent = (item.value / total).toFixed(2) + '%';
        item.bgColor = colors[index];
      });
      this.tooltipData = tooltipData;
    },
  },
};
</script>

<style lang="scss" scoped>
.chart-clrcle {
  height: 540px;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 12px;
  .header {
    display: flex;
    align-items: center;
  }
  .chart-wrap {
    width: 100%;
    height: 280px;
    padding-top: 20px;
  }
  .tooltip-wrap {
    margin-top: 16px;
    .tooltip {
      display: flex;
      align-items: center;
      width: 270px;
      margin: 0 auto;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
      margin-bottom: 12px;
      .i-sample {
        width: 10px;
        height: 10px;
        margin-right: 12px;
      }
      .percent {
        width: 60px;
        text-align: right;
        margin-left: 40px;
      }
      .value {
        width: 60px;
        text-align: right;
        margin-left: auto;
      }
    }
  }
  .chart-title {
    margin-top: 20px;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 22px;
    text-align: center;
  }
}
</style>
