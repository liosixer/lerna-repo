<template>
    <div>
        <template v-for="item of menuList">
        <el-submenu :index="item.index" v-if="!item.path">
            <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
            </template>
            <MenuTree :menuList="item.children"></MenuTree>
        </el-submenu>
        <el-menu-item v-else :index="item.path">
        <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
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


