let archiveManagement = new Object()

// 审核状态
archiveManagement.checkStatus = [
  {
    name: "未提交",
    code: 1001,
  },
  {
    name: "审核中",
    code: 1009,
  },
  {
    name: "审核不通过",
    code: 1011,
  },
  {
    name: "审核通过",
    code: 1012,
  },
]

// 是否状态
archiveManagement.whetherStatus = [
  {
    name: "否",
    code: 0,
  },
  {
    name: "是",
    code: 1,
  },
]

// 采购方式
archiveManagement.purchaseType = [
  {
    name: "公开招标",
    code: 1,
  },
  {
    name: "邀请招标",
    code: 2,
  },
  {
    name: "单一来源",
    code: 4,
  },
  {
    name: "竞争性谈判",
    code: 7,
  },
  {
    name: "询比采购",
    code: 6,
  },
  {
    name: "竞价",
    code: 10,
  },
  // {
  //   name: "协议采购",
  //   code: 8,
  // },
]

// 归档状态
archiveManagement.archiveStatus = [
  {
    name: "未归档",
    code: 0
  },
  {
    name: "已归档",
    code: 1
  },
]

export default archiveManagement