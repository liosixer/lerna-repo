<template>
  <div class="trade-distribute">
    <div class="tag-wrap">各交易类型分布</div>
    <div class="main-wrap">
      <div class="business-wrap">
        <div class="business-title">
          工程建设
        </div>
        <div class="business-label">
          交易量<span>{{ values.gcjs.jyl }}</span
          >个
        </div>
        <div class="business-label">
          交易额<span>{{ values.gcjs.jye }}</span
          >亿元
        </div>
      </div>

      <div class="business-wrap">
        <div class="business-title">
          政府采购
        </div>
        <div class="business-label">
          交易量<span>{{ values.gcjs.jyl }}</span
          >个
        </div>
        <div class="business-label">
          交易额<span>{{ values.gcjs.jye }}</span
          >亿元
        </div>
      </div>

      <div class="business-wrap">
        <div class="business-title">
          自然资源
        </div>
        <div class="business-label">
          交易量<span>{{ values.gcjs.jyl }}</span
          >个
        </div>
        <div class="business-label">
          交易额<span>{{ values.gcjs.jye }}</span
          >亿元
        </div>
      </div>

      <div class="business-wrap">
        <div class="business-title">
          产权交易
        </div>
        <div class="business-label">
          交易量<span>{{ values.gcjs.jyl }}</span
          >个
        </div>
        <div class="business-label">
          交易额<span>{{ values.gcjs.jye }}</span
          >亿元
        </div>
      </div>

      <div class="business-wrap">
        <div class="business-title">
          其它交易
        </div>
        <div class="business-label">
          交易量<span>{{ values.gcjs.jyl }}</span
          >个
        </div>
        <div class="business-label">
          交易额<span>{{ values.gcjs.jye }}</span
          >亿元
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TradeDistribute',
  props: {
    values: {
      required: true,
      type: Object,
      default: {},
    },
  },
};
</script>

<style lang="scss" scoped>
.trade-distribute {
  display: flex;
  height: 180px;
  margin: 20px 0;
  border-radius: 0 12px 12px 0;
  .tag-wrap {
    width: 40px;
    -webkit-writing-mode: vertical-rl;
    writing-mode: vertical-rl;
    letter-spacing: 4px;
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    line-height: 40px;
    text-align: center;
    background: linear-gradient(180deg, #314d73 0%, #73889d 100%);
    border-radius: 24px 0px 0px 24px;
  }
  .main-wrap {
    flex: 1;
    height: 100%;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .business-wrap {
    .business-title {
      width: 88px;
      height: 24px;
      background: #1875f0;
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 400;
      color: #ffffff;
      margin-bottom: 8px;
      line-height: 20px;
    }
    .business-label {
      display: flex;
      align-items: baseline;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.45);
      line-height: 36px;
      span {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.85);
        margin-left: 8px;
      }
    }
  }
}
</style>
