<!--从OA系统去审核页面的过渡页-->
<template>
  <div v-loading.fullscreen.lock="true" element-loading-text="正在进入审核页面，请稍等....."></div>
</template>

<script>
import axios from "axios";
import { enum_store_bids } from "@/store/configs";
import config from "@/config/config";
const regDev = RegExp(/development/);
export default {
  name: "AuthPre",
  data () {
    return {
      requestUrl: regDev.test(process.env.NODE_ENV) ? "" : config.requestUrl,
    }
  },
  computed: {
    approveRecordId () {
      return this.$route.query.approveRecordId
    },
    trToken () {
      return this.$route.query.token
    }
  },
  created () {
    this.saveToken()
  },
  methods: {
    async saveToken () {
      var nowTime = new Date();
      nowTime = nowTime.getTime();
      this.userInfo();
      this.$store.commit("changeToken", this.trToken);
      this.$store.dispatch("addToken", this.trToken);
      // this.$store.dispatch("addloginData", res.data);//可能需要加，先不用管
      this.$store.dispatch("addloginTime", nowTime);
      this.goDetail()
    },
    async userInfo () {
      await axios.get(`${this.requestUrl}/guotou-auth/resource/userInfo`, {
        headers: {
          Authorization: "Bearer " + this.trToken
        }
      })
        .then(res => {
          this.$store.dispatch("addUserInfo", res.data);
        })
        .catch(error => {
          this.$message({
            type: "error",
            center: true,
            duration: 2000,
            message: "服务错误!"
          });
        });
    },
    async goDetail (row) {
      const res = await this.portService.waitsgetIds({
        approveRecordId: this.approveRecordId,
      });
      let arr = res.data.businessKey.split(":");
      res.data.approveRecordId = this.approveRecordId;
      this.$store.commit(enum_store_bids.MUTATIONS.CHANGE_WAITIDS_INFO, res.data);
      if (res && res.data) {
        this.$store.dispatch("updateBidInfo", res.data.bdGuid ? res.data.bdGuid : "").then((response) => {
          if (response) {
            if (row.shiXiangCode == "2008" || row.shiXiangCode == "2057" || row.shiXiangCode == "2078" || row.shiXiangCode == "2079") {
              //2008 招标公告 2057 资格预审公告 2078变更公告 2079 资格预审变更公告
              this.$router.push({
                path: "/dbsx/ggshDetail",
                query: { type: "look", orignFrom: "waits" },
              }); //招标公告
            } else if (row.shiXiangCode == "2009") {
              // 招标文件
              this.$router.push({
                path: "/steps/file-detail",
                query: { type: "look", orignFrom: "waits" },
              });
            } else if (row.shiXiangCode == "2017") {
              // 招标文件
              this.$router.push({
                path: "/steps/file-ys-detail",
                query: { type: "look", orignFrom: "waits" },
              });
            } else if (row.shiXiangCode == "2101") {
              // 标后的合同
              this.$router.push({
                path: "/steps/contractdetail",
                query: { type: "look", orignFrom: "waits" },
              });
            } else if (row.shiXiangCode == "2077") {
              // 标后的项目归档
              this.$router.push({
                path: "/steps/xiangmuziliaoguidang",
                query: { type: "look", orignFrom: "waits" },
              });
            } else if (row.shiXiangCode == "2012") {
              //中标候选人公示
              const key = res.data.businessKey;
              const guid = key.split(":")[1];
              this.$router.push({
                path: "/steps/zhongbiaohouxuanrengongshi",
                query: { type: "look", orignFrom: "waits", guid: guid },
              });
            } else if (row.shiXiangCode == "2105") {
              //确认中标人
              const key = res.data.businessKey;
              const guid = key.split(":")[1];
              if (this.$store.state.bids.bidInfo.isZb) {
                this.$router.push({
                  path: "/steps/zhongbiaoren",
                  query: { type: "look", orignFrom: "waits", guid: guid },
                });
              } else {
                //isJingjia
                if (this.isGt) {
                  this.$router.push({
                    path: "/steps/zhongbiaorenfz",
                    query: { type: "look", orignFrom: "waits", guid: guid },
                  });
                } else {
                  if (this.$store.state.bids.bidInfo.zbFangShi == 10) {
                    this.$router.push({
                      path: "/steps/zhongbiaorenfzygjj",
                      query: {
                        type: "look",
                        orignFrom: "waits",
                        guid: guid,
                      },
                    });
                  } else {
                    this.$router.push({
                      path: "/steps/zhongbiaorenfzyg",
                      query: {
                        type: "look",
                        orignFrom: "waits",
                        guid: guid,
                      },
                    });
                  }
                }
              }
            } else if (row.shiXiangCode == "2010") {
              // 文件变更补遗
              this.$router.push({
                path: "/steps/file-detail-bg",
                query: { type: "look", orignFrom: "waits" },
              });
            } else if (row.shiXiangCode == "2018") {
              // 预审文件变更补遗
              this.$router.push({
                path: "/steps/file-detail-bg-ys",
                query: { type: "look", orignFrom: "waits" },
              });
            } else if (row.shiXiangCode == "2019") {
              // 答疑澄清
              this.$router.push({
                path: "/steps/answer-clear-detail",
                query: { type: "look", orignFrom: "waits", type1: "old" },
              });
            } else if (row.shiXiangCode == "2001") {
              // 异议管理
              this.$router.push({
                path: "/steps/dissent-detail",
                query: { type: "look", orignFrom: "waits" },
              });
            } else if (row.shiXiangCode == "2103") {
              // 采购人采购委托
              this.$router.push({
                name: "purchaseCommissionDetailEdit",
                query: { checkout: true, orignFrom: "waits" },
                params: { id: arr[1] },
              });
            } else if (row.shiXiangCode == "2104") {
              // 委托单
              this.$router.push({
                name: "entrustDetail",
                query: { id: arr[1], resource: "queren" },
              });
            } else if (row.shiXiangCode == "2007") {
              // 邀请函
              this.$router.push({
                path: "/dbsx/invitationsh",
                query: { type: "look", orignFrom: "waits" },
              });
            } else if (row.shiXiangCode == "2063") {
              // 中标结果公示
              const key = res.data.businessKey;
              const guid = key.split(":")[1];
              this.$router.push({
                path: "/steps/zhongbiaojieguogongshi",
                query: { orignFrom: "waits", guid: guid },
              });
            } else if (row.shiXiangCode == "2022") {
              // 中标结果通知书公示
              const key = res.data.businessKey;
              const guid = key.split(":")[1];
              this.$router.push({
                path: "/steps/zhongbiaojieguotongzhishu",
                query: { orignFrom: "waits", guid: guid },
              });
            } else if (row.shiXiangCode == "2084") {
              // 复议
              const key = res.data.businessKey;
              const guid = key.split(":")[1];
              this.$router.push({
                path: "/steps/review-tender/create",
                query: { orignFrom: "waits", id: guid, type: "look" },
              });
            } else if (row.shiXiangCode == "2059") {
              // 文件模板
              const key = res.data.businessKey;
              const guid = key.split(":")[1];
              this.$router.push({
                path: "/informationresources/templateDetail",
                query: { orignFrom: "waits", id: guid, methods: "checkout" },
              });
            } else if (row.shiXiangCode == "2106") {
              // 采购项目补录
              const key = res.data.businessKey;
              const guid = key.split(":")[1];
              this.$router.push({
                path: "/projects/recordingProjectDetail",
                query: { orignFrom: "waits", id: guid, methods: "checkout" },
              });
            } else if (row.shiXiangCode == "2041") {
              // 专家申请
              const key = res.data.businessKey;
              const guid = key.split(":")[1];
              this.$router.push({
                path: "/dbsx/formcommitteesh",
                query: { orignFrom: "waits", guid: guid },
              });
            } else if (row.shiXiangCode == "2036") {
              // 招标失败
              const key = res.data.businessKey;
              const guid = key.split(":")[1];
              this.$router.push({
                path: "/steps/cgFailDetail",
                query: { orignFrom: "waits", id: guid, methods: "checkout" },
              });
            } else if (row.shiXiangCode == "2130") {
              // 标书费退还
              const key = res.data.businessKey;
              const guid = key.split(":")[1];
              this.applyGetApplyShenHeWay(guid, row.shiXiangCode);
            } else if (row.shiXiangCode == "2132") {
              // 平台服务费退还
              const key = res.data.businessKey;
              const guid = key.split(":")[1];
              this.applyGetApplyShenHeWay(guid, row.shiXiangCode);
            } else if (row.shiXiangCode == "2098") {
              // 投标保证金退还
              const key = res.data.businessKey;
              const guid = key.split(":")[1];
              this.$router.push({
                name: "marginTenderBackDetail",
                query: { orignFrom: "waits", id: guid },
              });
            } else if (row.shiXiangCode == "2108") {
              // 自查报告审核
              this.$router.push({
                name: "inspectionReportDetail",
                query: { checkout: true, orignFrom: "waits" },
                params: { id: arr[1] },
              });
            } else if (row.shiXiangCode == "2102") {
              // 采购合同
              this.$router.push({
                name: "purchaseContractDetailEdit",
                query: { checkout: true, orignFrom: "waits" },
                params: { id: arr[1] },
              });
            }
          }
        });
      }
    },

  }
}
</script>

<style scoped>
</style>