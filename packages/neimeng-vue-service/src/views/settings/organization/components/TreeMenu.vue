<template>
  <div class="tree-menu">
    <el-input
      v-model="filterText"
      placeholder="请输入搜索内容"
      suffix-icon="el-icon-search"
    >
    </el-input>

    <el-tree
      class="filter-tree"
      :data="data"
      node-key="id"
      :props="defaultProps"
      :highlight-current="true"
      :default-expand-all="false"
      :check-on-click-node="true"
      :current-node-key="1"
      :filter-node-method="filterNode"
      ref="tree"
      @node-click="handleNodeClick"
    >
      <template #default="{ node, data }">
        <div class="custom-tree-node">
          <span>{{ node.label }}</span>
          <div style="margin-left: auto;">
            <el-button type="text" @click="() => addDepartment(data)">
              + 添加子部门
            </el-button>
            <el-dropdown @command="handleCommand">
              <el-button
                type="text"
                icon="el-icon-more"
                style="transform: rotate(90deg);"
              >
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  icon="el-icon-edit-outline"
                  :command="{ type: 'modify', node, data }"
                  >修改部门名称</el-dropdown-item
                >
                <el-dropdown-item
                  icon="el-icon-delete"
                  :command="{ type: 'remove', node, data }"
                  >删除部门</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </template>
    </el-tree>
  </div>
</template>

<script>
let id = 1000;
import bus from '@/bus/bus';
export default {
  name: 'TreeMenu',
  data() {
    return {
      filterText: '',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  mounted() {
    bus.$on('modifyDepartment', this.modifyDepartment);
    this.getTreeData();
  },
  methods: {
    getTreeData() {
      this.data = [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1',
                },
                {
                  id: 10,
                  label: '三级 1-1-2',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1',
            },
            {
              id: 6,
              label: '二级 2-2',
            },
          ],
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1',
            },
            {
              id: 8,
              label: '二级 3-2',
            },
          ],
        },
      ];
      this.$store.dispatch('changeCurrentNode', this.data[0]);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      const currentNode = this.$store.state.organization.currentNode;
      if (currentNode.id !== data.id)
        this.$store.dispatch('changeCurrentNode', data);
    },
    addDepartment(data) {
      this.$prompt('部门名称', '添加子部门', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: '请输入',
        inputPattern: /.{1,}/,
        inputErrorMessage: '部门名称为必须',
      })
        .then(({ value }) => {
          // TODO 添加子部门接口
          const newChild = { id: id++, label: value, children: [] };
          if (!data.children) {
            this.$set(data, 'children', []);
          }
          data.children.push(newChild);
        })
        .catch(() => {
          console.log('取消');
        });
    },
    handleCommand({ type, node, data }) {
      if (type === 'modify') {
        this.modifyDepartment(data);
      }
      if (type === 'remove') {
        this.removeDepartment(node, data);
      }
    },
    modifyDepartment(data) {
      this.$prompt('部门名称', '添加子部门', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: '请输入',
        inputValue: data.label,
        inputPattern: /.{1,}/,
        inputErrorMessage: '部门名称为必须',
      })
        .then(({ value }) => {
          // TODO 修改部门名称接口
          this.$set(data, 'label', value);
        })
        .catch(() => {
          console.log('取消');
        });
    },
    removeDepartment(node, data) {
      this.$confirm('您确认删除当前部门节点吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          // TODO 删除部门接口
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex((d) => d.id === data.id);
          children.splice(index, 1);
        })
        .catch(() => {
          console.log('取消');
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.tree-menu {
  height: 100%;
  overflow-y: auto;
  padding: 24px 16px;
  background-color: #ffffff;
  border-radius: 12px;
  .filter-tree {
    margin-top: 16px;
    & ::v-deep .el-tree-node__content {
      height: 36px;
      border-radius: 2px;
    }
  }
}
.custom-tree-node {
  width: 100%;
  padding-right: 6px;
  display: flex;
  align-items: center;
  span {
    line-height: 1;
  }
}
</style>
