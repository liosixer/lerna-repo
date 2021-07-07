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
      <el-form-item label="矿权位置：">
        <el-input
          style="width: 100%;"
          v-model="searchForm.projectArea"
          placeholder="请输入"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="开始时间：">
        <el-date-picker
          style="width: 100%;"
          v-model="searchForm.ggStartTime"
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
      purchaseType: Object.freeze([
        {
          code: 1,
          name: '公开招标',
        },
        {
          code: 2,
          name: '邀请招标',
        },
        // {
        //     code: 3,
        //     name: "直接发包"
        // },
        {
          code: 4,
          name: '单一来源采购',
        },
        // {
        //     code: 5,
        //     name: "预选招标子工程"
        // },
        // {
        //   code: 6,
        //   name: '询比采购',
        // },
        {
          code: 7,
          name: '竞争性谈判采购',
        },
        {
          code: 8,
          name: '竞争性磋商',
        },
        // {
        //     code: 9,
        //     name: "其他"
        // },
        // {
        //   code: 10,
        //   name: '竞价',
        // },
        {
          code: 11,
          name: '询价',
        },
      ]),
      planStatus: Object.freeze([
        {
          code: 1,
          name: '编辑中',
        },
        {
          code: 2,
          name: '待接收',
        },
        {
          code: 3,
          name: '待分办',
        },
        {
          code: 4,
          name: '待审核',
        },
        {
          code: 5,
          name: '已审核',
        },
        {
          code: 6,
          name: '待指派',
        },
        {
          code: 7,
          name: '已指派',
        },
        {
          code: 8,
          name: '变更中',
        },
        {
          code: 9,
          name: '转委托待审核',
        },
        {
          code: 10,
          name: '起草委托协议',
        },
        {
          code: 11,
          name: '签署委托协议',
        },
        {
          code: 12,
          name: '已结项',
        },
        {
          code: 13,
          name: '已取消',
        },
        {
          code: 14,
          name: '变更待核验',
        },
      ]),
    };
  },
};
</script>

<style lang="scss" scoped></style>
