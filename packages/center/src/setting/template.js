let template = new Object()

/*
* 费用管理下的状态
* */

//费用类型
template.costType = [
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
template.paymentType = [
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
template.paymentStates = [
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
//项目类型：
template.projectType = [
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
template.isOpenInvoice = [
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
template.invoiceStates = [
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
template.invoiceType = [
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
template.invoiceGetType = [
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
template.platformServiceType = [
    {
        code: 1,
        name: "按金额收取"
    },
    {
        code: 2,
        name: "按比例收取"
    },
    {
        code: 3,
        name: "标准累进制"
    },
];
//采购方式（招标方式）：
template.tenderMethod = [
    {
        code: 1,
        name: "公开招标"
    },
    {
        code: 2,
        name: "邀请招标"
    },
    {
        code: 3,
        name: "直接发包"
    },
    {
        code: 4,
        name: "单一来源采购"
    },
    {
        code: 5,
        name: "预选招标子工程"
    },
    {
        code: 6,
        name: "询比采购"
    },
    {
        code: 7,
        name: "竞争性谈判采购"
    },
    {
        code: 8,
        name: "竞争性磋商"
    },
    {
        code: 9,
        name: "其他"
    },
    {
        code: 10,
        name: "竞价"
    },
];
//审核状态：
template.auditStatus = [
    {
        code: 0,
        name: "初始化 "
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
template.workApprovalStatus = [
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
template.expertEvaluationType = [
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
template.expertEvaluationStatus = [
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
template.expertPaymentStatus = [
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
template.zjAuditStatus = [
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
template.tuiSongStatus = [
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
template.payerType = [
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



export default template