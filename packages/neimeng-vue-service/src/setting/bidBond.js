import store from "../store";

let bidBond = new Object()

/*
* 费用管理下的状态
* */

//费用类型
bidBond.costType = [
  {
    code: 'ptfwf',
    name: "平台服务费"
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
  }
];
//支付方式
bidBond.paymentType = [
  {
    code: 6,
    name: "支付宝支付"
  },
  {
    code: 7,
    name: "微信支付"
  }
];
//订单状态
bidBond.paymentStates = [
  {
    code: 0,
    name: "未支付"
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
];
bidBond.paymentOfflineStatus = [
  // 订单状态 0-未提交 1-待确认 2-已撤回 3-不通过 4-已通过
  { code: 0, name: "未支付", status: "other" },
  { code: 1, name: "待确认", status: "going" },
  { code: 2, name: "已撤回", status: "other" },
  { code: 3, name: "审核不通过", status: "fail" },
  { code: 4, name: "审核已通过", status: "success" }
]
//项目类型：
bidBond.projectType = [
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
  {
    code: 3,
    name: "国际货物"
  }
];
//是否开票：
bidBond.isOpenInvoice = [
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
bidBond.invoiceStates = [
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
bidBond.invoiceType = [
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
bidBond.invoiceGetType = [
  {
    code: 0,
    name: "线上获取"
  },
  {
    code: 1,
    name: "线下获取"
  }
];
//缴纳形式：
bidBond.depositPaymentType = [
  {
    code: 0,
    name: "虚拟子账号"
  },
  {
    code: 6,
    name: "电子保函"
  },
  {
    code: 9,
    name: "纸质保函"
  },
  {
    code: 10,
    name: "线下递交"
  }
];
//保证金状态：
bidBond.marginStates = [
  {
    code: 0,
    name: "未缴纳"
  },
  {
    code: 1,
    name: "审批中"
  },
  {
    code: 2,
    name: "审批不通过"
  },
  {
    code: 3,
    name: "已缴纳"
  },
];
//退款状态：
bidBond.backMoneyStates = [
  {
    code: 1,
    name: "退还中"
  },
  {
    code: 2,
    name: "退还成功"
  },
  {
    code: 3,
    name: "退还失败"
  }
];

//保证金退款状态：
bidBond.backCashDepositStates = [
  {
    code: 0,
    name: "未退还"
  },
  {
    code: 1,
    name: "退还中"
  },
  {
    code: 2,
    name: "已退还"
  },
  {
    code: 3,
    name: "已没收"
  },
  {
    code: 4,
    name: "已划转"
  },
];
//划转状态：
bidBond.huaZhuanStatus = [
  {
    code: 1,
    name: "划转中"
  },
  {
    code: 2,
    name: "划转成功"
  },
  {
    code: 3,
    name: "划转失败"
  }
];
//保证金收取方式
bidBond.DepositCollectionMethod = [
  {
    code: 1,
    name: "固定金额"
  },
  {
      code: 2,
      name: "固定比例"
  }
];
// 审批结果
bidBond.shenPiJieGuo = [
  {
    code: 0,
    name: "未审批"
  },
  {
      code: 1,
      name: "审批通过"
  },
  {
      code: 2,
      name: "审批驳回"
  },
  {
      code: 3,
      name: "撤销审核"
  }
];
if (store.state.logoType == 2) {
  bidBond.depositPaymentType = [
    {
      code: 6,
      name: "电子保函"
    },
    {
      code: 9,
      name: "纸质保函"
    },
    {
      code: 10,
      name: "线下递交"
    }
  ]
}

export default bidBond