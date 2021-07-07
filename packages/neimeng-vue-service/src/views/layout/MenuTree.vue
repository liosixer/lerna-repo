<template>
    <div>
        <template v-for="item of menuList">
        <el-submenu :index="item.index" v-if="!item.path" :key="item.index">
            <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">
                    {{ item.name }}
                    <span v-if="item.todoTip || item.todoTip === 0" style="color: #d6001d;">（{{ item.todoTip }}）</span>
                </span>
            </template>
            <MenuTree :menuList="item.children"></MenuTree>
        </el-submenu>
        <el-menu-item v-else :index="item.path" :key="item.path">
            <i :class="item.icon"></i>
            <span slot="title">
                {{ item.name }}
                <span v-if="item.todoTip || item.todoTip == 0" style="color: #d6001d;">（{{item.todoTip ? item.todoTip: 0 }}）</span>
            </span>
        </el-menu-item>
        </template>
    </div>
</template>

<script>
export default {
    name:'MenuTree',
    props: {
        menuList: Array,

    },
    methods:{

    }
}
</script>


