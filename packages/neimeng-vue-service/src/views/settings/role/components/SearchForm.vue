<template>
  <div class="cus-drawer-body">
    <el-form
      ref="searchFormRef"
      :model="searchForm"
      label-width="90px"
      size="small"
      label-position="right"
    >
      <el-form-item label="角色名称：">
        <el-input
          style="width: 100%;"
          v-model="searchForm.roleName"
          placeholder="请输入"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select v-model="searchForm.status" clearable placeholder="请选择">
          <el-option label="有效" :value="1"></el-option>
          <el-option label="无效" :value="0"></el-option>
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
};
</script>

<style lang="scss" scoped></style>
