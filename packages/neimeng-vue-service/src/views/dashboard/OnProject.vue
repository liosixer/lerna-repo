<template>
  <el-card class="cus-card on-projects">
    <template #header>
      <div class="card-header">
        <span>进行中的项目</span>
        <div class="tab-groups">
          <div
            v-for="(item, index) in tabs"
            :key="index"
            class="tab-item"
            :class="[
              item.code == tabValue ? 'active' : '',
              index == 0
                ? 'tab-item__first'
                : index == tabs.length - 1
                ? ' tab-item__last'
                : ' tab-item__center',
            ]"
            @click="handleTabClick(item.code)"
          >
            <img
              :src="
                require(`@/assets/images/todos/${
                  item.code == tabValue ? item.img + '-on' : item.img
                }.png`)
              "
            />{{ item.name }}
          </div>
        </div>
        <el-button
          class="card-header-button"
          type="text"
          @click="$router.push('/project/mine')"
          >更多<i class="el-icon-arrow-right"></i
        ></el-button>
      </div>
    </template>
    <div class="card-body">
      <div class="project-cell" v-for="item in onProjects" :key="item.id">
        <div class="cell-bd">
          <p v-if="tabValue == 1" class="text-overflow project-title">
            {{ item.projectName }}
          </p>
          <p v-if="tabValue == 2" class="text-overflow project-title">
            {{ item.projectName }}
          </p>
          <p v-if="tabValue == 3" class="text-overflow project-title">
            {{ item.resourceNo }}
          </p>
          <div class="cell-bd__info">
            <span class="project-no">
              <img
                src="@/assets/images/frame/file-1.png"
                style="margin-right: 5PX; width: 1rem;"
              />
              {{ tabs[tabValue - 1].name }}
            </span>
            <span class="project-period" v-if="tabValue == 3">
              {{ _systemFrom(item.systemFrom) }}
            </span>
            <span class="project-period">
              {{
                tabValue == 3
                  ? _tradeType(item.tradeType)
                  : _zbFangshi(item.zbFangshi)
              }}
            </span>
            <span class="project-period">
              <i class="el-icon-s-operation"></i
              >{{ tabValue == 3 ? '资源阶段' : '当前阶段' }}：<span>{{
                tabValue == 3
                  ? _resourceStage(item.resourceStage)
                  : item.bdStatus
              }}</span>
            </span>
          </div>
        </div>
        <!-- TODO 挂牌结束时间or拍卖开始时间or开标时间 -->
        <div v-if="tabValue == 3" class="cell-ft">
          <div class="cell-ft__hd">
            挂牌结束时间
          </div>
          <div class="cell-ft__label">
            <span class="cell-ft__unit">{{
              item.kbTime | dateFormater('YYYY-MM-DD HH:mm:ss')
            }}</span>
          </div>
        </div>
        <div v-else class="cell-ft">
          <div class="cell-ft__hd">
            开标时间
          </div>
          <div class="cell-ft__label">
            <span class="cell-ft__unit">{{
              item.kbTime | dateFormater('YYYY-MM-DD HH:mm:ss')
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import {
  businessFrom,
  systemFrom,
  zbFangshi,
  resourceStage,
  tradeType,
} from '@/config/data.config';
import { getMyProject } from './service';
export default {
  name: 'OnProject',
  data() {
    return {
      onProjects: [],
      tabs: Object.freeze(businessFrom),
      tabValue: 1,
    };
  },
  computed: {
    _systemFrom() {
      return (from) => {
        const obj = this._.find(systemFrom, { code: from * 1 });
        return obj ? obj.name : '';
      };
    },
    _zbFangshi() {
      return (fangshi) => {
        const obj = this._.find(zbFangshi, { code: fangshi * 1 });
        return obj ? obj.name : '';
      };
    },
    _resourceStage() {
      return (stage) => {
        const obj = this._.find(resourceStage, { code: stage * 1 });
        return obj ? obj.name : '';
      };
    },
    _tradeType() {
      return (type) => {
        const obj = this._.find(tradeType, { code: type * 1 });
        return obj ? obj.name : '';
      };
    },
  },
  created() {
    this.getProjects();
  },
  methods: {
    handleTabClick(code) {
      if (this.tabValue !== code) {
        this.tabValue = code;
        this.getProjects();
      }
    },
    async getProjects() {
      const { page } = await getMyProject({
        currPage: 1,
        pageSize: 5,
        businessFrom: this.tabValue,
      });
      this.onProjects = page.list;
    },
  },
};
</script>

<style lang="scss" scoped>
.on-projects {
  margin-top: 20px;
  height: calc(100% - 220px);
  .tab-groups {
    margin-left: 48px;
  }
}
.card-body {
  .project-cell {
    padding: 24px 20px 16px;
    position: relative;
    display: flex;
    &:first-child {
      padding-top: 0;
    }
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background-color: #f0f0f0;
      transform: scaleY(0.5);
    }
    .cell-bd {
      flex: 1;
      text-align: left;
      overflow: hidden;
      .project-title {
        font-size: 16px;
        font-weight: 600;
        color: #144fba;
        line-height: 24px;
      }
      .cell-bd__info {
        margin-top: 10px;
        font-size: 13px;
        color: rgba(0, 0, 0, 0.45);
        .project-period {
          margin-left: 24px;
          span {
            color: #144fba;
          }
          i {
            margin-right: 5px;
          }
        }
      }
    }
    .cell-ft {
      margin-left: 40px;
      .cell-ft__hd {
        display: flex;
        align-items: baseline;
        color: rgba(0, 0, 0, 0.85);
      }
      .cell-ft__value {
        font-size: 24px;
        font-weight: bold;
      }
      .cell-ft__unit {
        font-size: 13px;
      }
      .cell-ft__label {
        margin-top: 10px;
        font-size: 13px;
        color: rgba(0, 0, 0, 0.45);
        line-height: 18px;
      }
    }
  }
}
</style>
