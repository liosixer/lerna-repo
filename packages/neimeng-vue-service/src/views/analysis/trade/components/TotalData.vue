<template>
  <div class="total-data">
    <div class="data-item">
      <img
        class="icon"
        src="../../../../assets/images/analysis/icon-jyzl.png"
      />
      <div>
        <p class="data-value">{{ values.jyzl }}</p>
        <p class="data-label">交易总量（宗）</p>
      </div>
    </div>
    <div class="data-item">
      <img
        class="icon"
        src="../../../../assets/images/analysis/icon-jyze.png"
      />
      <div>
        <p class="data-value">{{ values.jyze }}</p>
        <p class="data-label">交易总额（亿元）</p>
      </div>
    </div>
    <div class="data-item">
      <img
        class="icon"
        src="../../../../assets/images/analysis/icon-jyzj.png"
      />
      <div>
        <p class="data-value">{{ values.jyzj }}</p>
        <p class="data-label">节约资金（亿元）</p>
      </div>
    </div>
    <div class="data-item">
      <img
        class="icon"
        src="../../../../assets/images/analysis/icon-zzzj.png"
      />
      <div>
        <p class="data-value">{{ values.zzzj }}</p>
        <p class="data-label">增资资金（亿元）</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TotalData',
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
.data-item {
  padding: 32px;
  background-color: #ffffff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
  .icon {
    width: 64px;
    height: 64px;
    margin-right: 16px;
  }
  .data-value {
    font-size: 30px;
    font-weight: 600;
    color: #1875f0;
    margin-bottom: 8px;
    line-height: 30px;
  }
  .data-label {
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
    line-height: 22px;
  }
}
</style>
