<template>
  <div class="chart-area">
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
      <div class="chart-wrap" id="chartArea"></div>
      <h1 class="chart-title">近一年各行业{{ tabs[tabValue - 1].name }}趋势</h1>
    </div>
  </div>
</template>

<script>
import { echartsUtil } from '@/assets/js/echarts-util';
import { chartAreaOption } from './chart.option';
const colors = chartAreaOption.colorArr;
const areaBg = chartAreaOption.areaBg;
const legendData = chartAreaOption.legendData;
let chartObj = {};
window.onresize = function() {
  if (chartObj) {
    for (var key in chartObj) {
      chartObj[key].resize();
    }
  }
};
export default {
  name: 'ChartArea',
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
      chartAreaOption.categories = categories;
      const series = [];
      data.map((item, index) => {
        const legend = legendData[index];
        const serie = {
          name: `${legend}`,
          type: 'line',
          smooth: true,
          itemStyle: {
            normal: {
              color: colors[index],
              lineStyle: {
                color: colors[index],
              },
            },
          },
          areaStyle: {
            normal: {
              //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
              color: new this.$echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                areaBg[index],
                false
              ),
            },
          },
          data: item,
        };
        series.push(serie);
      });
      chartAreaOption.series = series;
      chartObj['chartArea'] = echartsUtil.drawLineOrBarChart(
        'chartArea',
        chartAreaOption
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.chart-area {
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
    height: 400px;
    padding-top: 30px;
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
