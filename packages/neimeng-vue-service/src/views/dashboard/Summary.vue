<template>
  <div class="summary-wrap">
    <div class="info-wrap">
      <div class="userinfo-wrap">
        <img :src="avatar" alt="头像" @error="handleError" class="avatar" />
        <div class="userinfo-bd">
          <p class="text-overflow greeting">{{ greeting }}</p>
          <div class="weather-wrap">
            <iframe
              width="180"
              scrolling="no"
              height="25"
              frameborder="0"
              allowtransparency="true"
              src="https://i.tianqi.com/?c=code&a=getcode&id=26&icon=1"
            ></iframe>
          </div>
        </div>
      </div>
      <div class="bidinfo-wrap">
        <div class="bidinfo-cell">
          <span class="title">区本级<i></i></span>
          <p>今日开标<span>16</span></p>
          <!-- <p>今日评标<span>7</span></p> -->
        </div>
        <div class="bidinfo-cell">
          <span class="title">盟市<i></i></span>
          <p>今日开标<span>16</span></p>
          <!-- <p>今日评标<span>7</span></p> -->
        </div>
      </div>
    </div>
    <div class="calendar-title">
      <span>开标日历</span>
      <el-button class="more-button" type="text" @click="loadMore"
        >更多<i class="el-icon-arrow-right"></i
      ></el-button>
    </div>
    <el-calendar
      :range="weekRange"
      v-model="selectedDate"
      class="week-calendar"
    >
      <template #dateCell="{date, data}">
        <el-badge is-dot class="date-dot" v-if="hasBids.includes(data.day)">
          <p class="date">{{ dateFormat(date, 'D') }}</p>
        </el-badge>
        <p class="date" v-else>{{ dateFormat(date, 'D') }}</p>
      </template>
    </el-calendar>
    <div class="bid-cells">
      <div
        class="bid-cell"
        :class="{ selected: item.id == bidSelected }"
        v-for="item in bids"
        :key="item.id"
        @click="bidSelected = item.id"
      >
        <div class="bid-icon"></div>
        <div class="bid-cell__bd">
          <p class="bid-cell__time">10:00</p>
          <p class="bid-cell__desc">
            深圳阳光采购依云华府建筑一期高低压配电工程9: 00开标会.
          </p>
        </div>
      </div>
    </div>
    <purchase-project
      ref="purchaseProject"
      :visible="showPurchaseProject"
      :onCancel="() => (showPurchaseProject = false)"
    />
  </div>
</template>

<script>
import _ from 'lodash';
import moment from 'moment';
import util from '@/utils/utils';
import PurchaseProject from './PurchaseProject.vue';
import { getKbList } from './service';
let timerInterval = null;

export default {
  name: 'Summary',
  components: { PurchaseProject },
  data() {
    return {
      showPurchaseProject: false,
      currentUser: this.$store.state.frame.userType,
      greeting: '',
      nowHour: new Date().getHours(),
      avatar: '',
      weekRange: [],
      selectedDate: '',
      hasBids: [],
      bids: [],
      bidSelected: 0,
    };
  },
  computed: {
    touxiangImgWatch() {
      return this.$store.state.frame.userType.userHeadImage;
    },
  },
  created() {
    timerInterval = setInterval(() => {
      this.nowHour = new Date().getHours();
    }, 1000 * 60);

    moment.locale('zh-cn', {
      week: {
        dow: 1, // 星期一是一周的第一天。
      },
    });
    const startWeekDate = moment()
      .startOf('week')
      .format('YYYY-MM-DD');
    const endWeekDate = moment()
      .endOf('week')
      .format('YYYY-MM-DD');

    this.weekRange = [startWeekDate, endWeekDate];
    this.selectedDate = moment().format('YYYY-MM-DD');

    this.hasBids = ['2021-04-06', '2021-04-08'];

    this.getBids();
  },
  destroyed() {
    clearInterval(timerInterval);
  },
  watch: {
    nowHour: {
      handler(newVal) {
        let interval = '';
        if (_.inRange(newVal, 0, 6)) interval = '凌晨好';
        else if (_.inRange(newVal, 6, 8)) interval = '早上好';
        else if (_.inRange(newVal, 8, 11)) interval = '上午好';
        else if (_.inRange(newVal, 11, 14)) interval = '中午好';
        else if (_.inRange(newVal, 14, 17)) interval = '下午好';
        else if (_.inRange(newVal, 17, 19)) interval = '傍晚好';
        else if (_.inRange(newVal, 19, 24)) interval = '晚上好';
        else interval = '';
        this.greeting = `${interval}, ${this.currentUser.accountName}`;
      },
      immediate: true,
    },
    touxiangImgWatch: {
      handler(newVal, oldVal) {
        if (oldVal != newVal) {
          util
            .getDownSrc(this.$store.state.frame.userType.userHeadImage)
            .then((res) => {
              this.avatar = res;
            });
        }
      },
      immediate: true,
    },
  },
  methods: {
    handleError(e) {
      e.target.src = require('../../assets/images/frame/touxiang.png');
    },
    dateFormat(val, format) {
      return moment(val).format(format);
    },
    loadMore() {
      this.$refs.purchaseProject.getList();
      this.showPurchaseProject = true;
    },
    async getBids() {
      const kbStartTime = moment()
        .startOf('date')
        .valueOf();
      const kbEndTime = moment()
        .endOf('date')
        .valueOf();
      console.log(kbStartTime, kbEndTime);
      const res = await getKbList({ kbStartTime, kbEndTime });
      const bids = [
        {
          id: 0,
          time: '10:00',
          title: '深圳阳光采购依云华府建筑一期高低压配电工程9: 00开标会.',
        },
        {
          id: 1,
          time: '10:00',
          title: '深圳阳光采购依云华府建筑一期高低压配电工程9: 00开标会.',
        },
        {
          id: 2,
          time: '10:00',
          title: '深圳阳光采购依云华府建筑一期高低压配电工程9: 00开标会.',
        },
        {
          id: 3,
          time: '10:00',
          title: '深圳阳光采购依云华府建筑一期高低压配电工程9: 00开标会.',
        },
        {
          id: 4,
          time: '10:00',
          title: '深圳阳光采购依云华府建筑一期高低压配电工程9: 00开标会.',
        },
        {
          id: 5,
          time: '10:00',
          title: '深圳阳光采购依云华府建筑一期高低压配电工程9: 00开标会.',
        },
        {
          id: 6,
          time: '10:00',
          title: '深圳阳光采购依云华府建筑一期高低压配电工程9: 00开标会.',
        },
      ];
      this.bidSelected = bids[0].id;
      this.bids = bids;
    },
  },
};
</script>

<style lang="scss" scoped>
.summary-wrap {
  height: 100%;
}
.info-wrap {
  padding: 5px 10px;
  padding-bottom: 30px;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.06);
    transform: scaleY(0.5);
  }
}
.userinfo-wrap {
  display: flex;
  align-items: center;
  .avatar {
    width: 64px;
    height: 64px;
  }
  .userinfo-bd {
    flex: 1;
    margin-left: 10px;
    overflow: hidden;
    text-align: left;
    .greeting {
      font-size: 17px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.85);
      line-height: 24px;
      padding-left: 15px;
    }
  }
  .weather-wrap {
    margin-top: 5px;
    height: 30px;
    border-radius: 50px;
    padding-left: 15px;
    background-color: rgba(33, 61, 94, 0.24);
    display: flex;
    align-items: center;
  }
}
.bidinfo-wrap {
  .bidinfo-cell {
    margin-top: 24px;
    display: flex;
    align-items: center;
    .title {
      color: #144fba;
      font-size: 16px;
      font-weight: bold;
      width: 50px;
      height: 22px;
      text-align: justify;
      & > i {
        display: inline-block;
        padding-left: 100%;
      }
    }
    p {
      margin-left: 20px;
      color: rgba(0, 0, 0, 0.65);
      font-size: 13px;
      display: flex;
      align-items: center;
      &:last-child {
        margin-left: 30px;
      }
      span {
        margin-left: 5px;
        font-size: 24px;
        color: rgba(0, 0, 0, 0.85);
      }
    }
  }
}
.calendar-title {
  display: flex;
  align-items: center;
  padding: 15px 10px 0;
  span {
    color: rgba(0, 0, 0, 0.45);
    &:first-child {
      font-size: 16px;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.85);
      line-height: 22px;
    }
  }
  .more-button {
    margin-left: auto;
    color: rgba(0, 0, 0, 0.45);
  }
}
.week-calendar {
  ::v-deep {
    .el-calendar__header {
      display: none;
    }
    td {
      pointer-events: none;
    }
  }

  ::v-deep .el-calendar-table {
    thead {
      th {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
      }
    }
    tbody {
      tr {
        td {
          border: 0;
          .el-calendar-day:hover {
            background: linear-gradient(216deg, #185fe0 0%, #244abb 100%);
            border-radius: 18px;
            color: #ffffff;
          }
          &.is-selected {
            background: linear-gradient(216deg, #185fe0 0%, #244abb 100%);
            border-radius: 18px;
            color: #ffffff;
            .date-dot {
              .is-dot {
                background-color: #ffffff !important;
              }
            }
          }
        }
        .el-calendar-day {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 66px;
        }
      }
    }
  }

  .date {
    font-size: 16px;
  }

  .date-dot {
    ::v-deep .is-dot {
      right: 0;
      background-color: #ffa837;
      border: none;
    }
  }
}
.bid-cells {
  padding: 0 10px;
  overflow-y: scroll;
  height: calc(100vh - 580px);
  .bid-cell {
    padding: 12px 16px;
    display: flex;
    cursor: pointer;
    &:hover {
      background-color: #144fba;
      border-radius: 10px;
      .bid-icon {
        background-image: url('../../assets/images/frame/cube-on.png');
      }
      .bid-cell__bd {
        color: rgba(255, 255, 255, 0.85);
      }
    }
    .bid-icon {
      width: 23px;
      height: 26px;
      background-image: url('../../assets/images/frame/cube-off.png');
      background-size: cover;
      margin-right: 12px;
    }
    .bid-cell__bd {
      flex: 1;
      color: rgba(0, 0, 0, 0.85);
      .bid-cell__time {
        font-size: 14px;
        line-height: 18px;
      }
      .bid-cell__desc {
        line-height: 22px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
  }
}
</style>
