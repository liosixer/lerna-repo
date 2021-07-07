<template>
  <div class="card-header">
    <div class="card-header-item">
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
          @click="btnTab(item.code)"
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
      <div class="tools-group">
        <el-button type="text" @click="onSearch">
          <img
            src="../../../assets/images/frame/filter.png"
            class="i-filter"
          />高级筛选
        </el-button>
      </div>
    </div>
    <div class="card-header-item">
      <div class="tab-groups">
        <div
          v-for="(item, index) in tabSubs"
          :key="index"
          class="tab-item"
          :class="[
            item.code == tabSubValue ? 'active' : '',
            index == 0
              ? 'tab-item__first'
              : index == tabSubs.length - 1
              ? ' tab-item__last'
              : ' tab-item__center',
          ]"
          @click="btnTabSub(item.code)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardHeader',
  props: {
    tabs: {
      type: Array,
      default: () => [],
      required: true,
    },
    tabValue: {
      type: String | Number,
      required: true,
    },
    tabSubs: {
      type: Array,
      default: () => [],
      required: true,
    },
    tabSubValue: {
      type: String | Number,
      required: true,
    },
    onSearch: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    btnTab(val) {
      this.$emit('update:tabValue', val);
    },
    btnTabSub(val) {
      this.$emit('update:tabSubValue', val);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-header-item {
  height: 60px;
  display: flex;
  align-items: center;
}
</style>
