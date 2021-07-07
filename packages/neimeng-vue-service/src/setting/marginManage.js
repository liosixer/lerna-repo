let marginManage = new Object()

/*
* 保证金管理下的状态
* */

//费用类型
marginManage.costType = [
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

//缴纳形式：
marginManage.depositPaymentType = [
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
marginManage.marginStates = [
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
//项目经理退还申请审批状态：
marginManage.manageApplyBackStates = [
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
        name: "审批通过"
    },
    {
        code: 3,
        name: "审批不通过"
    },
    {
        code: 4,
        name: "审批撤回"
    },
    {
        code: 5,
        name: "审批失败"
    },
    {
        code: 6,
        name: "审批驳回"
    },
];
//项目经理退还申请审批状态：copy
marginManage.manageApplyBackStatesCopy = [
    {
        code: 0,
        name: "审核中"
    },
    {
        code: 1,
        name: "审批通过"
    },
    {
        code: 2,
        name: "审批不通过"
    },
    {
        code: 6,
        name: "审批驳回"
    },
];
//项目经理下项目状态：
marginManage.xmStatus = [
    {
        code: 0,
        name: "流标"
    },
    {
        code: 1,
        name: "正常"
    },
    {
        code: 2,
        name: "终止"
    },
    // {
    //     code: 999,
    //     name: "流标"
    // },
    // {
    //     code: 27,
    //     name: "正常"
    // },
    // {
    //     code: 888,
    //     name: "终止"
    // },
];
//项目经理下退款范围：
marginManage.tuiKuanFanwei = [
    {
        code: 1,
        name: "中标人"
    },
    {
        code: 2,
        name: "未中标人"
    },
    {
        code: 3,
        name: "全部"
    },
];
//项目经理下划转状态：
marginManage.liXiStatus = [
    {
        code: 0,
        name: "初始状态"
    },
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
    },
];
//项目经理下划转状态：
marginManage.liXiFailStatus = [
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
        name: "退还成功"
    },
    {
        code: 3,
        name: "退还失败"
    },
    {
        code: 4,
        name: "退还中"
    },
];

//项目经理下退款原因状态：
marginManage.tuiKuanYuanYinStatus = [
    {
        code: 1,
        name: "中标"
    },
    {
        code: 2,
        name: "未中标"
    },
    {
        code: 3,
        name: "流标"
    },
    {
        code: 4,
        name: "终止"
    },
];
//财务人员下 是否为基本户
marginManage.jiBenHuStatus = [
    {
        code: 0,
        name: "否"
    },
    {
        code: 1,
        name: "是"
    },
];
//财务人员下 是否为退还状态
marginManage.isTuiHuanStatus = [
    {
        code: 0,
        name: "全部"
    },
    {
        code: 1,
        name: "已退还"
    },
    {
        code: 2,
        name: "未退还"
    },
];

//财务人员下 核实状态
marginManage.heShiStatus = [
    {
        code: 0,
        name: "否"
    },
    {
        code: 1,
        name: "是"
    },
];
//财务人员下 退款状态
marginManage.tuiHuanZhuangTaiStatus = [
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
//财务人员下 退还原因
marginManage.tuiKuanYuanYinStatus = [
    {
        code: 1,
        name: "中标"
    },
    {
        code: 2,
        name: "未中标"
    },
    {
        code: 3,
        name: "流标"
    },
    {
        code: 4,
        name: "终止"
    },
];
// 线下保证金退还状态
marginManage.isTuiHuanOptions = [
    {
        code:0,
        name:'未确认'
    },
    {
        code:1,
        name:'确认中'
    },
    {
        code:2,
        name:'审批不通过'
    },
    {code:3,
        name:'通过'
    }
];
// 线下保证金退还状态 
marginManage.tuiHuanStatusZhuang = [
    {
        code:0,
        name:'未退还'
    },
    {
        code:1,
        name:'退还中'
    },
    {
        code:2,
        name:'已退还'
    },
    {
        code:3,
        name:'已没收'
    },
    {
        code:4,
        name:'已划转'
    },
    {
        code:5,
        name:'退还失败'
    }
];
// 代理费划转状态
marginManage.dailifeihuazhuanzhuangtai = [
    {
        code:0,
        name:'未划转'
    },
    {
        code:1,
        name:'划转中'
    },
    {
        code:2,
        name:'划转成功'
    },
    {
        code:3,
        name:'划转失败'
    }
]

// 发票类型
marginManage.invoiceType = [
    {
        code: "增值税普通电子发票",
        name: "增值税普通电子发票"
    },
    {
        code: "增值税专用纸质发票",
        name: "增值税专用纸质发票"
    },
]

// 发票状态
marginManage.invoiceStatus = [
    {
        code: 0,
        name: "未开票"
    },
    {
        code: 1,
        name: "已开票"
    },
]

export default marginManage