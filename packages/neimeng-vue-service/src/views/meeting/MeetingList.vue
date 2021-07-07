<template>
    <div class="meeting-list meeting-dash">
        <div class="global-title">
            <page-crumb :d="{breadcrumbList:breadcrumbList}"></page-crumb>
        </div>
        <div class="global-content">
            <div class="remark">
                <span class="yuyue"></span>
                <span class="yuyueRoom">预约会议室</span>
                <span class="free1"></span>
                <span class="freeRoom">空闲会议室</span>
                <el-tooltip placement="top" v-if="$store.state.logoType == 1">
                    <div slot="content">日期下方的数字代表当日已<br>预约会议室/当日空闲会议室，<br>您可以点击日期，<br>查看相应日期的会议预约情况</div>
                    <span class="tool"><img  class="info-tit-form" src="@/assets/help.png" alt=""/></span>
                </el-tooltip>
                <el-button class="back-btn" v-if="orign=='tender'" type="primary" size="small"
                           @click="$router.back(-1)">返回工作台
                </el-button>

                <el-switch v-if="!isGt"
                           class="fr"
                           style="display: block;margin-right: 40px;margin-top: 5px"
                           v-model="isDuZhan"
                           active-color="#ff4949"
                           inactive-color="#13ce66"
                           active-text="平台会议室"
                           inactive-text="自有会议室"
                           @change="changeType">
                </el-switch>
            </div>

            <full-calendar
                    :events="monthData"
                    class="test-fc"
                    first-day="1"
                    lang="zh"
                    @changeMonth="changeMonth"
                    @eventClick="eventClick"
                    @dayClick="dayClick"
                    @moreClick="moreClick"
                    @datesRender="handleDatesRender"
                    @getView="getView"
                    @eventRender="eventRender"
            ></full-calendar>

        </div>
    </div>
</template>
<script>
    import PageCrumb from "@/components/PageCrumb";
    import {FullCalendar} from "vue-fullcalendar";
    import moment from "moment";

    export default {
        components: {
            "full-calendar": require("vue-fullcalendar"),
            PageCrumb
        },
        data() {
            return {
                breadcrumbList: [
                    {label: "工作台", link: "/dashboard"},
                    {label: "会议预约情况", link: ""}
                ],
                monthData: [],
                isDuZhan: '1' //1自有会议室   2平台会议室
            };
        },
        computed: {
            orign() {
                return this.$route.query.from
            },
            isGt() {
                return this.$store.state.logoType == 1
            }
        },
        created() {
            // location.reload()
        },
        mounted() {
        },
        methods: {
            eventRender: function (event, element) {
                //title以HTML显示（换行）
                element.html(event.title);
            },
            deepClone(target) {
                // 定义一个变量
                let result;
                // 如果当前需要深拷贝的是一个对象的话
                if (typeof target === "object") {
                    // 如果是一个数组的话
                    if (Array.isArray(target)) {
                        result = []; // 将result赋值为一个数组，并且执行遍历
                        for (let i in target) {
                            // 递归克隆数组中的每一项
                            result.push(this.deepClone(target[i]));
                        }
                        // 判断如果当前的值是null的话；直接赋值为null
                    } else if (target === null) {
                        result = null;
                        // 判断如果当前的值是一个RegExp对象的话，直接赋值
                    } else if (target.constructor === RegExp) {
                        result = target;
                    } else {
                        // 否则是普通对象，直接for in循环，递归赋值对象的所有值
                        result = {};
                        for (let i in target) {
                            result[i] = this.deepClone(target[i]);
                        }
                    }
                    // 如果不是对象的话，就是基本数据类型，那么直接赋值
                } else {
                    result = target;
                }
                // 返回最终结果
                return result;
            },
            async getList(curDate) {
                let param = {};
                let isDuZhan = null
                if (!this.isGt) {
                    isDuZhan = this.isDuZhan ? '2' : '1'
                }
                param = {
                    startTime: moment(curDate).startOf("month").valueOf(),
                    endTime: moment(curDate).endOf("month").valueOf(),
                    isDuZhan: isDuZhan
                };

                const res = await this.portService.meetingList(param);
                if (res.data && res.data.length > 0) {
                    let allData = res.data;
                    let allData1 = this.deepClone(allData);
                    let allData2 = this.deepClone(allData);
                    allData1.forEach((item, index) => {
                        item.title = `${item.yuYueCount}`;
                        item.start = moment(item.currentTime).format("YYYY-MM-DD");
                        item.end = moment(item.currentTime).format("YYYY-MM-DD");
                        item.cssClass = "used";
                    });
                    allData2.forEach((item, index) => {
                        item.title = `${item.kongXianCount}`;
                        item.start = moment(item.currentTime).format("YYYY-MM-DD");
                        item.end = moment(item.currentTime).format("YYYY-MM-DD");
                        item.cssClass = "free";
                    });
                    allData1.push(...allData2);
                    this.monthData = [];
                    this.monthData.push(...allData1);
                }
            },
            changeType() {
                this.getList()
            },
            getView(data) {
            },
            handleDatesRender(arg) {
            },

            changeMonth(start, end, current) {
                this.getList(current);
            },
            eventClick(data) {
            },
            dayClick(date, allDay, jsEvent, view) {
                // this.$router.push("/meeting/detail")
                const curDate = moment(date).format("YYYY-MM-DD");
                this.$router.push({
                    path: "/meeting/detail",
                    query: {date: curDate, isDuZhan:this.isDuZhan ? '2' : '1'}
                });
            },
            moreClick() {
            },

            handleSizeChange() {
            },
            handleCurrentChange() {
            }
        }
    };
</script>
<style lang="scss" scoped>
    .back-btn {
        float: right;
        margin-right: 20px;
    }
</style>
<style lang="scss">
    .meeting-list {
        .day-number {
            height: 2px;
        }

        .full-calendar-body {
            width: 900px;
            margin: 0 auto;
        }

        // .full-calendar-body
        //   .dates
        //   .dates-events
        //   .events-week
        //   .events-day
        //   .day-number {
        // padding-top: 24px !important;
        // }
        .weeks .week {
            height: 55px;
            line-height: 55px;
            background: #F5F5F5;
        }

        .full-calendar-body .dates .dates-events .events-week {
            height: 80PX; /*NO*/
            .events-day {
                height: 80px !important;

                .event-box {
                    .event-item {
                        background-color: none;
                    }
                }
            }
        }

        .full-calendar-body .dates-bg .week-row {
            height: 80PX;

            .day-cell {
                position: relative;
                min-height: 80PX !important;

                .day-number {
                    position: absolute;
                    // top: 50%;
                    left: 50%;
                    transform: translateX(-50%);
                    // text-align: center;
                    // line-height: 80px!important;
                }
            }
        }

        .events-day {
            width: 100%;
            height: 80PX !important;
            position: relative;

        }

        .event-item.used {
            width: 50px;
            height: 20px !important;
            position: absolute;
            bottom: 4px;
            right: 50%;
            background-color: #409EFF !important;
            color: #ffffff !important;
            font-size: 15px !important; /*NO*/
            font-weight: 400 !important;
            text-align: center !important;
            line-height: 20px !important;
            padding: 0px !important;
            margin: 0 !important;
        }

        .event-item.free {
            color: #333333 !important;
            font-size: 15px !important; /*NO*/
            font-weight: 400 !important;
            background-color: rgba(228, 228, 228, 1) !important;
            position: absolute;
            bottom: 4px;
            left: 50%;
            width: 50px;
            height: 20px !important;
            box-sizing: border-box;
            margin: 0 !important;
            padding: 0px !important;
            line-height: 20px !important;
            text-align: center;
        }

        .full-calendar-body .dates .week-row {
            position: relative;

            .day-cell .day-number {
                font-size: 26px;
                text-align: center;
                // margin-top: 40px;
                // line-height: 80px;
            }
        }
    }

    // .full-calendar-body .dates .week-row .day-cell .day-number
    .meeting-dash {
        .full-calendar-header .header-center {
            margin: 20px 0 30px 0;

            span {
                font-size: 16px;
                font-weight: bold;
            }

            .prev-month {
                // color: #a0cfff;
                color: #000;

                &:hover {
                    color: #409eff;
                }
            }

            .next-month {
                color: #000;

                &:hover {
                    color: #409eff;
                }
            }
        }

        .full-calendar-body .dates .dates-events .events-week .events-day {
            min-height: 80PX !important;

            .event-box .event-item {
                overflow: visible;
                text-overflow: ellipsis;
                z-index: 999;
                font-size: 20px;
            }
        }

        .full-calendar-body .dates .week-row .day-cell {
            min-height: 80PX !important; /*NO*/
        }

        .remark {
            height: 30px;
            line-height: 30px;
            padding: 20px;

            .yuyue {
                width: 16px;
                height: 8px;
                display: inline-block;
                border-radius: 4px;
                background: #409eff;
                margin-right: 10px;
            }

            .free1 {
                width: 16px;
                height: 8px;
                display: inline-block;
                border-radius: 4px;
                background: #d9d9d9;
                margin-right: 8px;
                margin-left: 17px;
            }

            .yuyueRoom {
                font-size: 16px;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
            }

            .freeRoom {
                font-size: 14px;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
            }
        }
    }

</style>