<template>
  <div class="tree_selector" :class="{ tree_drop: drop , 'tree-select-flex': flex }">
    <div class="tree_input" v-if="showInput">
      <el-input
        :placeholder="placeholder"
        v-model="text"
        readonly
        @focus="handelShow"
        v-if="showCheckbox"
      ></el-input>
      <el-input
        :placeholder="placeholder"
        v-model="selData[label]"
        readonly
        @focus="handelShow"
        v-else
      ></el-input>
    </div>
    <div class="tree_selector_box" v-show="show || !drop">
      <div class="tree_selector_search" v-if="isShow">
        <el-row :gutter="5">
          <el-col :span="22">
            <el-input placeholder="输入关键字进行过滤" size="small" v-model="filterText" style="width: 100%"></el-input>
          </el-col>
          <!-- 添加按钮 -->
          <el-col>
            <slot></slot>
          </el-col>
        </el-row>
      </div>
      <div class="tree-box el-main">
        <el-tree
          class="filter-tree"
          :lazy="isLazy"
          :data="nodes"
          :props="defaultProps"
          :load="loadNode"
          :show-checkbox="showCheckbox"
          :default-expand-all="false"
          @node-click="handleNodeClick"
          :filter-node-method="filterNode"
          :default-expanded-keys="checkedNodes"
          :default-checked-keys="checkedNodes"
          :expand-on-click-node="false"
          :node-key="nodeKey"
          :highlight-current="true"
          :ref="refName"
          :class="{ drop_tree_box: drop }"
        >
          <div :class="['custom-tree-node', node.data.parentGuid  == 0 && node.data.zuHuType == 0 && node.data.showLine == 1 ? 'tree_node_type' : '']" slot-scope="{ node }" v-if="showctr">
            <span>{{ node.label }}</span>
            <span v-if="isShowBtn">
              <!-- <i
                v-if="data.enableStatus == 1"
                class="el-icon-check custom-tree-abs-i"
                style="color:green;"
              ></i>
              <i
                v-else-if="data.enableStatus == 0"
                class="el-icon-close custom-tree-abs-i"
                style="color:red"
              ></i> -->
              <el-button
                class="custom-tree-abs"
                type="text"
                size="mini"
                @click.stop="handleAddNode(node)"
              >:</el-button>
              <div class="drop_box" v-if="currentIndex === node.id && showBox === true">
                <div class="drop_title">
                  <i class="el-icon-close" @click.stop="handleCloseBox($event)"></i>
                </div>
                <ul v-if="smallMenuText == '权限'">
                  <li v-if="!node.data.pid" @click.stop="handleAddSubNode(node)">添加子权限</li>
                  <li @click.stop="handleDeleteNode(node)">删除权限</li>
                  <li @click.stop="handleModifyNode(node)">修改权限</li>
                </ul>
                <ul v-else>
                  <li @click.stop="handleAddSubNode(node)">添加下级组织</li>
                  <!-- <li @click.stop="handleDeleteNode(node)" v-if="node.data.parentGuid != 0">删除</li> -->
                  <!-- <li @click.stop="handleModifyNode(node)">修改组织</li> -->
                  <!-- <li @click="handleMoveUpNode(node)">上移</li>
                  <li @click="handleMoveDownNode(node)">下移</li> -->
                </ul>
              </div>
            </span>
          </div>
        </el-tree>
        <div class="tree_ctr" v-if="drop">
          <el-button size="mini" @click="handleCansel">取消</el-button>
          <el-button type="primary" size="mini" @click="handleOk">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "./mixin";
export default {
  mixins: [mixin],
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    // 是菜单还是部门
    smallMenuText: {
      type: String,
      default: "部门"
    },
    loadNode: {
      type: Function,
      default: (node, resolve) => {
        resolve([]);
      }
    },
    // 是否显示操作
    showctr: {
      type: Boolean,
      default: false
    },
    // tree组件的nodeKey值，主要用于这种默认组件
    nodeKey: {
      type: String,
      default: "departGuid"
    },
    // 提示占位文字
    placeholder: {
      type: String,
      default: "请选择"
    },
    // 是否开启多选模式
    showCheckbox: {
      type: Boolean,
      default: true
    },
    // 树节点数据
    nodes: {
      type: Array,
      default: () => []
    },
    // 是否采用下来显示树
    drop: {
      type: Boolean,
      default: true
    },
    // 是否显示搜索
    isShow: {
      type: Boolean,
      default: true
    },
    flex: {
      type: Boolean,
      default: false
    },
    // 是否显示输入框，适合做表单场景
    showInput: {
      type: Boolean,
      default: true
    },
    // 是否懒加载
    isLazy: {
      type: Boolean,
      default: true
    },
    // 默认选中的节点
    checkeds: {
      type: Array,
      default: () => []
    },
    // 自定义节点的字段
    defaultProps: {
      type: Object,
      default: () => ({
        children: "children",
        label: "departName"
      })
    },
    // 树组件对应自定义的数据id
    treeId: {
      type: String,
      default: "id"
    },
    // 自定义ref
    refName: {
      type: String,
      default: "tree"
    },
    // 显示菜单按钮
    isShowBtn: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      filterText: "",
      selData: {},
      flag: false, // 是否是初始化第一次
      checked: false, // 当前节点是否是选中状态
      show: false,
      selText: [],
      currentNode: [],
      text: "",
      checkedNodes: this.checkeds,
      currentIndex: null,
      showBox: false
    };
  },
  computed: {
    label() {
      return this.defaultProps.label;
    }
  },
  created() {
    this.$nextTick().then(() => {
      if (this.smallMenuText == "部门") {
        this.$refs[this.refName].setCurrentKey(this.checkeds[0][this.treeId]);
      }
    });
  },
  updated() {
    this.showBox = false;
  },
  methods: {
    // 获取所有数据
    flatten() {
      // let data = this.nodes
      let data = this.$refs[this.refName];

      const traverse = function(node) {
        const childNodes = node.root ? node.root.childNodes : node.childNodes;

        const childNodeData = childNodes.map((item) => {
          item.data.children = traverse(item)
          return item.data
        })
        return childNodeData
      };

      let list = traverse(data);
      return list;
    },
    handleCloseBox() {
      this.showBox = false;
    },
    // 添加子节点
    handleAddSubNode(node) {
      this.$emit("addSubNode", node);
    },
    // 删除节点
    handleDeleteNode(node) {
      this.$emit("deleteNode", node);
    },
    // 修改节点
    handleModifyNode(node) {
      this.$emit("modifyNode", node);
    },
    // 移动节点--上移
    handleMoveUpNode(node) {
      this.$emit("moveUpNode", node);
    },
    // 移动节点--下移
    handleMoveDownNode(node) {
      this.$emit("moveDownNode", node);
    },
    handleAddNode(data) {
      this.currentIndex = data.id;
      this.showBox = true;
      this.$emit("setCurrentNode", data);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data[this.defaultProps.label].indexOf(value) !== -1;
    },
    // 点击树节点
    handleNodeClick(data) {
      if (this.showCheckboxshowCheckbox) {
      } else {
        this.selData = data;
        this.$emit("change", data[this.treeId]);
        this.dispatch("ElFormItem", "change", data[this.treeId]);
        this.$emit("setNode", data);
      }
    },
    // 取消选择
    handleCansel() {
      this.show = false;
      this.selData = {};
    },
    handelShow() {
      this.show = true;
    },
    handleOk() {
      this.show = false;
      if (this.showCheckbox) {
      } else {
        this.$emit("change", this.selData[this.treeId]);
        this.$emit("setNode", this.selData);
        this.dispatch("ElFormItem", "change", this.selData[this.treeId]);
      }
    }
  },
  watch: {
    filterText(val) {
      // getDepartmentData
      let data;
      if (!!val) data = { sysDeptName: val };
      this.$store.dispatch("getDepartmentData", data);
      // this.$refs[this.refName].filter(val);
    },
    "$store.state.roleAnddepartment.currentDepartment": {
      handler(data) {
        this.$nextTick().then(() => {
          if (this.smallMenuText == "部门") {
            this.$refs[this.refName].setCurrentKey(
              this.checkeds[0][this.treeId]
            );
          }
        });
      },
      deep: true,
      immediate: true
    },
    "$store.state.roleAnddepartment.department": {
      handler(data) {
        this.$nextTick().then(() => {
          if (this.smallMenuText == "部门") {
            this.$refs[this.refName].setCurrentKey(
              this.checkeds[0][this.treeId]
            );
          }
        });
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {
    window.addEventListener('click',this.handleCloseBox);
  },
  destroyed () {
    window.removeEventListener('keyup',this.handleCloseBox);
  }
};
</script>
<style lang="scss">
.custom-tree-node{
  span{
    font-size: 14PX!important;
  }
}
.tree_selector {
  width: 100%;
  height: 100%;
  background: #fff;
  position: relative;
  z-index: 9;
  .tree_selector_search {
    padding: 15px;
    box-sizing: border-box;
  }
}
.tree_selector_box {
  width: 100%;
  height: 100%;
  background: #fff;
}
.tree-select-flex {
  .tree_selector_box {
    display: flex;
    flex-direction: column;
  }
  .tree-box {
    flex: 1;
    height: 100%;
  }
  .el-tree {
    height: 100%;
  }
  .tree_selector_search {
    flex: 0;
  }
  .el-main {
    padding: 0;
  }
}
.tree_drop {
  .tree_selector_box {
    height: 290px;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 45px;
    left: 0;
    z-index: 2;
    width: 100%;
    background: #fff;
  }
  .tree-box {
    height: 220px;
    .drop_tree_box {
      height: 180px;
      overflow: auto;
    }
    .tree_ctr {
      height: 40px;
      text-align: right;
      line-height: 40px;
      box-sizing: border-box;
      padding-right: 20px;
      border-top: 1px solid #f4f5f9;
    }
  }
}
.custom-tree-node {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  position: relative;
  width: 100%;
}
.tree_node_type {
  border-bottom: 1px solid #000;
}
.tree_input .el-input__inner {
  overflow: hidden;
  text-overflow: ellipsis;
}
.drop_box {
  // height: 134px;
  // height: 200px;
  width: 110px!important;
  position: absolute;
  right: 0;
  top: 28px;
  background: #fff;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.01);
  z-index: 9;
  border: 1px solid #ccc;
  overflow: hidden;
  li {
    height: 34px;
    line-height: 34px;
    text-indent: 10px;
    border-bottom: 1px solid #eee;
  }
  li:hover {
    background: #cdc7c7;
  }
}
.drop_title {
  height: 30px;
  background: #eee;
  border-bottom: 1px solid #ccc;
  padding-right: 5px;
  .el-icon-close {
    height: 16px;
    width: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    float: right;
    margin-top: 5px;
  }
  .el-icon-close:hover {
    border-radius: 100%;
    background: #d6001d;
    color: #fff;
  }
}
.el-tree-node > .el-tree-node__children {
  overflow: visible;
}

.custom-tree-abs {
  position: absolute;
  padding: 0 10px;
  top: 0;
  right: 0;
  height: 100%;
}
.custom-tree-abs-i {
  position: absolute;
  top: 5px;
  right: 25px;
  height: 100%;
}
</style>
