<template>
  <div class="cus-drawer-body">
    <el-form
      ref="searchFormRef"
      :model="searchForm"
      label-width="90px"
      size="small"
      label-position="right"
    >
      <el-form-item v-if="tabSubValue == 0" key="1" label="提交时间：">
        <el-date-picker
          style="width: 100%;"
          v-model="searchForm.submitTime"
          type="datetime"
          placeholder="请选择"
          value-format="timestamp"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item v-if="tabSubValue == 1" key="2" label="受理时间：">
        <el-date-picker
          style="width: 100%;"
          v-model="searchForm.approveTime"
          type="datetime"
          placeholder="请选择"
          value-format="timestamp"
        >
        </el-date-picker>
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
    tabSubValue: {
      type: String | Number,
      required: true,
    },
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
