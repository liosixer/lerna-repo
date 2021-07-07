<template>
  <div class="cus-drawer-body">
    <el-form
      ref="searchFormRef"
      :model="searchForm"
      label-width="90px"
      size="small"
      label-position="right"
    >
      <el-form-item label="计划函号：">
        <el-input
          style="width: 100%;"
          v-model="searchForm.planNo"
          placeholder="请输入"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="采购单位：">
        <el-input
          style="width: 100%;"
          v-model="searchForm.qiyeName"
          placeholder="请输入"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="采购方式：">
        <el-select v-model="searchForm.type" clearable placeholder="请选择">
          <el-option
            v-for="item in purchaseType"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <div class="cus-drawer-footer">
        <el-button
          type="primary"
          size="small"
          @click.stop="onSearch"
          icon="el-icon-search"
          >搜索
        </el-button>
        <el-button
          @click.stop="onReset"
          size="small"
          icon="el-icon-refresh-right"
          >重置
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { zbFangshi } from '@/config/data.config';
export default {
  name: 'SearchForm',
  props: {
    searchForm: {
      type: Object,
      default: {},
      required: true,
    },
    onSearch: {
      type: Function,
      default: () => {},
      required: true,
    },
    onReset: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      purchaseType: Object.freeze(zbFangshi),
    };
  },
};
</script>

<style lang="scss" scoped></style>
