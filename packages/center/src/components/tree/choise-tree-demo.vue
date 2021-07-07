<template>
    <Tree
        :nodes="nodes" 
        :showCheckbox="false"
        v-model="ruleForm.departGuid"
        :defaultProps="{ children: 'children', label: 'name' }"
        nodeKey="value" 
        treeId="value"
    ></Tree>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            // 绑定的数据
            ruleForm: {
                departGuid: '1'
            },
            // 节点数据
            nodes: [
                {value: '1', name: '测试1'},
                {value: '12', name: '测试12'},
                {value: '123', name: '测试123'},
                {value: '1234', name: '测试1234'},
            ]
        }
    }
}
</script>