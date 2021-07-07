let costManage = new Object()

/*
* 费用管理下的状态
* */

//费用类型
costManage.costType = [
    {
        code: 'ptfwf',
        name: "平台使用费"
    },
    {
        code: 'ptfwfApply',
        name: "平台使用费"
    },
    {
        code: 'goubiao',
        name: "标书费"
    },
    {
        code: 'goubiaoApply',
        name: "标书费"
    },
    {
        code: 'goubiaoZS',
        name: "预审文件费"
    },
    {
        code: 'zbfwf',
        name: "代理服务费"
    },
    {
        code: 'cajz',
        name: "CA介质费用"
    },
    {
        code: 'cazs',
        name: "CA证书费用"
    }
];
// 财务对账
costManage.costType1 = [
    {
        code: 'ptfwf',
        name: "平台使用费"
    },
    {
        code: 'goubiao',
        name: "标书费"
    },
    {
        code: 'goubiaoZS',
        name: "预审文件费"
    },
    {
        code: 'cajz',
        name: "CA介质费用"
    },
    {
        code: 'cazs',
        name: "CA证书费用"
    }
];
//费用类型--财务管理
costManage.costType2 = [
    {
        code: 'ptfwf',
        name: "平台使用费"
    },
    {
        code: 'goubiao',
        name: "标书费"
    },
    {
        code: 'goubiaoZS',
        name: "预审文件费"
    },
    {
        code: 'zbfwf',
        name: "代理服务费"
    },
    {
        code: 'cajz',
        name: "CA介质费用"
    },
    {
        code: 'cazs',
        name: "CA证书费用"
    }
];
//支付方式
costManage.paymentType = [
    {
        code: 6,
        name: "支付宝支付"
    },
    {
        code: 7,
        name: "微信支付"
    },
    {
        code: 8,
        name: "线下支付"
    }
    
];
//订单状态
costManage.paymentStates = [
    {
        code: 0,
        name: "未支付",
        disabled: true
    },
    {
        code: 1,
        name: "审核中"
    },
    {
        code: 2,
        name: "审核不通过"
    },
    {
        code: 3,
        name: "已支付"
    },
    {
        code: 4,
        name: "退还审批中"
    },
    {
        code: 5,
        name: "退还审批通过"
    },
    {
        code: 6,
        name: "退还审批不通过"
    },
    {
        code: 7,
        name: "退还中"
    },
    {
        code: 8,
        name: "已退还"
    },
    {
        code: 9,
        name: "支付失败"
    },
    {
        code: 10,
        name: "退款失败"
    },
    {
        code: 11,
        name: "已过期"
    },
];
//线下订单状态
costManage.underLinePayStates = [
  {
      code: 0,
      name: "未提交",
      disabled: true
  },
  {
    code: 1,
    name: "待确认",
    disabled: true
  },
  {
    code: 2,
    name: "已撤回",
    disabled: true
  },
  {
    code: 3,
    name: "不通过",
    disabled: true
  },
  {
    code: 4,
    name: "已通过",
    disabled: true
  },
];
//项目类型：
costManage.projectType = [
    {
        code: 0,
        name: "工程"
    },
    {
        code: 1,
        name: "货物"
    },
    {
        code: 2,
        name: "服务"
    },
    // {
    //     code: 3,
    //     name: "国际货物"
    // }
];
//是否开票：
costManage.isOpenInvoice = [
    {
        code: 0,
        name: "不开票"
    },
    {
        code: 1,
        name: "开票"
    }
];
//发票状态：
costManage.invoiceStates = [
    {
        code: 0,
        name: "未开票"
    },
    {
        code: 1,
        name: "开票中"
    },
    {
        code: 2,
        name: "已开票"
    },
    {
        code: 3,
        name: "开票失败"
    },
    {
        code: 4,
        name: "已冲红"
    }
];
//发票类型：
costManage.invoiceType = [
    {
        code: 0,
        name: "电子发票"
    },
    {
        code: 1,
        name: "纸质发票"
    }
];
//发票获取方式：
costManage.invoiceGetType = [
    {
        code: 0,
        name: "线上获取"
    },
    {
        code: 1,
        name: "线下获取"
    }
];
//平台服务费收取方式：
// costManage.platformServiceType = [
//     {
//         code: '1',
//         name: "按金额收取"
//     },
//     {
//         code: '2',
//         name: "按比例收取"
//     },
//     {
//         code: '3',
//         name: "标准累进制"
//     },
//     {
//         code: '4',
//         name: "按梯度收取"
//     },
// ];
costManage.platformServiceType = [
  {
      code: '1',
      name: "按中标金额收取"
  },
  {
      code: '2',
      name: "按金额收取"
  },
  {
      code: '3',
      name: "按比例收取"
  }
];
//采购方式（招标方式）：
costManage.tenderMethod = [
    {
        code: 1,
        name: "公开招标"
    },
    {
        code: 2,
        name: "邀请招标"
    },
    // {
    //     code: 3,
    //     name: "直接发包"
    // },
    {
        code: 4,
        name: "单一来源采购"
    },
    // {
    //     code: 5,
    //     name: "预选招标子工程"
    // },
    {
        code: 6,
        name: "询比采购"
    },
    {
        code: 7,
        name: "竞争性谈判采购"
    },
    // {
    //     code: 8,
    //     name: "竞争性磋商"
    // },
    // {
    //     code: 9,
    //     name: "其他"
    // },
    {
        code: 10,
        name: "竞价"
    },
];

//采购方式（招标方式）竞价-竞低价 竞价-竞高价：
costManage.tenderMethod_ = [
    {
        code: 1,
        name: "公开招标"
    },
    {
        code: 2,
        name: "邀请招标"
    },
    // {
    //     code: 3,
    //     name: "直接发包"
    // },
    {
        code: 4,
        name: "单一来源采购"
    },
    // {
    //     code: 5,
    //     name: "预选招标子工程"
    // },
    {
        code: 6,
        name: "询比采购"
    },
    {
        code: 7,
        name: "谈判采购"
    },
    {
        code: 8,
        name: "磋商采购"
    },
    {
        code: 9,
        name: "其他"
    },
    {
        code: 101,
        name: "竞价-竞低价"
    },
    {
        code: 102,
        name: "竞价-竞高价"
    },
];
//审核状态：
costManage.auditStatus = [
    {
        code: 0,
        name: "未提交"
    },
    {
        code: 1,
        name: "审核中"
    },
    {
        code: 2,
        name: "审核通过"
    },
    {
        code: 3,
        name: "审核不通过"
    },
    {
        code: 4,
        name: "退款失败"
    },
    {
        code: 5,
        name: "部分退款"
    },
    {
        code: 6,
        name: "已退还"
    },
];
//工作流审核记录的审批状态：
costManage.workApprovalStatus = [
    {
        code: 0,
        name: "未审批 "
    },
    {
        code: 1,
        name: "发起"
    },
    {
        code: 2,
        name: "结束"
    },
    {
        code: 3,
        name: "驳回发起"
    },
    {
        code: 4,
        name: "发起人撤回"
    },
    {
        code: 5,
        name: "备案通过"
    },
    {
        code: 6,
        name: "备案不通过"
    },
    {
        code: 7,
        name: "一级审批通过"
    },
    {
        code: 8,
        name: "二级审批通过"
    },
];
//专家评审类型：
costManage.expertEvaluationType = [
    {
        code: 0,
        name: "资格评审 "
    },
    {
        code: 1,
        name: "评标"
    },
    {
        code: 2,
        name: "评审"
    },
    {
        code: 3,
        name: "竞谈"
    },
];
//专家评审状态：
costManage.expertEvaluationStatus = [
    {
        code: 0,
        name: "非正常评审 "
    },
    {
        code: 1,
        name: "正常评审"
    },
    {
        code: 2,
        name: "已到现场未评审"
    },
    {
        code: 3,
        name: "已到现场需回避"
    },
    {
        code: 4,
        name: "异议投诉复评"
    },
];
//专家费付款状态：
costManage.expertPaymentStatus = [
    {
        code: 0,
        name: "未付款 "
    },
    {
        code: 1,
        name: "付款中"
    },
    {
        code: 2,
        name: "已付款"
    },
];
//专家审核状态：
costManage.zjAuditStatus = [
    {
        code: 0,
        name: "未提交 "
    },
    {
        code: 1,
        name: "部长审核中"
    },
    {
        code: 2,
        name: "财务审核中"
    },
    {
        code: 3,
        name: "审核通过"
    },
    {
        code: 4,
        name: "审核不通过"
    },
];
//专家费用推送状态
costManage.tuiSongStatus = [
    {
        code: 0,
        name: "未推送 "
    },
    {
        code: 1,
        name: "成功"
    },
    {
        code: 2,
        name: "失败"
    }
];

//专家费类型
costManage.payerType = [
    {
        code: 0,
        name: "工作人员 "
    },
    {
        code: 1,
        name: "评审专家"
    },
    {
        code: 2,
        name: "监标人"
    },
    {
        code: 3,
        name: "招标人代表"
    },
    {
        code: 4,
        name: "业主评委"
    },
    {
        code: 5,
        name: "特殊情况专家"
    }
];

//冲销状态
costManage.rushStatus = [
    {
        code: 0,
        name: "未冲销 "
    },
    {
        code: 1,
        name: "已冲销"
    },
    {
        code: 2,
        name: "未生成"
    }
];
// 对账状态
costManage.reconciliationStatus = [
    {
        code: 0,
        name: "未对账 "
    },
    {
        code: 1,
        name: "对账成功"
    },
    {
        code: 2,
        name: "对账失败"
    }
];



export default costManage