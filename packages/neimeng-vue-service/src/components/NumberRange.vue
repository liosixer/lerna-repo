<template>
  <div class="number-wrap">
    <el-col :span="11">
      <el-form-item prop="rangeStart">
        <el-input
          v-model.trim="modelVal[0]"
          placeholder="请输入"
          style="width: 100%"
          oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
          @blur="(e) => handleInput(0, e)"
        ></el-input>
      </el-form-item>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-form-item prop="rangeEnd">
        <el-input
          v-model.trim="modelVal[1]"
          placeholder="请输入"
          style="width: 100%"
          oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
          @blur="(e) => handleInput(1, e)"
        ></el-input>
      </el-form-item>
    </el-col>
  </div>
</template>
<script>
export default {
  name: 'NumberRange',
  model: {
    prop: 'modelVal',
    event: 'change',
  },
  props: {
    modelVal: {
      type: Array,
      default: [null, null],
    },
  },
  watch: {
    modelVal(value) {
      this.$emit('change', value);
    },
  },
  methods: {
    handleInput(index, e) {
      this.modelVal[index] = e.target.value * 1;
      const otherIndex = (index + 1) % 2;
      if (e.target.value && this.modelVal[otherIndex]) {
        if (index === 0 && this.modelVal[1] < this.modelVal[0]) {
          this.$set(this.modelVal, otherIndex, this.modelVal[index]);
        }
        if (index === 1 && this.modelVal[0] > this.modelVal[1]) {
          this.$set(this.modelVal, otherIndex, this.modelVal[index]);
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.line {
  text-align: center;
}
.number-wrap {
  ::v-deep.el-form-item--small.el-form-item {
    margin-bottom: 0;
  }
}
</style>
