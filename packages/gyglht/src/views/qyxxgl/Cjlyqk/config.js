const EVALUATE = {
  0: {
    name: "工程",
    list: [
      {
        label: "质量管理评价",
        field: "qualityScore",
        tips: "根据质量管理体系、工程质量验收、现场施工技术措施、工程返工情况等进行打分，每颗星代表20分。"
      },
      {
        label: "工程进度评价",
        field: "progressScore",
        tips: "对照合同进度节点，根据施工进度对生产、基建影响程度进行打分，每颗星代表20分。"
      },
      {
        label: "合同价格评价",
        field: "priceScore",
        tips: "与本单位掌握的市场价格进行对标，根据优惠程度及索赔的合理性等进行打分，每颗星代表20分。"
      },
      {
        label: "现场管理评价",
        field: "siteManageScore",
        tips: "根据施工组织、施工安全文明、资料管理情况等进行打分，每颗星代表20分。"
      },
    ],
  },
  2: {
    name: "服务",
    list: [
      {
        label: "服务质量评价",
        field: "qualityScore",
        tips: "根据投入人员的素质、数量和时间，完成的阶段性工作成果符合要求程度等进行打分，每颗星代表20分。"
      },
      {
        label: "项目进度评价",
        field: "progressScore",
        tips: "对照合同规定的时间节点，根据阶段性工作成果提交进度对生产、基建、经营的影响程度进行打分，每颗星代表20分。"
      },
      {
        label: "合同价格评价",
        field: "priceScore",
        tips: "与本单位掌握的市场价格进行对标，根据优惠程度给予打分，每颗星代表20分。"
      },
      {
        label: "服务态度评价",
        field: "serveScore",
        tips: "对照合同规定提供服务，根据集团供应商提供的额外增值服务，以及集团供应商提供的服务与采购人实际要求配合程度、问题解决情况等进行打分，每颗星代表20分。"
      },
    ],
  },
  1: {
    name: "货物",
    list: [
      {
        label: "货物质量评价",
        field: "qualityScore",
        tips: "根据供货质量水平、符合技术要求程度、是否退货等进行打分，每颗星代表20分。"
      },
      {
        label: "交货速度评价",
        field: "deliveryScore",
        tips: "对照合同交货时间，根据交货进度对生产、基建、经营的影响程度进行打分，每颗星代表20分。"
      },
      {
        label: "合同价格评价",
        field: "priceScore",
        tips: "与本单位掌握的市场价格进行对标，根据优惠程度进行打分，每颗星代表20分。"
      },
      {
        label: "服务评价",
        field: "serveScore",
        tips: "对照合同规定提供服务，根据提供的额外增值服务，以及供应商提供的服务与采购人实际要求配合程度、问题解决情况等进行打分，每颗星代表20分。"
      },
    ],
  },
}

export default {
  data() {
    return {
      breadcrumbList: [],
      EVALUATE,
    }
  },
  
  methods: {
    getRoute() {
      switch(this.$route.name) {
        case "evaluateList":
          this.breadcrumbList = [
            { label: "供应商评价结果", link: "" }
          ]
          break;
        case "evaluateDetail":
          this.breadcrumbList = [
            { label: "供应商评价结果", link: "/qyxxgl/evaluate" },
            { label: "详情", link: "" }
          ]
          break;
        case "misconductList":
          this.breadcrumbList = [
            { label: "供应商不良行为", link: "" }
          ]
          break;
        case "misconductDetail":
          this.breadcrumbList = [
            { label: "供应商不良行为", link: "/qyxxgl/misconduct" },
            { label: "详情", link: "" }
          ]
          break;
      }
    },
  },
}
