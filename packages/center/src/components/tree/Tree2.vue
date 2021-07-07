<template>
  <div class="tree_selector" :class="{ tree_drop: drop }">
    <div class="tree_input" v-if="showInput">
      <el-input
        :placeholder="placeholder"
        v-model="text"
        readonly
        @focus="handelShow"
        v-if="showCheckbox"
        size="small"
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
      <div class="tree_selector_search">
        <el-input
          placeholder="输入关键字进行过滤"
          size="small"
          v-model="filterText"
          style="width: 100%"
        >
        </el-input>
        <slot></slot>
      </div>
      <div class="tree-box">
        <el-tree
          class="filter-tree"
          :data="nodes"
          :props="defaultProps"
          :show-checkbox="showCheckbox"
          :default-expand-all="false"
          @node-click="handleNodeClick"
          :filter-node-method="filterNode"
          @check-change="handleCheck"
          :default-checked-keys="checkedNodes"
          :expand-on-click-node="false"
          :node-key="nodeKey"
          :highlight-current="true"
          :ref="refName"
          :class="{ drop_tree_box: drop }"
        >
        </el-tree>
        <div class="tree_ctr" v-if="drop">
          <el-button size="mini" @click="handleCansel">取消</el-button>
          <el-button type="primary" size="mini" @click="handleOk"
            >确定</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from './mixin'
export default {
  mixins: [mixin],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    // 是否显示操作
    showctr: {
      type: Boolean,
      default: false,
    },
    // tree组件的nodeKey值，主要用于这种默认组件
    nodeKey: {
      type: String,
      default: 'id'
    },
    // 提示占位文字
    placeholder: {
      type: String,
      default: '请选择'
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
    // 是否显示输入框，适合做表单场景
    showInput: {
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
        children: 'children',
        label: 'departName'
      })
    },
    // 树组件对应自定义的数据id
    treeId: {
      type: String,
      default: 'id'
    },
    // 自定义ref
    refName: {
      type: String,
      default: 'tree'
    }
  },
  data () {
    return {
      filterText: '',
      selData: {},
      flag: false, // 是否是初始化第一次
      checked: false, // 当前节点是否是选中状态
      show: false,
      selText: [],
      currentNode: [],
      text: '',
      checkedNodes: this.checkeds,
      currentIndex: null,
      showBox: false
    }
  },
  computed: {
    label () {
      return this.defaultProps.label
    }
  },
  mounted () {
    this.initTree()
    if (!this.showCheckbox) {
      if (this.checkeds.length) {
        this.selData = this.checkeds[0]
        this.$emit('change', this.selData[this.treeId])
        this.dispatch('ElFormItem', 'change', this.selData[this.treeId])
        this.$emit('setNode', this.selData)
      }
    }
  },
  updated () {
    this.showBox = false
  },
  methods: {
    handleCloseBox () {
      this.showBox = false
    },
    // 添加子节点
    handleAddSubNode (node) {
      this.$emit('addSubNode', node)
    },
    // 删除节点
    handleDeleteNode (node) {
      this.$emit('deleteNode', node)
    },
    // 修改节点
    handleModifyNode (node) {
      this.$emit('modifyNode', node)
    },
    // 处理数据回填
    initTree () {
      this.$nextTick().then(() => {
        const id = this.treeId
        const name = this.defaultProps.label
        const nodes = this.$refs[this.refName].getCheckedNodes()
        const checkedNodes = this.checkedNodes
        const node = this.currentNode
        const flag = this.flag
        const selText = this.selText
        if (this.checkeds.length) {
          if (checkedNodes.length) {
            if (flag) {
              if (this.checked) {
                nodes.forEach((e, i) => {
                  if (!selText.includes(e[name]) && checkedNodes.includes(e[id])) {
                    selText.push(e[name])
                  }
                })
              } else {
                if (selText.includes(node[name])) {
                  selText.splice(selText.indexOf(), 1)
                } else {

                }
              }
            } else {
              nodes.forEach((e, i) => {
                if (checkedNodes.includes(e[id]) && !selText.includes(e[name])) {
                  selText.push(e[name])
                }
              })
            }
          } else {
            this.selText = []
          }
        } else {
          this.selText = []
        }
        this.text = this.selText.join('，')
        this.$emit('setNode', this.selData, this.text)
      })
    },
    handleAddNode (data) {
      this.currentIndex = data.id
      this.showBox = true
      this.$emit('setCurrentNode', data)
    },
    filterNode (value, data) {
      if (!value) return true;
      return data[this.defaultProps.label].indexOf(value) !== -1;
    },
    handleCheck (node, checked) {
      const name = this.defaultProps.label
      const id = this.treeId
      const checkedNodes = this.checkedNodes
      this.flag = true
      this.checked = checked
      this.currentNode = node
      if (checked) {
        if (!checkedNodes.includes(node[id])) {
          checkedNodes.push(node[id])
        }
      } else {
        if (checkedNodes.includes(node[id])) {
          const m = checkedNodes.indexOf(node[id])
          if (m != -1) checkedNodes.splice(m, 1)
        }
      }
      // console.log(checkedNodes.join(','))
      const data = checkedNodes.filter(i => {
        if (i !== '') return i
      })
      this.$emit('change', data.join(','))
      this.dispatch('ElFormItem', 'change', data.join(','))
    },
    // 点击树节点
    handleNodeClick (data) {
      if (this.showCheckboxshowCheckbox) {
      } else {
        this.selData = data
        this.$emit('change', data[this.treeId])
        this.dispatch('ElFormItem', 'change', data[this.treeId])
        this.$emit('setNode', data)
      }
    },
    // 取消选择
    handleCansel () {
      this.show = false
      this.selData = {}
    },
    handelShow () {
      this.show = true
    },
    handleOk () {
      this.show = false
      if (this.showCheckbox) {
      } else {
        this.$emit('change', this.selData[this.treeId])
        this.$emit('setNode', this.selData, this.text)
        this.dispatch('ElFormItem', 'change', this.selData[this.treeId])
      }
    }
  },
  watch: {
    checkeds: {
      handler (data) {
        this.initTree()
      },
      immediate: true
    },
    filterText (val) {
      this.$refs[this.refName].filter(val);
    }
  }
};
</script>
<style lang="scss">
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
  background: #fff;
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
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  position: relative;
}
.tree_input .el-input__inner {
  overflow: hidden;
  text-overflow: ellipsis;
}
.drop_box {
  height: 134px;
  width: 90px;
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
</style>
