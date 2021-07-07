<template>
  <div class="table-header">
    <div class="header-lf">
      <span>{{ currentNode.label }}</span>
      <el-button
        type="text"
        icon="el-icon-edit-outline"
        @click="() => handleClickEdit()"
      ></el-button>
    </div>
    <div class="header-rt">
      <el-button type="primary" icon="el-icon-plus" plain @click="onAddUser"
        >添加成员</el-button
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import bus from '@/bus/bus';
export default {
  name: 'TableHeader',
  props: {
    onAddUser: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    ...mapState({
      currentNode: (state) => state.organization.currentNode,
    }),
  },
  methods: {
    handleClickEdit() {
      bus.$emit('modifyDepartment', this.currentNode);
    },
  },
};
</script>

<style lang="scss" scoped>
.table-header {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  border-bottom: 1px solid #ebeef5;
  .header-lf {
    & > span {
      margin-right: 6px;
    }
  }
  .header-rt {
    margin-left: auto;
  }
}
</style>
