<template>
  <div class="tree_selector" ref="choise">
    <el-popover
      class="search-term"
      placement="bottom"
      :width="popoverWidth"
      trigger="focus"
      v-model="show"
    >
      <div class="tree_input" slot="reference">
        <el-input
          :placeholder="placeholder"
          v-model="choiseText"
          readonly
          @focus="handelShow"
          size="small"
        ></el-input>
      </div>
      <div class="tree_selector_box">
        <div class="tree_selector_search" v-if="isShowSearch">
          <el-input placeholder="输入关键字进行过滤" size="small" v-model="filterText" style="width: 100%"></el-input>
        </div>
        <div class="tree-box">
          <el-tree
            class="filter-tree"
            :lazy="lazy"
            :data="changeNodes"
            :props="defaultProps"
            :show-checkbox="showCheckbox"
            :load="loadNode"
            :default-expand-all="defaultExpandAll"
            :default-expanded-keys="checkedKey"
            @check="handleCheck"
            @node-click="handleNodeClick"
            @check-change="handleCheckChange"
            :filter-node-method="filterNode"
            :expand-on-click-node="false"
            :default-checked-keys="checkedKey"
            :node-key="nodeKey"
            :highlight-current="true"
            :ref="refName"
          >
            <template slot-scope="{ node }">{{ getName(node)}}</template>
          </el-tree>
        </div>
        <div class="tree_ctr">
          <el-button size="mini" @click="handleCansel">取消</el-button>
          <el-button type="primary" size="mini" @click="handleOk">确定</el-button>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "change"
  },
  computed: {
    label() {
      return this.defaultProps.label;
    }
  },
  props: {
    isShowSearch: {
      type: Boolean,
      default: true
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    lazy: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ""
    },
    loadNode: {
      type: Function,
      default: (node, resolve) => {
        if (node.level == 0 && node.data.constructor == Array) {
          resolve(node.data)
        }
        else if (node.data && node.data.children && node.data.children.length> 0) {
          resolve(node.data.children)
        }
        else resolve([])
      }
    },
    // 是否开启多选模式
    showCheckbox: {
      type: Boolean,
      default: true
    },
    // 提示文字
    placeholder: {
      type: String,
      default: "请选择"
    },
    // tree组件的nodeKey值，主要用于这种默认组件
    nodeKey: {
      type: String,
      default: "id"
    },
    // 树节点数据
    nodes: {
      type: Array,
      default: () => []
    },
    // 自定义节点的字段
    defaultProps: {
      type: Object,
      default: () => ({
        children: "children",
        label: "name"
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
    }
  },
  data() {
    return {
      changeNodes: this.nodes,
      popoverWidth: 100,
      filterText: "",
      choiseText: "",
      show: false,
      checkedKey: []
    };
  },
  watch: {
    nodes: {
      handler: function(val, old) {
        if (val !== old) this.changeNodes = val;

        if (val !== old && !!this.value) this.initData(this.value);
      },
      deep: true
    },
    value: {
      handler: function(val, old) {
        if (val !== old) this.initData(val);
      },
      immediate: true
    },
    filterText(val) {
      this.$refs[this.refName].filter(val);
    }
  },
  mounted() {
    this.appendTree()
  },
  methods: {
    // 得到焦点
    handelShow() {
      // this.show = true
      this.popoverWidth = this.$refs.choise.offsetWidth;
    },
    handleCansel() {
        this.show = false
    },
    handleOk() {
        this.show = false
    },
    appendTree() {
      if (this.lazy) {
        let _that = this
        const traverse = function(node) {
          const childNodes = node.children ? node.children : [];

          childNodes.forEach(item => {
            _that.$refs[_that.refName].append(item, node[_that.treeId])
            traverse(item)
          })
        };

        this.changeNodes.forEach(item => {
          traverse(item)
        })
      }
      
    },
    // 初始化数据节点
    initData(val) {
      if (!!val) {
        this.$nextTick(() => {
          let arr = this.flatten();
          let str = val.split(",");

          this.checkedKey = str;

          let arrs = arr.filter(t => str.includes(t.data[this.treeId]));
          let texts = arrs.map(t => this.getLableName(t.data));
          this.choiseText = texts.join(",");
        });
      } else {
        this.choiseText = "";
      }
      
      this.$emit("nameChange", this.choiseText);
    },
    // 获取所有数据
    flatten() {
      // let data = this.nodes
      let data = this.$refs[this.refName];
      const checkedNodes = [];

      const traverse = function(node) {
        const childNodes = node.root ? node.root.childNodes : node.childNodes;

        childNodes.forEach(child => {
          checkedNodes.push(child);
          traverse(child);
        });
      };

      traverse(data);

      return checkedNodes;
    },
    // 判断重复-若改变的值和选中的值一致 返回true
    repeat(other) {
      let arr = this.value.split(",");
      let otherArr = new Set([...arr, other]);
      return otherArr.length === arr.length;
    },
    handleCheck() {},
    // 节点改变
    handleCheckChange() {
      if (this.showCheckbox) {
        let nodes = this.$refs[this.refName].getCheckedNodes();
        let data = nodes.map(i => i[this.treeId]);

        // 此方法为性能优化判断-修改前请注意
        if (!this.repeat(data)) {
          this.$emit("change", data.join(","));
        }
      }
    },
    // 特殊需求兼容 由于地区-部门字段不一致
    getLableName(node) {
      if (Number(node.leiXing) === 2) return node.departName;
      else if (Number(node.leiXing) === 1) return node.diQuName;
      else return node[this.label];
    },
    // 设置名称
    getName(node) {
      return this.getLableName(node.data); // Number(node.data.leiXing) === 2 ? node.data.departName :  node.data.diQuName
    },
    // 过滤节点
    filterNode(value, data) {
      if (!value) return true;
      return this.getLableName(data).indexOf(value) !== -1;
    },
    // 点击树节点
    handleNodeClick(data) {
      // 当选中的id不存在 那么不选择
      if (!this.showCheckbox && !!data[this.treeId]) {
        this.$emit("change", data[this.treeId]);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.tree_selector {
  width: 100%;
  height: 100%;
  background: #fff;
  position: relative;
  z-index: 9;
  .tree_selector_search {
    padding: 5px 10px;
    box-sizing: border-box;
  }
}
.tree_selector_box {
  width: 100%;
  background: #fff;
  // position: absolute;
}
.tree-box {
  max-height: 300px;
  overflow: hidden;
}
.filter-tree {
  max-height: 300px;
  margin-right: -17px;
  overflow-y: scroll;
}
.tree_ctr{
    padding-top: 10px;
    text-align: right;
}
</style>
