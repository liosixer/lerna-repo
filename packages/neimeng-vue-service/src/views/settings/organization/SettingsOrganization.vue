<template>
  <div class="organization">
    <nav-bar />
    <el-row :gutter="20" class="main-wrap">
      <el-col :span="6">
        <tree-menu />
      </el-col>
      <el-col :span="18">
        <menu-table />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import TreeMenu from './components/TreeMenu.vue';
import MenuTable from './components/MenuTable.vue';
export default {
  name: 'SettingsOrganization',
  components: { NavBar, TreeMenu, MenuTable },
  data() {
    return {
    }
  },
};
</script>

<style lang="scss" scoped>
.organization {
  padding: 0 20px 20px;
  .main-wrap {
    height: calc(100% - 40px);
    & > * {
      height: 100%;
    }
  }
}
</style>
