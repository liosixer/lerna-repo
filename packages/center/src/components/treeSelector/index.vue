<template>
    <div class="z-tree" v-clickoutside="handleCancel" ref="treeWrapper">
        <el-input placeholder="请选择" readonly :size="size" clearable v-model="text" @focus="handleFocus"></el-input>
        <div class="z-tree-drop" :class="up ? 'z-tree-drop-down' : 'z-tree-drop-up'" v-if="showDrop">
            <el-input placeholder="请输入关键字" v-model="filterText" :size="size"></el-input>
            <div class="z-tree-content">
                <el-tree
                    :data="nodes"
                    :props="props"
                    :node-key="nodeKey"
                    :check-strictly="checkStrictly"
                    :default-checked-keys="defaultCheckedKeys"
                    :showCheckbox="showCheckbox"
                    :check-on-click-node="false"
                    :expand-on-click-node="false"
                    @check-change="handleCheck"
                    @node-click="handleNodeClick"
                    :filter-node-method="filterNode"
                    :ref="refName"
                ></el-tree>
            </div>
        </div>
    </div>
</template>

<script>
    import Clickoutside from 'element-ui/src/utils/clickoutside'
    import minxin from './mixin'
    export default {
        name: 'treeSelector',
        model: {
            prop: 'value',
            event: 'change'
        },
        directives: { Clickoutside },
        mixins: [minxin],
        props: {
            size: {
                type: String,
                default: 'small'
            },
            clearable: {
                type: Boolean,
                default: true
            },
            nodeKey: {
                type: String,
                default: 'id'
            },
            data: {
                type: Array,
                default: () => []
            },
            refName: {
                type: String,
                default: 'tree'
            },
            checkStrictly: {
                type: Boolean,
                default: false
            },
            showCheckbox: {
                type: Boolean,
                default: true
            },
            selLastLevel: {
                type: Boolean,
                default: false
            },
            joinNode: {
                type: String,
                default: '/'
            },
            children: {
                type: String,
                default: 'children'
            },
            label: {
                type: String,
                default: 'label'
            },
            pid: {
                type: String,
                default: 'pid'
            },
            up: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                filterText: '',
                text: '',
                nodes: [],
                flatData: [],
                showDrop: false,
                defaultCheckedKeys: [],
                offsetTop: 0,
                props: { children: 'children', label: 'label', id: 'id', pid: 'pid' }
            }
        },
        created () {
            this.initData()
            console.log(this.nodes);
        },
        mounted () {
        },
        methods: {
            handleFocus () {
                this.$nextTick().then(() => {
                    // const { bottom, height, top } = this.$refs.treeWrapper.getClientRects()[0]
                    // this.offsetTop = height
                    // this.up = (bottom >= 200)
                    this.showDrop = true
                })
            },
            initData () {
                const { label, children, nodeKey, pid } = this._props
                if (label) this.props.label = label
                if (children) this.props.children = children
                if (nodeKey) this.props.id = nodeKey
                if (pid) this.props.pid = pid
                this.nodes = JSON.parse(JSON.stringify(this.data))
                this.flatData = this.flattenData(JSON.parse(JSON.stringify(this.data)))
                this.initTree()
            },
            initTree () {
                if (!this.$attrs.value) {
                    this.text = ''
                    return
                }
                if (this.showCheckbox) {
                    const value = this.$attrs.value
                    if (typeof value === 'string' && value.length) {
                        this.defaultCheckedKeys = this.$attrs.value.split(',')
                    } else {
                        if (typeof value === 'number') {
                            this.defaultCheckedKeys = [value]
                        } else {
                            console.error('v-model传值错误，数组请采用","分开的字符串传入，数字类型只能传入一个')
                        }
                    }
                    this.initMultCheck(this.defaultCheckedKeys)
                } else {
                    this.initSingleCheck(this.$attrs.value)
                }
            },
            flattenData (data) {
                let arr = []
                const children = this.props.children
                for (let i = 0; i < data.length; i++) {
                    const obj = {}
                    for (const e in data[i]) {
                        if (e !== children) {
                            obj[e] = data[i][e]
                        }
                    }
                    arr.push(obj)
                    if (data[i][children] && data[i][children].length) {
                        arr = arr.concat(this.flattenData(data[i][children]))
                    }
                }
                return arr
            },
            initSingleCheck (id) {
                const node = this.getNodeById(id)
                if (node.length) {
                    this.text = this.builtText(node[0])
                }
            },
            getNodeById (id) {
                return this.flatData.filter(i => {
                    if (i.id.toString() === id.toString()) return i
                })
            },
            initMultCheck (ids) {
                const arr = []
                const id = this.props.id
                this.flatData.forEach(i => {
                    if (ids.includes(i[id].toString())) {
                        arr.push(this.builtText(i))
                    }
                })
                this.text = arr.join('，')
            },
            filterNode (value, data) {
                if (!value) return true
                return data.label.indexOf(value) !== -1
            },
            getParentNode (data, node) {
                const { label, id, pid } = this.props
                let arr = [node[label]]
                const len = data.length
                for (let i = 0; i < len; i++) {
                    if (data[i][id] === node[pid]) {
                        if (data[i][pid] && data[i][pid] !== 0) {
                            arr = [...this.getParentNode(data, data[i]), arr]
                        } else {
                            arr.unshift(data[i][label])
                        }
                    }
                }
                return arr
            },
            handleCheck (node, flag) {
                const refName = this.refName
                this.$attrs.value = this.$refs[refName].getCheckedKeys().join(',')
                this.$emit('change', this.$attrs.value)
                this.dispatch('ElFormItem', 'change', this.$attrs.value)
                this.initTree()
            },
            handleNodeClick (node) {
                if (this.showCheckbox) return
                const id = this.props.id
                if (this.selLastLevel) {
                    if (!node.children || node.children.length === 0) {
                        this.builtText(node)
                        this.$emit('change', [node[id]])
                        this.dispatch('ElFormItem', 'change', [node[id]])
                    }
                    return
                }
                this.text = this.builtText(node)
                this.$emit('change', node[id])
                this.dispatch('ElFormItem', 'change', [node[id]])
            },
            builtText (node) {
                return this.getParentNode(this.flatData, node).join(' ' + this.joinNode + ' ')
            },
            handleCancel () {
                this.showDrop = false
            }
        },
        watch: {
            filterText (val) {
                this.$refs[this.refName].filter(val)
            },
            'data': {
                immediate: true,
                handler (data) {
                    if (data) {
                        this.initData()
                    }
                }
            },
            '$attrs.value': {
                immediate: true,
                handler (data) {
                    if (data) {
                        if (this.flatData.length) {
                            this.initTree()
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .z-tree{
        position: relative;
        z-index: 9999;
    }
    .z-tree-drop{
        color: #606266;
        border: 1px solid #e4e7ed;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        background: #fff;
        border-radius: 4px;
        line-height: 30px;
        margin: 5px 0;
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
        position: absolute
    }
    .z-tree-drop-up{
        top: 40px;
    }
    .z-tree-drop-down{
        bottom: 40px;
    }
    .z-tree-content{
        height: 200px;
        overflow-y: auto;
        margin-top: 10px;
        padding:10px;
        box-sizing: border-box;
        border: 1px solid #eee;
        &::-webkit-scrollbar {
            //color: #000;
            background: #f1f1f1;
            margin: auto;
            border: none;
            border-radius: 0px;
        }
        &::-webkit-scrollbar {
            height: 8PX;/*no*/
        }
        &::-webkit-scrollbar {
            width: 8PX;/*no*/
        }
        &::-webkit-scrollbar-thumb {
            background: #D1D1D1;
            border: none;
            border-radius: 0PX;/*no*/
            width: 8PX;/*no*/
        }
        &::-webkit-scrollbar {
            //color: #000;
            background: #f1f1f1;
            margin: auto;
            border: none;
            border-radius: 0px;
            width: 8PX;/*no*/
        }
    }
</style>
