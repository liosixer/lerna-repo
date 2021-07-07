<template>
  <div class="cus-drawer-body">
    <el-form
      ref="searchFormRef"
      :model="searchForm"
      label-width="90px"
      size="small"
      label-position="right"
    >
      <el-form-item label="资源编号：">
        <el-input
          style="width: 100%;"
          v-model="searchForm.resourceNo"
          placeholder="请输入"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="资源阶段：">
        <el-select
          v-model="searchForm.resourceStage"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in resourceStage"
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
import { resourceStage } from '@/config/data.config';
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
      resourceStage: Object.freeze(resourceStage),
    };
  },
};
</script>

<style lang="scss" scoped></style>
