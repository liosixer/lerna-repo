let supplierManagement = new Object()

// 专业标签状态
supplierManagement.majorLabelStatus = [
	{ code: 1, name: "有效" },
	{ code: 0, name: "无效" },
]

// 是否状态
supplierManagement.whetherStatus = [
	{ code: 1, name: "是" },
	{ code: 0, name: "否" },
]

// 供应商评价
supplierManagement.supplierEvaluation = [
  { code: "0", name: "不合格" },
  { code: "1", name: "合格" },
  { code: "2", name: "良好" },
  { code: "3", name: "优秀" },
]

// 不良行为
supplierManagement.misconduct = [
  { code: "0", name: "无" },
  { code: "1", name: "暂停资格" },
  { code: "2", name: "暂停资格2年" },
  { code: "3", name: "暂停资格6个月" },
]

// 成交履约状态
supplierManagement.performStatus = [
  { code: "0", name: "正常" },
  { code: "1", name: "暂停资格" },
  { code: "2", name: "暂停资格2年" },
  { code: "3", name: "暂停资格6个月" },
]

export default supplierManagement