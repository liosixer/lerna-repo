<template>
  <div class="dashboard">
    <el-row :gutter="20" style="height: 100%">
      <el-col :span="17" class="wrap-left">
        <todo-list />
        <on-project />
      </el-col>
      <el-col :span="7" style="height: 100%">
        <div class="wrap-right">
          <el-card class="cus-card summary"> <Summary /></el-card></div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import TodoList from '@/views/dashboard/TodoList.vue';
import OnProject from '@/views/dashboard/OnProject.vue';
import Summary from '@/views/dashboard/Summary.vue';
export default {
  name: 'dashboard',
  components: { TodoList, OnProject, Summary },
};
</script>

<style lang="scss" scope>
.dashboard {
  width: 100%;
  height: 100%;
  padding: 20PX;
}
.wrap-left {
  height: calc(100% - 220PX);
}
.wrap-right {
  height: 100%;
}
</style>
