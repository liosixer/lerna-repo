<template>
  <div class="cus-drawer-body">
    <el-form
      ref="searchFormRef"
      :model="searchForm"
      label-width="110px"
      size="small"
      label-position="right"
    >
      <!-- 工程建设 -->
      <template v-if="tabValue == 1">
        <el-form-item label="项目编号：">
          <el-input
            style="width: 100%;"
            v-model="searchForm.projectNo"
            placeholder="请输入"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="项目名称：">
          <el-input
            style="width: 100%;"
            v-model="searchForm.projectName"
            placeholder="请输入"
          >
          </el-input>
        </el-form-item>
      </template>

      <!-- 政府采购 -->
      <template v-else-if="tabValue == 2">
        <el-form-item label="项目编码：">
          <el-input
            style="width: 100%;"
            v-model="searchForm.projectNo"
            placeholder="请输入"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="方案编码：">
          <el-input
            style="width: 100%;"
            v-model="searchForm.faNo"
            placeholder="请输入"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="采购方式：">
          <el-select
            v-model="searchForm.zbFangshi"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in zbFangshi"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文件状态：">
          <el-select
            v-model="searchForm.fileStatus"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in fileStatus"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
      </template>

      <!-- 自然资源 -->
      <template v-else>
        <el-form-item label="资源编号：">
          <el-input
            style="width: 100%;"
            v-model="searchForm.resourceNo"
            placeholder="请输入"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="项目名称：">
          <el-input
            style="width: 100%;"
            v-model="searchForm.resourceName"
            placeholder="请输入"
          >
          </el-input>
        </el-form-item>
      </template>

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
import { zbFangshi, fileStatus } from '@/config/data.config';
export default {
  name: 'SearchForm',
  props: {
    tabValue: {
      type: Number,
      default: 1,
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
  data() {
    return {
      zbFangshi: Object.freeze(zbFangshi),
      fileStatus: Object.freeze(fileStatus),
    };
  },
};
</script>

<style lang="scss" scoped></style>
