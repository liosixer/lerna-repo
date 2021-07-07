<template>
  <!-- 不良行为 -->
  <el-card>
    <div slot="header" class="clearfix">
      <span class="global-card-header-name">不良行为</span>
    </div>
    <div class="global-card-content">
      <el-form :model="baseForm" ref="baseForm" label-width="135px" size="small" label-position="right" disabled>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="供应商名称">
              <el-input v-model="baseForm.supplierName" placeholder="自动读取"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否属于集团">
              <el-select v-model="baseForm.belongTo" placeholder="自动读取">
                <el-option
                  v-for="item in globalSetting.supplierManagement.whetherStatus"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="提交人">
              <el-input v-model="baseForm.createrName" placeholder="自动读取"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="baseForm.createrPhone" placeholder="自动读取"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="发生阶段">
              <el-select v-model="baseForm.happenStage" placeholder="自动读取">
                <el-option
                  v-for="item in globalSetting.supplierManagement.stageList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="不良行为类型">
              <el-select v-model="baseForm.badBehaviorType" placeholder="自动读取">
                <el-option
                  v-for="item in globalSetting.supplierManagement.badBehaviorType"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="不良行为时间">
              <el-input :value="baseForm.badBehaviorTime | timestampFormat('minute')" placeholder="自动读取"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="处罚结果">
              <el-select v-model="baseForm.punishResult" placeholder="自动读取">
                <el-option
                  v-for="item in globalSetting.supplierManagement.misconduct"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="不良行为">
              <el-input v-model="baseForm.badBehaviorRemark" placeholder="自动读取" type="textarea" :rows="4"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="说明文件">
              <ul class="file-list">
                <li class="file-item" v-for="item in fileList" :key="item.guid">
                  <span class="down-link" @click="handleDownFile(item)">{{item.name}}</span>
                </li>
              </ul>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import util from "@/utils/util"

export default {
  name: "cjlyqkDetailMisconduct",
  inject: ["globalSetting"],
  props: {
    baseForm: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      fileList: [],
    }
  },
  methods: {
    // 文件下载
    async handleDownFile(item) {
      const url = await util.getDownSrc(item.guid)
      window.open(url)
    },
  },
  watch: {
    'baseForm.attachmentGuid': async function(val, old) {
      if (val) {
        const res = await util.getFiles(val)
        this.fileList = [res]
      }
    },
  },
}
</script>

<style scoped lang="scss">
.down-link{
  color: #409eff;
  cursor: pointer;
}
</style>