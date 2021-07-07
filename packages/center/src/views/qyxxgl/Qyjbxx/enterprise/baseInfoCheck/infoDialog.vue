<template>
  <el-dialog
    title="查看核验结果"
    :append-to-body="true"
    :visible.sync="checkDialogVisible"
    width="1000px"
    :before-close="handleClose"
  >
    <div class="info_wrapper" v-if="tableData.qiYeName">
      <div v-if="loaded" class="info">
        <h1>平台注册信息</h1>
        <ul>
          <!-- <li>
            <span class="span-key">用户类型</span>
            <span>{{tableData.userType.userType}}</span>
          </li>-->
          <li>
            <span class="span-key">企业名称</span>
            <span>
              <el-tooltip
                class="item"
                effect="dark"
                :content="tableData.qiYeName.qiYeName"
                placement="top"
              >
                <div>{{tableData.qiYeName.qiYeName}}</div>
              </el-tooltip>
            </span>
          </li>
          <li>
            <span class="span-key">社会统一信用代码</span>
            <span>{{tableData.qiYeBH.qiYeBH}}</span>
          </li>
          <li>
            <span class="span-key">纳税人识别码</span>
            <span>{{tableData.naShuiRenShiBieMa.naShuiRenShiBieMa}}</span>
          </li>
          <li>
            <span class="span-key">企业邮箱</span>
            <span>
              <el-tooltip
                class="item"
                effect="dark"
                :content="tableData.qiYeEmail.qiYeEmail"
                placement="top"
              >
                <div>{{tableData.qiYeEmail.qiYeEmail}}</div>
              </el-tooltip>
            </span>
          </li>
          <li>
            <span class="span-key">注册资金</span>
            <span>{{tableData.zhuCeZiJin.zhuCeJinE}}</span>
          </li>
          <li>
            <span class="span-key">营业范围</span>
            <span>
              <el-tooltip
                class="item"
                effect="dark"
                :content="tableData.yeWuFanWei.yeWuFanWei"
                placement="top"
              >
                <div>{{tableData.yeWuFanWei.yeWuFanWei}}</div>
              </el-tooltip>
            </span>
          </li>
          <li>
            <span class="span-key">注册地址</span>
            <span>
              <el-tooltip
                class="item"
                effect="dark"
                :content="tableData.zhuCeDiZhi.zhuCeDiZhi"
                placement="top"
              >
                <div>{{tableData.zhuCeDiZhi.zhuCeDiZhi}}</div>
              </el-tooltip>
            </span>
          </li>
          <li>
            <span class="span-key">职工人数</span>
            <span>{{tableData.zhiGongNum.zhiGongNum}}</span>
          </li>
          <li>
            <span class="span-key">行业分类</span>
            <span>
              <el-tooltip
                class="item"
                effect="dark"
                :content="tableData.hangYeFenLei.hangYeFenLei"
                placement="top"
              >
                <div class="item-content">{{tableData.hangYeFenLei.hangYeFenLei}}</div>
              </el-tooltip>
            </span>
          </li>
          <li>
            <span class="span-key">法人</span>
            <span>{{tableData.fddbrName.fddbrName}}</span>
          </li>
        </ul>
      </div>
      <div v-if="loaded" class="info imfo2">
        <h1>天眼查对应信息</h1>
        <ul>
          <!-- <li>
            <span class="span-key">用户类型</span>
            <span>{{tableData.userType.userTypeForTianYan}}</span>
          </li>-->
          <li>
            <span class="span-key">企业名称</span>
            <span>
              <el-tooltip
                class="item"
                effect="dark"
                :content="tableData.qiYeName.qiYeNameForTianYan"
                placement="top"
              >
                <div>{{tableData.qiYeName.qiYeNameForTianYan}}</div>
              </el-tooltip>
            </span>
          </li>
          <li>
            <span class="span-key">社会统一信用代码</span>
            <span>{{tableData.qiYeBH.qiYeBHForTianYan}}</span>
          </li>
          <li>
            <span class="span-key">纳税人识别码</span>
            <span>{{tableData.naShuiRenShiBieMa.naShuiRenShiBieMaForTianYan}}</span>
          </li>
          <li>
            <span class="span-key">企业邮箱</span>
            <span>
              <el-tooltip
                class="item"
                effect="dark"
                :content="tableData.qiYeEmail.qiYeEmailForTianYan"
                placement="top"
              >
                <div>{{tableData.qiYeEmail.qiYeEmailForTianYan}}</div>
              </el-tooltip>
            </span>
          </li>
          <li>
            <span class="span-key">注册资金</span>
            <span>{{tableData.zhuCeZiJin.zhuCeJinEForTianYan}}</span>
          </li>
          <li>
            <span class="span-key">营业范围</span>
            <span>
              <el-tooltip
                class="item"
                effect="dark"
                :content="tableData.yeWuFanWei.yeWuFanWeiForTianYan"
                placement="top"
              >
                <div>{{tableData.yeWuFanWei.yeWuFanWeiForTianYan}}</div>
              </el-tooltip>
            </span>
          </li>
          <li>
            <span class="span-key">注册地址</span>
            <span>
              <el-tooltip
                class="item"
                effect="dark"
                :content="tableData.zhuCeDiZhi.zhuCeDiZhiForTianYan"
                placement="top"
              >
                <div>{{tableData.zhuCeDiZhi.zhuCeDiZhiForTianYan}}</div>
              </el-tooltip>
            </span>
          </li>
          <li>
            <span class="span-key">职工人数</span>
            <span>{{tableData.zhiGongNum.zhiGongNumForTianYan}}</span>
          </li>
          <li>
            <span class="span-key">行业分类</span>
            <span>
              <el-tooltip
                class="item"
                effect="dark"
                :content="tableData.hangYeFenLei.hangYeFenLeiForTianYan"
                placement="top"
              >
                <div>{{tableData.hangYeFenLei.hangYeFenLeiForTianYan}}</div>
              </el-tooltip>
            </span>
          </li>
          <li>
            <span class="span-key">法人</span>
            <span>{{tableData.fddbrName.fddbrNameForTianYan}}</span>
          </li>
        </ul>
      </div>
      <div v-if="loaded" class="info info-resault">
        <h1>核验结果</h1>
        <ul>
          <!-- <li><span  :class="formID.userType ? 'el-icon-check' : 'el-icon-close'"></span></li> -->
          <li>
            <span :class="formID.qiYeName ? 'el-icon-check' : 'el-icon-close'"></span>
          </li>
          <li>
            <span :class="formID.qiYeBH ? 'el-icon-check' : 'el-icon-close'"></span>
          </li>
          <li>
            <span :class="formID.naShuiRenShiBieMa ? 'el-icon-check' : 'el-icon-close'"></span>
          </li>
          <li>
            <span :class="formID.qiYeEmail ? 'el-icon-check' : 'el-icon-close'"></span>
          </li>
          <li>
            <span :class="formID.zhuCeZiJin ? 'el-icon-check' : 'el-icon-close'"></span>
          </li>
          <li>
            <span :class="formID.yeWuFanWei ? 'el-icon-check' : 'el-icon-close'"></span>
          </li>
          <li>
            <span :class="formID.zhuCeDiZhi ? 'el-icon-check' : 'el-icon-close'"></span>
          </li>
          <li>
            <span :class="formID.zhiGongNum ? 'el-icon-check' : 'el-icon-close'"></span>
          </li>
          <li>
            <span :class="formID.hangYeFenLei ? 'el-icon-check' : 'el-icon-close'"></span>
          </li>
          <li>
            <span :class="formID.fddbrName ? 'el-icon-check' : 'el-icon-close'"></span>
          </li>
        </ul>
      </div>
    </div>
    <div v-else style="height:200px;line-height:200px;text-align:center;color:red;font-size:20px;">在天眼查中未查到该单位信息</div>
  </el-dialog>
</template>
<script>
import { compreeInfo } from "@/service/enterpriseInfo";
export default {
  name: "checkInfo",
  props: {
    formID: {
      type: Object
    }
  },
  data() {
    return {
      checkDialogVisible: true,
      tableData: {
        userType: ""
      },
      loaded: false
    };
  },
  created() {
    const userQiYeGuid = this.$route.query.userQiYeGuid;
    compreeInfo({ userQiYeGuid }).then(res => {
      if (res.code === 1) {
        this.tableData = res.data;
        this.loaded = true;
      }
    });
  },
  methods: {
    handleCheckInfoOK() {
      this.handleClose();
    },
    handleClose() {
      this.$parent.infoDialogVisible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.info_wrapper {
  height: 520px;
  overflow: auto;
  border-top: 1px solid #eee;
  .el-icon-check {
    color: green;
  }
  .el-icon-close {
    color: red;
  }
}
.el-dialog__body {
  padding-top: 0px !important;
}
.info_wrapper {
  display: flex;
  h1 {
    height: 50px;
    font-size: 14px;
    line-height: 50px;
    border-bottom: 2px solid #ccc;
  }
  .info {
    width: 440px;
    box-sizing: border-box;
    padding: 0px 10px;
    height: 490px;
    li {
      span {
        flex-shrink: 0;
      }
      span:last-child {
        padding-left: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .imfo2 {
    border: 1px solid #eee;
    border-top: none;
    border-bottom: none;
    li {
      span:last-child {
        padding-left: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .info-resault {
    width: 100px;
    box-sizing: border-box;
    li {
      text-align: center;
      span {
        width: 100%;
        font-size: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &.actived {
          color: green;
        }
        &.error {
          color: red;
        }
      }
    }
  }
  li {
    border-bottom: 1px solid #eee;
    display: flex;
    height: 40px;
    span {
      height: 40px;
      line-height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .span-key {
      text-align: right;
      padding-right: 10px;
      width: 140px;
      background: #f9f9f9;
      display: block;
    }
    .span-value {
      padding-left: 10px;
    }
  }
}
.item-content {
  height: 100%;
  width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item {
  height: 100%;
  width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
