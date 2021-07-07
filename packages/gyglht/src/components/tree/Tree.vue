<template>
  <div class="tree_selector" :class="{ tree_drop: drop }" :style="{zIndex: zIndex}"  v-clickoutside="handleCansel" ref="treeBox">
    <div class="tree_input" v-if="showInput">
      <el-input
        :placeholder="placeholder"
        v-model="text"
        readonly
        @focus="handelShow"
        v-if="showCheckbox || !objed"
      ></el-input>
      <el-input
        :placeholder="placeholder"
        v-model="selData[label]"
        readonly
        @focus="handelShow"
        v-else
      ></el-input>
      <!-- {{text}} -->
    </div>
    <div class="tree_selector_box tree_selector_box_down" v-show="show || !drop">
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
                :default-expand-all="true"
                @node-click="handleNodeClick"
                :filter-node-method="filterNode"
                @check-change="handleCheck"
                :default-checked-keys="checkedNodes"
                :expand-on-click-node="false"
                :node-key="nodeKey"
                :highlight-current="true"
                :ref="refName"
                :check-strictly="isStrictly"
                :class="{ drop_tree_box: drop }"
                :style="{ height: height }"
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
  import Clickoutside from 'element-ui/src/utils/clickoutside'
  import mixin from './mixin'
  export default {
    mixins: [mixin],
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      objed: {
        type: Boolean,
        default: false
      },
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
      // 是否显示完全路径
      fullPath: {
        type: Boolean,
        default: false
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
      },
      // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
      isStrictly: {
        type: Boolean,
        default: false
      },
      height:{
        type: String,
        default: '240px'
      },
      // 引用来源
      source: {
        type: String,
        default: ""
      },
    },
    data () {
      return {
        zIndex: 9,
        filterText: '',
        selData: {},
        flag: false, // 是否是初始化第一次
        checked: false, // 当前节点是否是选中状态
        show: false,
        selText: [],
        currentNode: [],
        text: '',
        currentIndex: null,
        checkedNodes: JSON.parse(JSON.stringify(this.checkeds)) || [],
        showBox: false,
        copySelText: [],
        copyCheckedNodes: [],
        derect: false,
        flatData: [],
        erParentList: [],
      }
    },
    directives: { Clickoutside },
    computed: {
      label () {
        return this.defaultProps.label
      }
    },
    created () {
      this.flatData = this.flatten(this.nodes)
    },
    mounted () {
      if (!this.showCheckbox) {
        if (this.checkeds && this.checkeds.length && this.objed) {
          let id = this.treeId
          if (this.fullPath) {
            this.flatData.forEach(e => {
              if (e[id] === this.checkeds[0]) {
                this.selData = e
                if (e.pid) {
                  this.selData[this.label] = this.getParentNode(this.flatData, e).join(' / ')
                }
              }
            })
          } else {
            this.selData = this.checkeds[0]
          }
          this.$emit('change', this.selData[this.treeId])
          this.dispatch('ElFormItem', 'change', this.selData[this.treeId])
          this.$emit('setNode', this.selData)
        }
      }
      // 来源为供应商申请行业分类来源，初始化有数据时，添加二级id
      if (this.checkeds && this.checkeds.length && this.source === "supplierZhuanYeFenLei") {
        this.nodes.map((v) => {
          v.children.map((v2) => {
            if (v2.id == this.checkeds[0]) {
              this.erParentList = [v2.id]
              return
            }
            if (v2.children && v2.children.length) {
              v2.children.map((v3) => {
                if (v3.id == this.checkeds[0]) {
                  this.erParentList = [v3.pid]
                }
              })
            } else {
              if (v2.id == this.checkeds[0]) {
                this.erParentList = [v2.id]
              }
            }
          });
        });
      }
    },
    updated () {
      this.showBox = false
    },
    methods: {
      handleCloseBox () {
        // if (!this.showBox) return
        this.showBox = false
        this.zIndex = 9
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
      flatten (data) {
        let arr = []
        for(var i = 0; i < data.length; i++) {
          const obj ={}
          for (var e in data[i]) {
            if (e !== 'children') {
              obj[e] = data[i][e]
            }
          }
          arr.push(obj)
          if (data[i].children && data[i].children.length) {
            arr = arr.concat(this.flatten( data[i].children))
          }
        }
        return arr
      },
      getParentNode(data,node) {
        let label = this.defaultProps.label
        let arr = [node[label]]
        let id = this.treeId
        let len = data.length
        for (let i = 0; i < len; i++) {
          if (data[i][id] === node['pid']) {
            if (data[i]['pid'] && data[i]['pid'] !== '0') {
              arr = [...this.getParentNode(data, data[i]), arr]
            } else {
              arr.unshift(data[i][label])
            }
          }
        }
        return arr
      },
      // 处理数据回填
      initTree () {
        this.$nextTick().then(() => {
          const flatData = this.flatten(this.nodes)
          const id = this.treeId
          const name = this.defaultProps.label
          const flag = this.flag
          const tempArr = []
          this.flatData.forEach(i => {
              if (this.checkeds) {
                  if (this.checkeds.includes(i[id])) {
                      if (this.fullPath) {
                        tempArr.push(this.getParentNode(this.flatData, i).join(' / '))
                      } else {
                        tempArr.push(i[name])
                      }
                  }
              }
          })
          this.selText = tempArr
          this.text = this.selText.join('，')
          if (!flag) {
            this.copySelText = JSON.parse(JSON.stringify(this.selText))
            this.copyCheckedNodes = JSON.parse(JSON.stringify(this.checkedNodes))
          }
          this.$emit('setNode', this.selData, this.text)
        })
      },
      handleAddNode (data) {
        this.currentIndex = data.id
        this.showBox = true
        this.zIndex = 100
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
            // 有复选框，判断二级id
            if (node.id&&node.id.length == 1) {
              this.erParentList.push("")
            } else {
              if (node.hasOwnProperty("children")) {
                if (node.children === null || node.children.length) {
                  this.erParentList.push(node.id)
                }
              } else {
                this.erParentList.push(node.pid)
              }
            }
          }
        } else {
          if (checkedNodes.includes(node[id])) {
            const m = checkedNodes.indexOf(node[id])
            if (m != -1) {
              checkedNodes.splice(m, 1)
              this.erParentList.splice(m-1, 1)
            }
          }
        }
        const data = checkedNodes.filter(i => {
          if (i !== '') return i
        })
        this.$emit('change', data.join(','))
        this.dispatch('ElFormItem', 'change', data.join(','))
      },
      // 点击树节点
      handleNodeClick (data) {
        if (this.showCheckbox) {
        } else {
          this.selData = JSON.parse(JSON.stringify(data))
          if (this.fullPath) {
            if (data['pid']) {
              this.getParentNode(this.flatData, data)
              this.selData[this.defaultProps.label] = this.getParentNode(this.flatData, data).join(' / ')
            }
          }
          // 无复选框，判断二级id
          if (data.hasOwnProperty("children") && (data.children === null || data.children.length)) {
            this.erParentList = [data.id]
          } else {
            this.erParentList = [data.pid]
          }
          this.$emit('change', data[this.treeId])
          this.dispatch('ElFormItem', 'change', data[this.treeId])
          this.$emit('setNode', data)
        }
      },
      // 取消选择
      handleCansel () {
        if (!this.show) return
        this.show = false
        this.zIndex = 9
        this.selData = {}
      },
      handelShow () {
        this.show = true
        this.zIndex = 100
      },
      handleOk () {
        this.show = false
        this.zIndex = 9
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
      },
      show (data) {
        if (data) {
          console.log(this.$refs.treeBox.clientHeight)
        }
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
      height: 350px;
      box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
      position: absolute;
      left: 0;
      z-index: 2;
      width: 100%;
      background: #fff;
    }
    .tree_selector_box_down{
      top: 45px;
    }
    .tree_selector_box_up{
      top: -400px;
    }
    .tree-box {
      height: 300px;
      .drop_tree_box {
        height: 240px;
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
