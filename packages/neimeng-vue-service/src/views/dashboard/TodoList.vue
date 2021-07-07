<template>
  <div class="todos">
    <div class="todos-hd">
      <span class="title">待办事项</span>
      <div class="cells">
        <div class="cell">
          <img
            src="../../assets/images/frame/dashboard-untreated.png"
            alt="未处理事项"
          />
          <div class="cell-bd">
            <span>{{ recordCount.pjCount }}</span>
            <span>工程建设</span>
          </div>
        </div>
        <div class="cell">
          <img
            src="../../assets/images/frame/dashboard-processed.png"
            alt="已处理事项"
          />
          <div class="cell-bd">
            <span>{{ recordCount.gpCount }}</span>
            <span>政府采购</span>
          </div>
        </div>
        <div class="cell">
          <img
            src="../../assets/images/frame/dashboard-total.png"
            alt="本月累计"
          />
          <div class="cell-bd">
            <span>{{ recordCount.reCount }}</span>
            <span>自然资源</span>
          </div>
        </div>
      </div>
      <router-link class="icon-btn" :to="{ path: '/todos' }">
        <span class="btn-detail">
          查看详情 <i class="el-icon-arrow-right"></i>
        </span>
      </router-link>
    </div>
    <div class="todos-bd">
      <el-carousel
        v-if="todos.length > 0"
        height="110PX"
        :autoplay="false"
        indicator-position="none"
        arrow="always"
        ref="carousel"
      >
        <el-carousel-item v-for="(projects, index) in todos" :key="index">
          <div class="projects-wrap">
            <el-row :gutter="40" style="flex: 1">
              <el-col
                :span="8"
                class="project-item"
                v-for="item in projects"
                :key="item.guid"
              >
                <template v-if="item.guid">
                  <div class="item-title">
                    <span class="dot"></span
                    ><span class="text-overflow">{{ item.businessName }}</span>
                  </div>
                  <div class="item-bd">
                    {{ _businessFrom(item.businessFrom) }} -
                    {{ _businessType(item.businessType) }} -
                    {{ item.submitTime | timestampChange('noHour') }}
                  </div>
                  <el-button
                    type="primary"
                    round
                    @click="
                      $router.push({
                        path: '/todos/detail',
                        query: {
                          src: `https://www.tianqi.com/plugin/list.html?muban_id=1&style=&id=${item.businessNo}`,
                        },
                      })
                    "
                    >处理</el-button
                  >
                </template>
              </el-col>
            </el-row>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { getApproverecord, getApproveRecordCount } from './service';
import { businessFrom, businessType } from '@/config/data.config';
export default {
  name: 'TodoList',
  data() {
    return {
      todos: [],
      recordCount: {
        pjCount: 0,
        gpCount: 0,
        reCount: 0,
      },
    };
  },
  computed: {
    _businessFrom() {
      return (from) => {
        const obj = this._.find(businessFrom, { code: from * 1 });
        return obj ? obj.name : '';
      };
    },
    _businessType() {
      return (type) => {
        const obj = this._.find(businessType, { code: type * 1 });
        return obj ? obj.name : '';
      };
    },
  },
  created() {
    this.getTodos();
    this.getApproveRecordCount();
  },
  methods: {
    async getTodos() {
      const { page } = await getApproverecord({ currPage: 1, pageSize: 9 });

      this.todos = _.chunk(page.list, 3);
    },
    async getApproveRecordCount() {
      let { data } = await getApproveRecordCount();
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
      this.recordCount = data;
    },
  },
};
</script>

<style lang="scss" scoped>
.todos {
  width: 100%;
  height: 200px;
  border-radius: 16px;
  background-size: cover;
  background-image: url('../../assets/images/frame/header-bg.png');
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.todos-hd {
  height: 90px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  color: #ffffff;
  .title {
    font-size: 24px;
    font-weight: bold;
    line-height: 26px;
    margin-left: 14px;
    margin-right: 100px;
  }
  .cells {
    flex: 1;
    display: flex;
    justify-content: space-around;
    .cell {
      display: flex;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
      .cell-bd {
        display: flex;
        flex-direction: column;
        span {
          &:first-child {
            flex: 1;
            display: flex;
            align-items: flex-start;
            font-size: 24px;
            font-weight: bold;
            color: #ffffff;
          }
          &:last-child {
            font-size: 13px;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.85);
            line-height: 18px;
          }
        }
      }
    }
  }
  .btn-detail {
    margin-left: 30px;
    width: 100px;
    height: 30px;
    background: #ffffff;
    border-radius: 20px;
    color: #17469c;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    i {
      margin-left: 4px;
    }
  }
}
.todos-bd {
  height: 110px;
  background: #ffffff;
  box-shadow: 0px -5px 16px 0px rgba(14, 26, 37, 0.05);
  border-radius: 24px 24px 12px 12px;
  ::v-deep .el-carousel__arrow {
    top: 70%;
    width: 24px;
    height: 24px;
    background-color: #ffffff;
    border: 1px solid #e6e8ea;
    color: #777777;
    font-weight: bold;
    &:hover {
      border-color: rgba(20, 79, 186, 0.6);
      .el-icon-arrow-left,
      .el-icon-arrow-right {
        color: #144fba;
      }
    }
  }
  ::v-deep .el-carousel__arrow--left {
    left: initial;
    right: 90px;
  }
  ::v-deep.el-carousel__arrow--right {
    right: 55px;
  }
  .projects-wrap {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px 0 25px;
    text-align: left;
    .item-title {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.85);
      position: relative;
      & > span {
        display: block;
      }
      .dot {
        position: absolute;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: #144fba;
        top: 50%;
        transform: translateY(-50%);
        left: -10px;
      }
    }
    .item-bd {
      color: rgba(0, 0, 0, 0.45);
      font-size: 13px;
      line-height: 20px;
      margin-bottom: 8px;
    }
    ::v-deep .el-button--small {
      padding: 6px 15px;
      height: auto;
    }
  }
}
</style>
