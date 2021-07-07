<template>
    <div class="siderbar-box" :class="{ collapsider: isCollapse }">
        <el-menu
                :class="menuClass"
                :default-active="activePath"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                :collapse="isCollapse"
                :unique-opened="true"
                router
        >
            <template v-for="item of menuList">
                <el-submenu :index="item.index" v-if="!item.path">
                    <template slot="title">
                        <i class="iconfont" :class="item.icon"></i>
                        <span slot="title">{{ item.name }}</span>
                    </template>
                    <MenuTree :menuList="item.children"></MenuTree>
                </el-submenu>
                <el-menu-item v-else :index="item.path">
                    <i class="iconfont" :class="item.icon"></i>
                    <span slot="title">{{ item.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import MenuTree from "./MenuTree";

    export default {
        name: "Siderbar",
        components: {MenuTree},
        data() {
            return {
                menuList: []
            };
        },
        computed: {
            isCollapse() {
                return this.$store.state.frame.collapsed;
            },
            activePath() {
                return this.$route.path;
            },
            menuClass() {
                return this.$store.state.frame.colors;
            }
        },
        created() {
            this.$store.dispatch("getEnterpriseInfo");
            this.getMenuList();
        },
        methods: {
            getMenuList() {
                this.menuList = this.addIndex(
                    this.$store.state.roleAnddepartment.menuList
                );
                // this.menuList = this.$store.state.roleAnddepartment.menuList
            },
            linkTo(name) {
                this.$router.push({name: name});
            },
            handleOpen() {
            },
            handleClose() {
            },
            addIndex(data, fatherIndex = 0) {
                if (fatherIndex) {
                    return data.map((v, i) => {
                        v.index = fatherIndex + (i + 1).toString();
                        if (v.children) {
                            this.addIndex(v.children, v.index);
                        }
                        return v;
                    });
                } else {
                    let tempData = [{
                        name: "企业信息",
                        path: "",
                        icon: "icon-xinxi",
                        children: [
                            {
                                name: "企业基本信息",
                                path: "/qyxxgl/qyjbxx"
                            }
                        ]
                    }]
                    if (Object.keys(data).length) {
                        tempData = data
                    }
                    return tempData.map((v, i) => {
                        v.index = (i + 1).toString();
                        if (v.children) {
                            this.addIndex(v.children, v.index);
                        }
                        return v;
                    });
                }
            }
        },
        watch: {
            "$store.state.roleAnddepartment.enterPriseInfo": {
                handler(data) {
                    if (data) {
                        this.getMenuList();
                    }
                },
                deep: true,
                immediate: true
            },
            "$store.state.roleAnddepartment.menuList": {
                handler(data) {
                    if (data) {
                        this.getMenuList();
                    }
                },
                deep: true,
                immediate: true
            }
        }
    };
</script>
<style lang="scss">
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }

    .dark {
        background-color: #23374A;

        .el-menu-item {
            span {
                color: #6a747e;
            }
        }

        .el-menu {
            background-color: #23374A;
        }

        .el-submenu__title {
            span {
                color: #6a747e;
            }
        }

        .el-menu-item.is-active {
            background-color: #0A83F4;
            color: #fff;

            span {
                color: #fff;
            }

            i {
                color: #fff;
            }
        }

        .el-menu-item:hover {
            background-color: #177edf !important;
            color: #fff;

            span {
                color: #fff;
            }

            i {
                color: #fff;
            }
        }

        .el-submenu__title:hover {
            background-color: #177edf !important;
            color: #fff;

            i {
                color: #fff;
            }

            span {
                color: #fff;
            }
        }

        .el-submenu.is-opened {
            background: #1D2F40;

            .el-menu--inline {
                background: #1D2F40;
            }
        }
    }

    .wight {
        background: url("../../assets/images/frame/menuBj.png") left bottom no-repeat;
        /* background-size: 200px 210px; */
        background-color: #fff;

        .el-menu-item,
        .el-submenu__title {
            span {
                font-size: 14PX; /*no*/
                color: #26263a;
            }
        }

        .el-menu-item.is-active {
            border-right: none;
            background-color: #fff;
            font-weight: 700;
            position: relative;

            span {
                padding: 2PX 7PX; /*no*/
                border-radius: 4PX; /*no*/
                color: #d6001d;
                margin-left: -7PX; /*no*/
            }
        }

        .el-menu-item.is-active i {
            color: #d6001d;
        }

        .el-menu-item.is-active::after {
            content: "";
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 3PX; /*no*/
            height: 16PX; /*no*/
            background: #d6001d;
            border-radius: 2PX 0PX 0PX 2PX; /*no*/
        }

        .el-menu-item:hover,
        .el-submenu__title:hover,
        .el-menu-item.is-active:hover {
            background-color: #fff !important;
            color: #d6001d;
            position: relative;

            i,
            span {
                color: #d6001d;
            }
        }

        .el-submenu__title:hover {
            background-color: #fff;
            color: #d6001d;
            position: relative;

            i,
            span {
                color: #d6001d;
            }
        }

        .el-menu-item:hover::after,
        .el-submenu__title:hover::after {
            content: "";
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 3PX; /*no*/
            height: 16PX; /*no*/
            background: #d6001d;
            border-radius: 2PX 0PX 0PX 2PX; /*no*/
        }
    }

    // .el-menu-item {
    //   width: 183PX !important;/*no*/
    //   min-width: 183PX;/*no*/
    // }
    .el-submenu__title {
        width: 208PX; /*no*/
    }

    .el-submenu .el-menu-item {
        width: 207PX !important; /*no*/
        min-width: 207PX;
        height: 50PX !important; /*no*/
        line-height: 50PX !important; /*no*/
        padding-left: 51PX !important; /*no*/
    }

    .el-submenu [class^="el-icon-"],
    .el-menu-item [class^="el-icon-"] {
        font-size: 14PX /*no*/
    ;
    }

    .siderbar-box ::v-deep.el-submenu__icon-arrow {
        font-size: 14PX; /*no*/
    }

    .siderbar-box {
        ::v-deep.el-submenu__title,
        ::v-deep.el-menu-item {
            height: 50PX; /*no*/
            line-height: 50PX; /*no*/
        }
    }

    .el-menu--vertical {
        .el-menu-item {
            height: 50PX; /*no*/
            line-height: 50PX; /*no*/
            font-size: 14PX; /*no*/
        }
    }

    .siderbar-box[data-v-7665dbf3] .el-submenu__title,
    .siderbar-box[data-v-7665dbf3] .el-menu-item {
        height: 50PX; /*no*/
        line-height: 50PX; /*no*/
    }


    .dark {

        .el-menu-item, .el-submenu__title {
            span {
                font-size: 14PX; /*no*/
                color: #ccc;
            }

            .iconfont {
                color: #ccc;
            }
        }

        .el-menu-item.is-active {
            span {
                color: #fff;
            }

        }

        .el-menu-item:hover, .el-submenu__title:hover, .el-menu-item.is-active:hover, .el-menu-item:focus {
            background-color: #177edf !important;
            color: #fff;

            i, span {
                color: #fff;
            }
        }

        .el-submenu__title:hover {
            background-color: #177edf;
            color: #fff;

            i, span {
                color: #fff;
            }
        }

    }

    .wight {
        .el-menu-item, .el-submenu__title {
            span {
                font-size: 14PX; /*no*/
                color: #26263a;
            }
        }

        .el-menu-item.is-active {
            span {
                color: #D6001D;
            }

        }

        .el-menu-item:hover, .el-submenu__title:hover, .el-menu-item.is-active:hover, .el-menu-item:focus {
            background-color: #fff !important;
            color: #D6001D;

            i, span {
                color: #D6001D;
            }
        }

        .el-submenu__title:hover {
            background-color: #fff;
            color: #D6001D;

            i, span {
                color: #D6001D;
            }
        }
    }

    @media screen and (max-width: 1366px) {
        /*缩小导航显示出来的菜单 */
        .el-menu--vertical {
            .el-menu--popup {
                min-width: 130PX; /*no*/
            }

            .el-menu-item {
                width: 183PX !important; /*no*/
                height: 50PX; /*no*/
                line-height: 50PX; /*no*/
                font-size: 12PX; /*no*/
            }
        }
    }
</style>
<style lang=scss scoped>
    .siderbar-box {
        height: 100%;
        width: 208PX; /*no*/
        overflow: hidden;
        transition: transform 0.28s;
        border-right: 1px solid #ebeef5;

        .el-menu {
            width: 226PX; /*no*/
            overflow-x: hidden;
            overflow-y: auto;
        }

        .el-menu-vertical-demo {
            height: 100%;
            box-sizing: border-box;
            padding-bottom: 15px;
        }

        ::v-deep.el-menu {
            .el-menu--collapse {
                width: 64px; /*no*/
            }

            /*收起导航宽度设置*/
            &.el-menu-vertical-demo.el-menu--collapse {
                width: 64PX !important; /*no*/
                .el-menu-item {
                    width: 60PX !important; /*no*/
                    min-width: 60PX !important; /*no*/
                    font-size: 14PX; /*no*/
                }

                .el-submenu__title {
                    width: 60PX !important; /*no*/
                    span {
                        font-size: 12PX;
                    }
                }

                .el-submenu .el-menu-item {
                    width: 60PX !important; /*no*/
                    min-width: 60PX !important; /*no*/
                    font-size: 14PX;
                }

                .el-menu--vertical .el-menu-item {
                    font-size: 14PX !important;
                }

            }

        }
    }

    /*::v-deep.el-menu-item:focus, ::v-deep.el-menu-item:hover{*/
    /*    background-color: #fff !important;*/
    /*  }*/
    .siderbar-box.collapsider {
        ::v-deep.el-menu-item {
            .el-tooltip {
                padding-left: 15px !important;
            }
        }

        ::v-deep.el-submenu > .el-submenu__title {
            padding-left: 15px !important;
        }
    }

    .collapsider {
        width: 55PX; /*no*/
        transition: all 0.28s ease-in;
    }

    /*
    适配小屏幕 1366px
    */
    @media screen and (max-width: 1366px) {
        .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 150PX !important; /*no*/
            min-height: 300PX !important; /*no*/
        }
        .siderbar-box {
            width: 183PX !important; /*no*/
            ::v-deep.el-submenu__title,
            ::v-deep.el-menu-item {
                height: 50PX; /*no*/
                line-height: 50PX; /*no*/
            }

            &.collapsider {
                width: 60PX !important; /*no*/
            }

            ::v-deep.el-menu {
                width: 192PX !important; /*no*/
                /*收起导航宽度设置*/
                &.el-menu-vertical-demo.el-menu--collapse {
                    width: 60PX !important; /*no*/
                    .el-menu-item {
                        width: 60PX !important; /*no*/
                        min-width: 60PX !important; /*no*/
                    }

                    .el-submenu__title {
                        width: 60PX !important; /*no*/
                    }

                    .el-submenu .el-menu-item {
                        width: 60PX !important; /*no*/
                        min-width: 60PX !important; /*no*/
                    }
                }

                .el-submenu__title {
                    width: 183PX !important; /*no*/
                }

                .el-submenu .el-menu-item {
                    width: 183PX !important; /*no*/
                    min-width: 183PX !important; /*no*/
                }

                .el-menu-item {
                    width: 183PX !important; /*no*/
                }

                .el-menu-item,
                .el-submenu__title {
                    span {
                        font-size: 12PX; /*no */
                    }
                }

                .el-submenu [class^="el-icon-"],
                .el-menu-item [class^="el-icon-"] {
                    /* font-size: 14PXno; */
                }
            }

            /*菜单样式*/
            ::v-deep.el-submenu {
                .el-menu-item {
                    height: 50PX; /*no*/
                    line-height: 50PX; /*no*/
                }
            }

            ::v-deep.el-submenu__icon-arrow {
                /* font-size:14PX;no */
            }
        }

        .siderbar-box.collapsider {
            ::v-deep.el-menu-item {
                .el-tooltip {
                    padding-left: 17px !important;
                }
            }

            ::v-deep.el-submenu > .el-submenu__title {
                padding-left: 17px !important;
            }
        }
    }

    .iconfont {
        font-size: 14PX; /*NO*/
        margin: 0 10PX 0 5PX; /*NO*/
        color: #26263a;
    }

    .icon-caigoujihua,
    .icon-xiangmuguanli,
    .icon-chengxinguanli,
    .icon-baozhengjinliushui,
    .icon-feiyongguanli1 {
        font-size: 16PX; /*no*/
    }

    .icon-caigoujihua {
        font-size: 17PX; /*no*/
        margin: 0 8PX 0 5PX; /*NO*/
    }

    .icon-feiyongguanli {
        font-size: 20PX; /*no*/
        margin: 0 8PX 0 4PX; /*no*/
    }

    .icon-gongzuotai {
        font-size: 20PX; /*no*/
        margin: 0 7PX 0 2PX; /*no*/
    }

    .icon-baozhengjinliushui {
        font-size: 18PX; /*no*/
        margin: 0 10PX 0 4PX; /*no*/
    }

    .icon-feiyongguanli1, .icon-xinxi {
        font-size: 15PX; /*no*/
        margin: 0 12PX 0 5PX; /*no*/
    }

    .icon-yuyue {
        font-size: 18PX; /*no*/
        margin: 0 8PX 0 5PX; /*no*/
    }

    .icon-shangbiaoyiyidabian {
        margin: 0 8PX 0 7PX; /*no*/
    }
</style>
