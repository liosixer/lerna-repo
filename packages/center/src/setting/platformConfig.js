let platformConfig = new Object()

// 市场类型
platformConfig.marketType = [
  { code: 0, name: "招标/采购人" },
  { code: 1, name: "招标代理" }
]

// 用户类别
platformConfig.userType = [
  { code: 0, name: "企业" },
  { code: 1, name: "自然人" }
]

// 使用状态
platformConfig.useStatus = [
  { code: 0, name: "使用" },
  { code: 1, name: "不使用" }
]

// 是否状态
platformConfig.whetherStatus = [
  { code: 0, name: "是" },
  { code: 1, name: "否" }
]

// 代理服务费
platformConfig.agentCostType = [
  { code: 0, name: "线下方式" },
]

// 标书费方式
platformConfig.tenderCostType = [
  { code: 0, name: "全付通" },
  { code: 1, name: "线下支付" },
  { code: 2, name: "微信" },
  { code: 3, name: "支付宝" },
]

// 平台使用费方式
platformConfig.platformCostType = [
  { code: 0, name: "收取" },
  { code: 1, name: "不收取" },
]

// 生成方式
platformConfig.createType = [
  { code: 0, name: "自动生成" },
  { code: 1, name: "填写" }
]

// 保密
platformConfig.secretType = [
  { code: 0, name: "保密" },
  { code: 1, name: "不保密" }
]

// 收费方式
platformConfig.costType = [
  { code: 1, name: "标准累进制" },
  { code: 2, name: "梯度进制" },
  { code: 3, name: "固定金额" },
  { code: 4, name: "固定比例" }
]

// 收费方式--选择
platformConfig.costTypeSelect = [
  { code: 3, name: "固定金额" },
  { code: 4, name: "固定比例" }
]

export default platformConfig