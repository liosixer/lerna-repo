<template>
  <div class="card-header">
    <div class="tools-group">
      <el-button type="text" @click="onSearch">
        <img
          src="../../../../assets/images/frame/filter.png"
          class="i-filter"
        />高级筛选
      </el-button>
      <el-divider direction="vertical"></el-divider>
      <el-button type="primary" icon="el-icon-plus" @click="onNew"
        >添加
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardHeader',
  props: {
    onSearch: {
      type: Function,
      default: () => {},
    },
    onNew: {
      type: Function,
      default: () => {},
    },
  },
};
</script>
