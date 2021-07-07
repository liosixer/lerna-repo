<template>
  <div class="toolbar">
    <el-select
      class="toolbar-item"
      v-model="searchForm.areaCode"
      placeholder="请选择"
    >
      <el-option
        v-for="item in neimengAreaCode"
        :key="item.code"
        :label="item.name"
        :value="item.code"
      ></el-option>
    </el-select>
    <el-select
      class="toolbar-item"
      v-model="searchForm.unit"
      placeholder="请选择"
    >
      <el-option
        v-for="item in units"
        :key="item.code"
        :label="item.name"
        :value="item.code"
      ></el-option>
    </el-select>
    <el-date-picker
      class="toolbar-item"
      v-model="searchForm.dates"
      type="daterange"
      value-format="timestamp"
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    >
    </el-date-picker>
    <el-button style="margin-left: auto;" plain>手动录入月份数据</el-button>
    <el-button type="primary" plain
      ><i class="iconfont icon-xiazai"></i> 导出报表</el-button
    >
  </div>
</template>

<script>
import { neimengAreaCode } from '@/config/data.config';
export default {
  name: 'TradeToolBar',
  props: {
    searchForm: {
      type: Object,
      default: {},
      required: true,
    },
  },
  data() {
    return {
      neimengAreaCode: Object.freeze([
        { name: '全部地区', code: '10' },
        ...neimengAreaCode,
      ]),
      units: Object.freeze([
        { name: '万元', code: 'w' },
        { name: '亿元', code: 'y' },
      ]),
    };
  },
};
</script>

<style lang="scss" scoped>
.toolbar {
  height: 40px;
  display: flex;
  align-items: center;
  .toolbar-item {
    width: 240px;
    margin-right: 10px;
  }
  & ::v-deep .el-button {
    .icon-xiazai {
      font-size: 13px;
    }
  }
}
</style>
