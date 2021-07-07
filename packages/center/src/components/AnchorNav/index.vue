<template>
    <div>
        <div class="anchor_wraper" v-show="show">
            <div class="anchor_icon" @click="handleChangeFold">
                <!-- <i class="el-icon-s-unfold" v-if="fold"></i> -->
                <img src="../../assets/images/table/right-open.png" alt="" v-if="fold">
                <img src="../../assets/images/table/right-close.png" alt="" v-else>
                <!-- <i v-else class="el-icon-s-fold"></i> -->
            </div>
            <div class="anchor_wraper_ul">
                <div class="line" :style="{height: lineHeight}"></div>
                <ul>
                    <li v-for="(i, index) of dataArr" @click="handleAnchorJump(i.id, index)" :key="i.id" :class="{select:currIndex === index }">
                        <div v-if="fold" class="anchor_item" :class="{active: currIndex === index}">{{i.name}}</div>
                        <!--                   <div v-if="(!fold && currIndex === index)" class="anchor_item" :class="{active: currIndex === index}">{{i.name}}</div>-->
                        <div class="anchor_item2">{{i.name}}</div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="anchor_mune" @click="handleChangeShow">
            <i class="el-icon-s-grid" v-if="!show"></i>
            <i class="el-icon-menu" v-else></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AnchorNav",
        data() {
            return {
                pos: [],
                currIndex: 0,
                fold: false,
                show: false
            }
        },
        props: {
            /**
             *  锚点数据
             *  arrData: [
             *   {
             *    name: '基础信息',
             *    id:'basicInfo'
             *  }]
             */
            dataArr:{
                type: Array,
                defualt: () => [],
                isRequired: true
            },
            // 出现滚动条的容器
            wapper: {
                type: String
            },
            // 需要加上的相对位移，主要是针对第一个锚点距离父容器的距离
            offsetTop: {
                type: Number,
                defualt: 0
            }
        },
        computed: {
            lineHeight(){
                let w = Number(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
                let line = Math.ceil(58*(w/1920));
                if(w<=1366){
                    // line= 10
                }
                return (this.dataArr.length - 1) * line + 'px'
            }
        },
        mounted() {
            this.whileFn()
        },
        methods: {
            handleChangeShow () {
                this.show = !this.show
            },
            whileFn () {
                this.$nextTick(() => {
                    const ele = document.querySelector(this.wapper) || window

                    const arr = this.dataArr.filter(i => {
                        if (i) return i
                    })
                    this.pos = arr.map(i => {
                        return {
                            top:this.$parent.$refs[i['id']] ? this.$parent.$refs[i['id']].offsetTop:0,
                            height: this.$parent.$refs[i['id']] ? this.$parent.$refs[i['id']].offsetHeight : 0
                        }
                    })
                    ele.addEventListener('scroll',() => {
                        const t = ele.scrollTop + this.offsetTop
                        this.pos.forEach((e, i) => {
                            if (t >= e.top && t < e.top + e.height ) {
                                this.currIndex = i
                            }
                        })
                    }, false)
                })
            },
            handleChangeFold(){
                this.fold = !this.fold
                this.$emit('changeFold', this.fold)
            },
            handleAnchorJump (id, index){
                this.$nextTick().then(() => {
                    this.currIndex = index
                    this.$parent.$refs[id].scrollIntoView({block: "start", behavior: "smooth"})
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .anchor_icon{
        font-size: 24px;
        margin-bottom: 10px;
        // i{
        //     font-size: 24px;
        //     position: relative;
        //     right: 10px;
        //     cursor: pointer;
        //     &:hover{
        //         color: #1890ff;
        //     }
        // }
        .icon-fold{
            display: inline-block;
            width: 24px;
            // height: 22px;
            cursor: pointer;
            position: relative;
            right: 10px;
        }

    }
    .anchor_mune{
        height: 40px;
        width: 40px;
        background: rgb(21, 126, 223);
        position: fixed;
        z-index: 10;
        bottom: 100px;
        right: 20px;
        border-radius: 20px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover{
            box-shadow: 0.071429rem 0.071429rem 0.714286rem 0.071429rem #409EFF !important;
        }
        i{
            font-size: 20px;
        }
    }
    .anchor_icon{
        font-size: 24px;
        margin-bottom: 10px;
        i{
            font-size: 24px;
            position: relative;
            right: 10px;
            cursor: pointer;
            &:hover{
                color: #1890ff;
            }
        }
        img{
            display: inline-block;
            width: 24px;
            // height: 22px;
            cursor: pointer;
            position: relative;
            right: 10px;
        }
    }
    .anchor_wraper{
        position: fixed;
        right: 25px;
        top: 50%;
        transform: translateY(-50%);
        .anchor_wraper_ul{
            position: relative;
            .line{
                width: 1px;
                background: #cdc7c7;
                position: absolute;
                top: 0;
                bottom: 0;
                z-index: 1;
                left: 4px;
            }
            .active{
                color:#157edf !important
            }
            li{
                width: 8px;
                height: 8px;
                background: #fff;
                border-radius: 12px;
                /*border:2px solid #9fb8f8;*/
                display: flex;
                z-index: 2;
                justify-content: center;
                align-items: center;
                margin-bottom: 50px;
                position: relative;
                cursor: pointer;
                background: rgb(177, 177, 177);
                box-shadow: 0.071429rem 0.071429rem 0.428571rem 0.142857rem #cccccc;
                &:hover{
                    color: #1890ff;
                    background: rgb(21, 126, 223);
                    box-shadow: 0.071429rem 0.071429rem 0.714286rem 0.071429rem #409EFF;
                    .anchor_item2{
                        display: block;
                        color: #1890ff;
                    }
                }
                &.select{
                    background: rgb(21, 126, 223) !important;
                    box-shadow: 0.071429rem 0.071429rem 0.714286rem 0.071429rem #409EFF !important;
                }
                .anchor_item, .anchor_item2{
                    color: #333;
                    position: absolute;
                    right: 40px;
                    width: 120px;
                    text-align: right;
                }
                .anchor_item2{
                    display: none;
                }
            }
        }
    }
</style>