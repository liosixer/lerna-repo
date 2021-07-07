<template>
  <section class="anchor-nav page-detail">
    <div class="gyszyxxHeader global-title">
      <page-crumb :d="{ breadcrumbList: breadcrumbList }">
        <div slot="btns">
          <el-button type="primary" @click="handleCheckPurchaseInfo" size="small"
              >提交审核</el-button
            >
            <el-button @click="handleBack" size="small">返回</el-button>
        </div>
      </page-crumb>
      <!-- <div>
        <ul>
          <li>
            <h3>供应商专业信息</h3>
          </li>
          <li>
            <el-button type="primary" @click="handleCheckPurchaseInfo" size="small"
              >提交审核</el-button
            >
            <el-button @click="handleBack" size="small">返回</el-button>
          </li>
        </ul>
      </div> -->
    </div>
  </section>
</template>

<script>
// import Info from './info'
import PageCrumb from "@/components/PageCrumb";
export default {
  data () {
    return {
      breadcrumbList: [
        { label: "首页", link: "/qyxxgl" },
        { label: "供应商专业信息", link: "/qyxxgl" },
        { label: "供应商专业信息-详情", link: "" }
      ],
    }
  },
  components: {
    PageCrumb,
  },
  mounted () {

  },
  methods: {
    //提交审核
    handleCheckPurchaseInfo () {
      if (this.$children[3].$data.formData.gongYingShangList.length) {
        checkPurchaseInfo().then(res => {
          if (res.code === 1) {
            this.$message.success(res.info)
          }
        })
      } else {
        this.$alert('请先添加供应商专业申请！', '提示', {
          confirmButtonText: '确定',
        })
      }

    },
    handleBack () {
      this.$router.back()
    },
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  background: rgba(240, 242, 245, 1);
}

/*头部样式*/
.gyszyxxHeader {
  width: 100%;
  height: 95px;
  background: #fff;
  div {
    width: calc(100% - 40px);
    height: 40px;
    margin: 0 auto;
    ul {
      overflow: hidden;
      width: 100%;
      height: 100%;
      li {
        float: left;
        width: 50%;
        height: 100%;
        h3 {
          height: 40px;
          color: #000;
          font-size: 16px;
          line-height: 40px;
        }
      }
      li:last-child {
        float: right;
        text-align: right;
        ::v-deep.el-button {
          height: 32px !important;
          line-height: 4px;
        }
      }
    }
  }
  div:first-child {
    color: #404040;
    font-size: 14px;
    margin-top:10px;
  }
}

/*主体内容样式*/
.gyszyxxContent {
  /*width: calc(100% - 40px);*/
  margin: 5PX 4PX;/*no*/
  .bottomLine {
    width: 100%;
    border-bottom: 1px solid #e9e9e9;
  }
  > div {
    width: 100%;
    margin-bottom: 20px;
    padding-bottom: 20px;
    background: #fff;
  }
  .topDiv {
    width: calc(100% - 40px);
    height: 54px;
    margin: 0 auto;
    ul {
      overflow: hidden;
      width: 100%;
      height: 54px;
      li {
        float: left;
        width: 50%;
        height: 54px;
        line-height: 54px;
        h3 {
          color: #333;
          font-size: 16px;
        }
      }
      li:last-child {
        text-align: right;
        ::v-deep.el-button {
          height: 32px !important;
          line-height: 4px;
        }
      }
    }
  }
  ::v-deep.el-table {
    .cell {
      padding: 0;
      font-size: 14px;
    }
    .el-button.del {
      color: #f00;
    }
    .blueBtn {
      color: #409eff;
    }
  }
}
</style>
