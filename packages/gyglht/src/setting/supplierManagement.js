let supplierManagement = new Object()

// 专业标签状态
supplierManagement.majorLabelStatus = [
	{ code: 1, name: "有效" },
	{ code: 0, name: "无效" },
]

// 项目类型
supplierManagement.projectType = [
	{ code: 0, name: "工程" },
	{ code: 1, name: "货物" },
	{ code: 2, name: "服务" },
	// { code: 3, name: "工程施工" },
	// { code: 4, name: "工程货物" },
	// { code: 5, name: "工程服务" },
]

// 采购类型
supplierManagement.purchaseType = [
	{ code: 1, name: "公开邀请" },
	{ code: 2, name: "邀请招标" },
	{ code: 4, name: "单一来源" },
	{ code: 5, name: "预选招标子工程" },
	{ code: 6, name: "询比采购" },
	{ code: 7, name: "竞争性谈判采购" },
	{ code: 8, name: "竞争性磋商" },
	{ code: 10, name: "竞价" },
	{ code: 11, name: "协议采购" },
	{ code: 9, name: "其他" },
]

// 是否状态
supplierManagement.whetherStatus = [
	{ code: 1, name: "是" },
	{ code: 0, name: "否" },
]

// 供应商评价
supplierManagement.evaluation = [
  { code: 0, name: "未评价" },
  { code: 1, name: "合格" },
  { code: 2, name: "不合格" },
  { code: 3, name: "优秀" },
  { code: 4, name: "良好" },
  { code: 5, name: "一般" },
]

// 不良行为
supplierManagement.misconduct = [
  { code: 0, name: "已恢复资格" },
  { code: 1, name: "暂停资格" },
  { code: 2, name: "暂停资格6个月" },
  { code: 3, name: "暂停资格2年" },
]

// 发生阶段
supplierManagement.stageList = [
  { code: 1, name: "准入申请" },
  { code: 2, name: "采购活动" },
  { code: 3, name: "合同履约" },
]

// 不良行为类型
supplierManagement.badBehaviorType = [
  { code: 1, name: "用不正当手段获取准入资格" },
  { code: 2, name: "提供虚假材料获取中标" },
  { code: 3, name: "不按照合同进行生产" },
  { code: 4, name: "不按投标时的承诺履行合同" },
  { code: 5, name: "供应商售后服务不到位" },
]

export default supplierManagement