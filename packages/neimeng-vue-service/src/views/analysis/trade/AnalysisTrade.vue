<template>
  <div class="analysis-trade">
    <nav-bar />
    <tool-bar :searchForm="searchForm" />
    <el-row :gutter="20" style="margin-top: 12px;">
      <el-col :span="6">
        <total-data :values="totalData" />
      </el-col>
      <el-col :span="18">
        <chart-bar
          ref="chartBar"
          :tabs="chartBarTabs"
          :tabValue.sync="chartBarTabValue"
          :chartData="chartBarData"
        />
      </el-col>
    </el-row>
    <trade-distribute :values="distributeData" />
    <el-row :gutter="20">
      <el-col :span="8">
        <chart-circle
          ref="chartCircle"
          :tabs="chartCircleTabs"
          :tabValue.sync="chartCircleTabValue"
          :chartData="chartCircleData"
        />
      </el-col>
      <el-col :span="16">
        <chart-area
          ref="chartArea"
          :tabs="chartCircleTabs"
          :tabValue.sync="chartAreaTabValue"
          :chartData="chartAreaData"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import ToolBar from './components/ToolBar.vue';
import TotalData from './components/TotalData.vue';
import ChartBar from './components/ChartBar.vue';
import TradeDistribute from './components/TradeDistribute.vue';
import ChartCircle from './components/ChartCircle.vue';
import ChartArea from './components/ChartArea.vue';

const chartType = [
  { name: '交易量', code: 1 },
  { name: '交易额', code: 2 },
  { name: '增资额', code: 3 },
  { name: '节资额', code: 4 },
];

export default {
  name: 'AnalysisTrade',
  components: {
    NavBar,
    ToolBar,
    TotalData,
    ChartBar,
    TradeDistribute,
    ChartCircle,
    ChartArea,
  },
  data() {
    return {
      searchForm: {
        areaCode: '10',
        unit: 'w', // w: 万元，y：亿元
        dates: null,
      },
      chartBarTabs: Object.freeze(chartType),
      chartBarTabValue: 1,
      chartBarData: {},
      chartCircleTabs: Object.freeze([chartType[0], chartType[1]]),
      chartCircleTabValue: 1,
      chartCircleData: {},
      chartAreaTabValue: 1,
      chartAreaData: {},
      totalData: {
        jyzl: 0,
        jyze: 0,
        jyzj: 0,
        zzzj: 0,
      },
      distributeData: {
        gcjs: {
          jyl: 455,
          jye: 2,
        },
      },
    };
  },
  watch: {
    chartBarTabValue(val) {
      this.chartBarData = {
        dates: [
          '04-11',
          '04-12',
          '04-13',
          '04-14',
          '04-15',
          '04-16',
          '04-17',
          '04-18',
          '04-19',
          '04-20',
        ],
        datas: [90, 40, 67, 28, 78, 89, 27, 45, 65, 45],
      };

      this.$nextTick(() => {
        this.$refs.chartBar.drawChart();
      });
    },
    chartCircleTabValue(val) {
      this.chartCircleData = {
        datas: [
          { value: 18, name: '工程建设' },
          { value: 202, name: '政府采购' },
          { value: 61, name: '自然资源' },
          { value: 2, name: '产权交易' },
        ],
      };

      this.$nextTick(() => {
        this.$refs.chartCircle.drawChart();
      });
    },
    chartAreaTabValue(val) {
      this.chartAreaData = {
        dates: [
          '04-11',
          '04-12',
          '04-13',
          '04-14',
          '04-15',
          '04-16',
          '04-17',
          '04-18',
          '04-19',
          '04-20',
        ],
        datas: [
          [26, 42, 67, 78, 35, 23, 15, 53, 28, 59],
          [67, 40, 42, 15, 78, 35, 27, 59, 53, 45],
          [15, 40, 67, 40, 78, 89, 59, 45, 65, 27],
          [40, 67, 15, 78, 27, 35, 27, 44, 67, 45],
          [30, 26, 23, 28, 15, 67, 18, 45, 41, 26],
        ],
      };

      this.$nextTick(() => {
        this.$refs.chartArea.drawChart();
      });
    },
  },
  created() {
    this.totalData = {
      jyzl: 53662,
      jyze: 15,
      jyzj: 286,
      zzzj: 12,
    };
    this.chartBarData = {
      dates: [
        '04-11',
        '04-12',
        '04-13',
        '04-14',
        '04-15',
        '04-16',
        '04-17',
        '04-18',
        '04-19',
        '04-20',
      ],
      datas: [30, 40, 67, 28, 78, 89, 27, 45, 65, 45],
    };

    this.chartCircleData = {
      datas: [
        { value: 36, name: '工程建设' },
        { value: 202, name: '政府采购' },
        { value: 61, name: '自然资源' },
        { value: 2, name: '产权交易' },
      ],
    };

    this.chartAreaData = {
      dates: [
        '04-11',
        '04-12',
        '04-13',
        '04-14',
        '04-15',
        '04-16',
        '04-17',
        '04-18',
        '04-19',
        '04-20',
      ],
      datas: [
        [26, 42, 67, 78, 35, 23, 15, 53, 28, 59],
        [67, 40, 42, 15, 78, 35, 27, 59, 53, 45],
        [15, 40, 67, 40, 78, 89, 59, 45, 65, 27],
        [40, 67, 15, 78, 27, 35, 27, 44, 67, 45],
        [30, 26, 23, 28, 15, 67, 18, 45, 41, 26],
      ],
    };

    this.$nextTick(() => {
      this.$refs.chartBar.drawChart();
      this.$refs.chartCircle.drawChart();
      this.$refs.chartArea.drawChart();
    });
  },
};
</script>

<style lang="scss" scoped>
.analysis-trade {
  padding: 0 20px 20px;
  height: auto !important;
}
</style>
