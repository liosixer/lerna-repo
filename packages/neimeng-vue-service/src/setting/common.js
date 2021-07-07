import marginManage from "./marginManage";
let enum1 = new Object()


//项目类型
enum1.projectType = [{
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
}
];
//组织形式
enum1.zuZhiXingShi = [{
    code: 2,
    name: "委托采购"
},
{
    code: 1,
    name: "自行采购"
}
];
enum1.zuZhiXingShi1 = [{
    code: 2,
    name: "委托采购"
}
];

//电煤组织形式
enum1.zuZhiXingShiDm = [
    {
        code: 1,
        name: "自行采购"
    }
];
//项目性质
enum1.projectNature = [{
    code: 2,
    name: "基建类"
},
{
    code: 3,
    name: "技改类"
},
{
    code: 4,
    name: "经营类"
},
{
    code: 5,
    name: "工程承包类"
},
{
    code: 6,
    name: "大宗物资类"
},
{
    code: 7,
    name: "运行维护类",
},
{
    code: 8,
    name: "设备维修、维保类",
},
{
    code: 9,
    name: "其他",
}
];
//计划类型  搜索
enum1.PlanType = [
    {
        code: "",
        name: "全部"
    },
    {
        code: 1,
        name: "自行采购计划"
    },
    {
        code: 2,
        name: "集中采购计划"
    },

];
//计划类型 显示
enum1.PlanTypeShow = [
    {
        code: 1,
        name: "自行采购计划"
    },
    {
        code: 2,
        name: "集中采购计划"
    },

];
//代理费收取方式
enum1.AgencyFeeMethod = [{
    code: 1,
    name: "固定金额"
},
{
    code: 2,
    name: "固定比例"
},
{
    code: 3,
    name: "标准累进制"
}
];
//合同类型
enum1.ContracType = [{
    code: 1,
    name: "整体项目合同"
},
{
    code: 2,
    name: "年度合同"
},
{
    code: 3,
    name: "单项合同"
}
];
//委托合同类型
enum1.EntrustContracType = [{
    code: 1,
    name: "年度委托合同"
},
{
    code: 2,
    name: "单次委托合同"
},
{
    code: 3,
    name: "线下委托合同"
}
];

//委托合同类型
enum1.EntrustSponsorContracType = [{
    code: 1,
    name: "期限委托合同"
},
{
    code: 2,
    name: "单次委托合同"
}
];
//委托方式
enum1.EntrustContractWay = [{
    code: 1,
    name: "公开委托"
},
{
    code: 2,
    name: "指定委托"
},
{
    code: 3,
    name: "邀请委托"
}];
/** 委托人身份 **/
enum1.EntrustIdentity = [
    { code: 1, name: "委托人" },
    { code: 2, name: "代理机构" },
];
//保证金收取方式
enum1.DepositCollectionMethod = [{
    code: 1,
    name: "固定金额"
},
{
    code: 2,
    name: "固定比例"
}
];
//资审方式
enum1.zsType = [{
    code: 2,
    name: "资格预审"
},
{
    code: 3,
    name: "资格后审"
}
];
// 采购方式
enum1.PurchaseType = [{
    code: 1,
    name: "公开招标"
},
{
    code: 2,
    name: "邀请招标"
},
{
    code: 4,
    name: "单一来源"
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
    code: 10,
    name: "竞价"
},
    // {
    //     code: 6,
    //     name: "询比采购"
    // },
    // {
    //     code: 11,
    //     name: "协议采购"
    // },
];
//评标办法1
enum1.bidEvaluationMethod1 = [{
    code: 1,
    name: "综合评标法"
},
{
    code: 2,
    name: "经评审的最低投标价法"
},
]
//评标办法2
enum1.bidEvaluationMethod2 = [
    {
        code: 3,
        name: "经评审的低价中标法"
    },
    {
        code: 4,
        name: "合理低价中标法"
    },
    {
        code: 5,
        name: "综合评审法"
    },
]
//评标办法3
enum1.bidEvaluationMethod3 = [{
    code: 7,
    name: "综合评分法"
},

]
//评标办法4
enum1.bidEvaluationMethod4 = [{
    code: 6,
    name: "最低价法"
},
]
//评审办法
enum1.evalMethods = [{
    code: 2,
    name: "综合评估法"
},
{
    code: 4,
    name: "经评审的最低投标价法"
},
{
    code: 18,
    name: "定性评审法"
},
{
    code: 99,
    name: "其他"
}
]
//评审办法
enum1.evalMethodsYs = [{
    code: '1',
    name: "合格制"
},
{
    code: '2',
    name: "有限数量制"
},
]
//定标方法
enum1.dbBanFas = [{
    code: 30,
    name: "票决法"
},
{
    code: 99,
    name: "其他办法"
}
]
// 报价方式
enum1.bjType = [{
    code: 1,
    name: "总价包干"
},
{
    code: 2,
    name: "固定单价"
},
{
    code: 3,
    name: "固定下浮率"
},
{
    code: 4,
    name: "预选招标总价包干"
},
{
    code: 5,
    name: "预选招标固定单价"
},
{
    code: 6,
    name: "预选招标固定下浮率"
},
{
    code: 7,
    name: "批量招标总价包干"
},
{
    code: 8,
    name: "批量招标固定单价"
},
{
    code: 9,
    name: "批量招标固定下浮率"
},
{
    code: 10,
    name: "其他"
}
];

// 报价方式4种
enum1.bjType_ = [{
    code: 1,
    name: "总价报价"
},
{
    code: 2,
    name: "单价报价"
},
{
    code: 3,
    name: "费率报价"
},
{
    code: 4,
    name: "特殊项目"
},
];
//异议管理答复状态
enum1.dissentStatus = [{
    code: 0,
    name: "待签收"
},
{
    code: 1,
    name: "待答复"
},
{
    code: 2,
    name: "已答复"
},
];
//答疑澄清的澄清类型
enum1.clarificationStype = [{
    code: 0,
    name: "答疑澄清"
},
{
    code: 1,
    name: "主动澄清"
},
];
//会议类型
enum1.meetingtype = [{
    code: 'KBH',
    name: "开标会"
},
{
    code: 'PBH',
    name: "评标会"
},
{
    code: 'ZGYSH',
    name: "资格预审会"
},
{
    code: 'SBH',
    name: "述标会"
},
{
    code: 'TPH',
    name: "谈判会"
},
{
    code: 'PSH',
    name: "评审会"
},
];
//开标会状态、评标会状态
enum1.meetingStatus = [{
    code: 1001,
    name: "未提交"
},
{
    code: 1009,
    name: "审核中"
},
{
    code: 1011,
    name: "审核不通过"
},
{
    code: 1012,
    name: "审核通过"
}
];
//事项类型
enum1.singstype = [{
    code: '2008',
    name: "采购公告"
},
{
    code: '2078',
    name: "招标变更公告"
},
{
    code: '2009',
    name: "招标文件"
},
{
    code: '2017',
    name: "预审文件"
}, {
    code: '2018',
    name: "预审文件变更补遗"
},
{
    code: '2010',
    name: "文件变更补遗"
},
{
    code: '2019',
    name: "答疑澄清"
},
{
    code: '2001',
    name: "异议管理"
},
{
    code: '2101',
    name: "中标合同备案"
},
{
    code: '2077',
    name: "项目资料归档"
},
{
    code: '2012',
    name: "成交候选人公示"
},
{
    code: '2063',
    name: "成交结果公示"
},
{
    code: '2105',
    name: "确定成交人"
},
{
    code: '2022',
    name: "成交结果通知书"
},
{
    code: '2102',
    name: "采购合同"
},
{
    code: '2103',
    name: "采购人采购委托"
},
{
    code: '2104',
    name: "代理人采购委托"
},
{
    code: '2041',
    name: "专家抽取"
},
{
    code: '2007',
    name: "邀请函"
},
{
    code: '2084',
    name: "复议"
},
{
    code: '2059',
    name: "文件模板"
},
{
    code: '2036',
    name: "采购失败"
},
{
    code: '2106',
    name: "采购补录"
},
{
    code: '2079',
    name: "资格预审变更公告"
},
{
    code: '2057',
    name: "资格预审公告"
},
{
    code: '2132',
    name: "平台服务费退还"
},
{
    code: '2130',
    name: "标书费退还"
},
{
    code: '2098',
    name: "投标保证金退还"
},
{
    code: '2108',
    name: "自查报告"
},
{
    code: '2110',
    name: "招采计划"
},
{
    code: '2111',
    name: "自行采购计划"
},
{
    code: '2201',
    name: "长协煤"
},
{
    code: '2202',
    name: "市场煤"
},
{
    code: '2203',
    name: "采购协议"
},
{
    code: '2204',
    name: "协议订单"
},
{
    code: '2205',
    name: "采购立项"
},
{
    code: '2206',
    name: "供应商评价"
},
{
    code: '2014',
    name: "场地预约"
},
];
//递交方式
enum1.sendType = [{
    code: '0',
    name: "虚拟子账号"
},
{
    code: '1',
    name: "投标保函"
},
{
    code: '6',
    name: "电子保函"
}
];
//保证金递交状态
enum1.sendStatus = [{
    code: '0',
    name: "未递交"
},
{
    code: '1',
    name: "待审批"
},
{
    code: '2',
    name: "审批驳回"
},
{
    code: '3',
    name: "审批通过"
},
{
    code: '4',
    name: "已转移"
},
{
    code: '5',
    name: "已申请退还"
},
{
    code: '-1',
    name: "未缴纳"
},
{
    code: '-2',
    name: "已缴纳"
}
];
//递交状态
enum1.computeType = [{
    code: 1,
    name: "固定金额"
},
{
    code: 2,
    name: "固定比例"
}
];
//投标文件加密情况
enum1.secType = [{
    code: 0,
    name: "加密文件"
},
{
    code: 1,
    name: "已解密文件"
},
{
    code: 2,
    name: "未加密文件"
},
{
    code: 3,
    name: "不确定文件"
}
];
//投标文件递交状态
enum1.fileSendType = [{
    code: 0,
    name: "未递交"
},
{
    code: 1,
    name: "已递交"
}
];
//审批状态
enum1.appvalStatus = [{
    code: 0,
    name: "未审批"
},
{
    code: 1,
    name: "审批通过"
}, {
    code: 2,
    name: "审批驳回"
}, {
    code: 3,
    name: "流程撤回"
},
];
//公告状态
enum1.noticeStatus = [{
    code: 1000,
    name: "未提交"
},
{
    code: 1001,
    name: "未提交"
},
{
    code: 1009,
    name: "审核中"
},
{
    code: 1011,
    name: "审核不通过"
},
{
    code: 1012,
    name: "审核通过"
},
{
    code: 1,
    name: "已发布"
}
];
//邀请函状态
enum1.invitStatus = [{
    code: 1001,
    name: "未发送"
},
{
    code: 1,
    name: "未发送"
},
{
    code: 1009,
    name: "审核中"
},
{
    code: 1011,
    name: "审核不通过"
},
{
    code: 1012,
    name: "审核通过"
},
{
    code: 2,
    name: "已发送"
}
];
//招标文件变更状态
enum1.fileChangeType = [{
    code: 1001,
    name: "未提交"
},
{
    code: 1009,
    name: "审核中"
},
{
    code: 1011,
    name: "审核不通过"
},
{
    code: 1,
    name: "已发布"
},
{
    code: 1012,
    name: "已发布"
},
{
    code: 1015,
    name: "审核中"
},
];
// 异议阶段
enum1.yiyijiedianType = [{
    code: 1,
    name: "资格预审文件"
},
{
    code: 2,
    name: "招标文件"
},
{
    code: 5,
    name: "中标候选人"
},
{
    code: 3,
    name: "开标"
},
    // {
    //     code: 4,
    //     name: "评标"
    // },
];
// 异议 答复状态
enum1.yiyidafuType = [{
    code: 1002,
    name: "未签收"
},
{
    code: 1001,
    name: "未提交"
},
{
    code: 1009,
    name: "审核中"
},
{
    code: 1005,
    name: "已签收"
},
{
    code: 1012,
    name: "已答复"
},
{
    code: 1006,
    name: "审核已拒绝"
},
];
// 澄清问题 答复状态
enum1.dafuType = [{
    code: 0,
    name: "未答复"
},
{
    code: 1,
    name: "已答复"
},
{
    code: 2,
    name: "答复中"
}
];
// 答疑澄清状态
enum1.chengqingType = [{
    code: 1001,
    name: "未提交"
},
{
    code: 1009,
    name: "审核中"
},
{
    code: 1012,
    name: "已答复"
},
{
    code: 1011,
    name: "审核不通过"
},
{
    code: 1006,
    name: "审核已拒绝"
},
];
// 答疑澄清 的澄清阶段
enum1.chengqingjieduanType = [{
    code: 6000,
    name: "招标公告"
},
{
    code: 6001,
    name: "招标文件"
},
{
    code: 6002,
    name: "招标清单文件"
},
{
    code: 6003,
    name: "资格预审文件"
},
{
    code: 6004,
    name: "控制价"
},
];
// 中标合同备案状态
enum1.contractType = [{
    code: 1001,
    name: "未提交"
},
{
    code: 1009,
    name: "审核中"
},
{
    code: 1011,
    name: "未通过"
},
{
    code: 1012,
    name: "已通过"
},
{
    code: 1,
    name: "已发布"
}
]
// 文件类别名称
enum1.fileTypeName = [
    {
      code: 1000,
      name: "委托单"
    },
    // {
    //     code: 1001,
    //     name: "项目信息"
    // },
    {
        code: 1003,
        name: "资格预审公告"
    },
    {
        code: 1006,
        name: "资格预审公告"
    },
    {
        code: 1007,
        name: "资格预审文件"
    },
    {
        code: 1008,
        name: "资格预审购标记录"
    },
    {
        code: 1009,
        name: "开启记录"
    },
    {
        code: 1010,
        name: "资格审查报告"
    },
    {
        code: 1015,
        name: "资格审查合格的申请文件"
    },

    {
        code: 1016,
        name: "资格审查不合格的申请文件"
    },
    {
        code: 1017,
        name: "招标公告"
    },
    {
        code: 1020,
        name: "评标委员会"
    },
    {
        code: 1021,
        name: "招标文件"
    },
    {
        code: 1022,
        name: "购标记录"
    },
    {
        code: 1023,
        name: "招标清单"
    },
    {
        code: 1024,
        name: "招标控制价"
    },
    {
        code: 1025,
        name: "投标文件递交情况"
    },
    {
        code: 1026,
        name: "投标保证金递交情况"
    },
    {
        code: 1027,
        name: "开标一览表"
    },

    {
        code: 1028,
        name: "评标报告"
    },
    {
        code: 1029,
        name: "中标候选人公示"
    },
    {
        code: 1030,
        name: "确定中标人"
    },
    {
        code: 1031,
        name: "中标通知书"
    },
    {
        code: 1035,
        name: "中标人的投标文件"
    },
    {
        code: 1036,
        name: "落标人的投标文件"
    },
    {
        code: 1051,
        name: "开标过程记录表"
    },
    {
        code: 1053,
        name: "评标过程澄清"
    },
    {
        code: 1056,
        name: "投标文件回执"
    },
    {
        code: 9999,
        name: "其它资料"
    },
    {
        code: 1060,
        name: "评标报告补充文件"
    },
    {
        code: 1061,
        name: "已经解密的投标文件"
    },
    {
        code: 1062,
        name: "踏勘现场通知"
    },
    {
        code: 1063,
        name: "踏勘现场记录"
    },
    {
        code: 1065,
        name: "完成证明书"
    },
    {
        code: 1066,
        name: "中标合同"
    },
    {
        code: 1067,
        name: "中标合同附件"
    },
    {
        code: 1068,
        name: "中标结果公告"
    }
]
// 采购计划类型
enum1.cgPlanType = [{
    code: 1,
    name: "自采计划"
},
{
    code: 2,
    name: "批次采购计划"
},
{
    code: 3,
    name: "年度采购计划"
},
]
// 采购计划审批状态
enum1.cgPlanStatus = [
    {
        code: 2,
        name: "待审核"
    },
    {
        code: 3,
        name: "不通过"
    },
    {
        code: 4,
        name: "已通过"
    },
]
// 采购分派状态
enum1.cgAssginStatus = [
    // {
    //     code: 4,
    //     name: "未分派"
    // },
    // {
    //     code: 6,
    //     name: "已分派"
    // },
    // {
    //     code: 5,
    //     name: "已引用"
    // },
    { code: 1, name: '未提交' },
    { code: 2, name: '审核中' },
    { code: 3, name: '未通过' },
    { code: 4, name: '未分派' },
    { code: 5, name: '已使用' },
    { code: 6, name: '已变更' },
    { code: 7, name: '已分派' },
]
// 电煤采购分派状态
enum1.cgAssginStatusDm = [
    { code: 1, name: '未提交' },
    { code: 2, name: '审核中' },
    { code: 21, name: '审核中' },
    { code: 3, name: '拒绝' },
    { code: 4, name: '未分派' },
    { code: 5, name: '已分派' },
    { code: 6, name: '已使用' },
]
// 专家等级
enum1.expertLeval = [{
    code: 0,
    name: "资深专家"
},
{
    code: 1,
    name: "普通专家"
}
]
// 专业级别
enum1.specialLeval = [{
    code: 10,
    name: "第一专业"
},
{
    code: 20,
    name: "第二专业"
}
]
// 抽取库选择 1:平台库/2:共享库/3:自采库
enum1.specialKuType = [{
    code: 1,
    name: "平台库"
},
{
    code: 2,
    name: "共享库"
},
{
    code: 3,
    name: "自采库"
}
]
// 会议室预约状态
enum1.meetappointStatus = [{
    code: 1001,
    name: "未提交"
},
{
    code: 1009,
    name: "审核中"
},
{
    code: 1011,
    name: "审核不通过"
},
{
    code: 1012,
    name: "审核通过"
}
]
// 中标形式
enum1.caliType = [{
    code: 0,
    name: "中标价"
},
{
    code: 1,
    name: "下浮率"
},
{
    code: 2,
    name: "其他"
}
]
//缴纳方式 代理费收取：
marginManage.depositPaymentType = [{
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
// 收取方式
enum1.shouquType = [{
    code: "1",
    name: "标准累进制"
},
{
    code: "2",
    name: "固定金额"
},
{
    code: "3",
    name: "固定比例"
}
]
// 优惠方式
enum1.youhuiType = [{
    code: "1",
    name: "优惠"
},
{
    code: "2",
    name: "不优惠"
},
{
    code: "3",
    name: "其他"
}
]
// 抽取方式
enum1.chouquType = [{
    code: 10,
    name: "随机抽取"
},
{
    code: 20,
    name: "直接指定"
}
]
// 通知方式
enum1.tongzhiType = [{
    code: 10,
    name: "语音通知"
},
{
    code: 20,
    name: "人工通知"
},
    // {
    //     code: 30,
    //     name: "自主通知"
    // }
]
// 通知方式 chouQuScopeType
enum1.chouQuScopeType = [{
    code: 0,
    name: "集团外"
},
{
    code: 1,
    name: "集团内"
}, {
    code: 2,
    name: "全部"
}
]
// 评审类型
enum1.evalType = [{
    code: 'ZGYS',
    name: "资格预审"
},
{
    code: 'PB',
    name: "评标"
},
{
    code: 'PS',
    name: "评审"
},
{
    code: 'TP',
    name: "谈判"
}
]
// 评审专家库
enum1.expertLib = [{
    code: 10,
    name: "评审专家库"
},
{
    code: 20,
    name: "评标专家库"
}
]

// 评委会组建状态    1:已保存/2:已提交/3:抽取成功/4:抽取失败/5:废弃了/6:更换专业/7:待审核8:审核不通过
enum1.expertComStatus = [{
    code: 1,
    name: "已保存"
},
{
    code: 2,
    name: "已提交"
},
{
    code: 3,
    name: "抽取成功"
},
{
    code: 4,
    name: "抽取失败"
},
{
    code: 5,
    name: "废弃了"
},
{
    code: 6,
    name: "更换专业"
},
{
    code: 7,
    name: "待审核"
},
{
    code: 8,
    name: "审核不通过"
}
]
// 采购计划的物资属性
enum1.wuziType = [{
    name: "办公用品",
    code: "stationery"
},
{
    name: "计算机",
    code: "computers"
},
{
    name: "其他",
    code: "other"
},
]
//中标候选人公示状态
enum1.gongshiStatusOp = [
    // 0：未提交  1:审批不通过 2：审核中 3：审核通过 4：已发布
    {
        name: "未提交",
        code: 0
    },
    {
        name: "审批不通过",
        code: 1
    },
    {
        name: "审核中",
        code: 2
    },
    {
        name: "审核通过",
        code: 3
    },
    {
        name: "已发布",
        code: 4
    }
]
//中标人状态
enum1.sureStatusOp = [{
    name: "未提交",
    code: 1001
}, {
    name: "",
    code: 0
},
{
    name: "审批不通过",
    code: 1011
},
{
    name: "审核中",
    code: 1009
},
{
    name: "未提交", //已发布
    code: 1012
}
] //中标结果状态
enum1.serultOp = [{
    name: "未提交",
    code: 0
},
{
    name: "未提交",
    code: 1001
},
{
    name: "审批不通过",
    code: 1011
},
{
    name: "审核中",
    code: 1009
},
{
    name: "审核通过",
    code: 1012
},
{
    name: "已发布",
    code: 4
},
]
// 复议状态
enum1.fuyiStatus = [{
    name: "未提交",
    code: 0
},
{
    name: "已提交",
    code: 1
},
{
    name: "审批不通过",
    code: 4
},
{
    name: "审核通过",
    code: 3
},
{
    name: "已发布",
    code: 2
},
]
// 项目板块
enum1.projectPlate = [{
    name: "总部",
    code: 1
},
{
    name: "电力",
    code: 2
},
{
    name: "交通",
    code: 3
},
{
    name: "矿业",
    code: 4
},
{
    name: "电子工程院",
    code: 5
},
{
    name: "中成",
    code: 6
},
{
    name: "外部",
    code: 7
},
{
    name: "贸易",
    code: 8
},
{
    name: "资产",
    code: 9
},
{
    name: "保险经纪",
    code: 10
},
{
    name: "高新",
    code: 11
},
]
enum1.projectPlate1 = [
    {
        name: "电力",
        code: 1
    },
    {
        name: "新能源",
        code: 2
    },
    {
        name: "供热",
        code: 3
    },
    {
        name: "燃气",
        code: 4
    },
    {
        name: "金融",
        code: 5
    },
    {
        name: "其他",
        code: 6
    },
]
// 协同目录
enum1.synergyDirectory = [{
    value: "A",
    label: "金融类业务协同",
    children: [{
        value: "A01",
        label: "证券",
        children: [{
            value: "A011",
            label: "债券承销业务"
        },
        {
            value: "A012",
            label: "股权融资业务"
        },
        {
            value: "A013",
            label: "证券开户、证券交易、金融产品代销、投资理财、资产管理、资产配置和资产证券化融资业务"
        },
        {
            value: "A014",
            label: "财务顾问业务"
        },
        {
            value: "A015",
            label: "发行各类公募基金产品、私募基金产品或作为主要出资方投资基金产品"
        },
        {
            value: "A016",
            label: "经公司总部批准实施委托投资（低风险理财）业务"
        },
        ]
    },
    {
        value: "A02",
        label: "期货、担保",
        children: [{
            value: "A021",
            label: "期货业务"
        },
        {
            value: "A022",
            label: "担保业务、电子保函等业务"
        },
        ]
    },
    {
        value: "A03",
        label: "资金管理、银团贷款",
        children: [{
            value: "A031",
            label: "境内资金沉淀归集（除行业主管部门有特殊要求的）、电子商业汇票托收清算、非金融企业间的跨境资金通道业务、代理付款等业务"
        },
        {
            value: "A032",
            label: "银团贷款融资顾问业务"
        },
        {
            value: "A033",
            label: "代理收款、即期结售汇、经常项目跨境付款业务"
        },
        ]
    },
    {
        value: "A04",
        label: "境外业务、融资租赁",
        children: [{
            value: "A041",
            label: "境外证券业务，公开发行股票、收购兼并重组、发行债券、融券顾问、证券承销、股票债券和外汇的交易、投资、资产管理、上市股份托管等"
        },
        {
            value: "A042",
            label: "境外筹融资、境外结售汇等境外资金业务"
        },
        {
            value: "A043",
            label: "融资租赁业务"
        },
        ]
    },
    ]
},
{
    value: "B",
    label: "服务类业务协同",
    children: [{
        value: "B01",
        label: "采购代理",
        children: [{
            value: "B011",
            label: "招标采购、非招标采购代理业务"
        },]
    },
    {
        value: "B02",
        label: "保险采购及保险经纪服务",
        children: [{
            value: "B021",
            label: "财产保险、责任保险及短期意外保险经纪服务业务"
        },
        {
            value: "B022",
            label: "健康保险、医疗保险经纪服务业务"
        },
        ]
    },
    {
        value: "B03",
        label: "资产处置",
        children: [{
            value: "B031",
            label: "产权转让交易经纪业务"
        },
        {
            value: "B032",
            label: "资产委托处置业务"
        },
        ]
    },
    {
        value: "B04",
        label: "人力资源",
        children: [{
            value: "B041",
            label: "对外劳务合作业务"
        },
        {
            value: "B042",
            label: "人员招聘、劳务派遣、业务外包、咨询等人力资源服务业务"
        },
        ]
    },
    {
        value: "B05",
        label: "信息化",
        children: [{
            value: "B051",
            label: "公司统一要求的信息系统、网络安全和基础设施以外的信息化项目建设"
        },
        {
            value: "B052",
            label: "企业电子数据调查取证、大数据、信息安全、网络安全服务等"
        },
        ]
    },
    {
        value: "B06",
        label: "工业与民用建筑工程相关业务",
        children: [{
            value: "B061",
            label: "工业与民用建筑、风力发电、太阳能发电、生物质发电、垃圾发电、氢能等工程项目总承包、可研、咨询、设计、监理、环境和节能评价、施工图审查等业务"
        },]
    },
    {
        value: "B07",
        label: "生态环保",
        children: [{
            value: "B071",
            label: "工业废水处理业务"
        },
        {
            value: "B072",
            label: "生活污水处理、河道治理、生态修复业务"
        },
        {
            value: "B073",
            label: "固废、危废处理及综合利用业务"
        },
        {
            value: "B074",
            label: "废气和含 VOCs 尾气处理（催化氧化、尾气洗涤塔、冷凝吸附和回收、地面火炬等），烟气净化（脱硫、脱硝、除尘、除二噁英等）业务"
        },
        ]
    },
    {
        value: "B08",
        label: "咨询",
        children: [{
            value: "B081",
            label: "采购相关咨询、境外投资机会研究、管理咨询等业务"
        },
        {
            value: "B082",
            label: "宏观经济、证券市场、国家产业、个体公司的研究与分析以及估值和财务培训等业务"
        },
        {
            value: "B083",
            label: "政策咨询及规划研究、区域及产业规划研究、项目评估咨询、投资机会研究和可行性研究等业务"
        },

        ]
    },
    {
        value: "B09",
        label: "会议、培训",
        children: [{
            value: "B091",
            label: "在符合相关要求和标准的基础上，境内会议服务业务"
        },
        {
            value: "B092",
            label: "在符合相关要求和标准的基础上，北京地区会议、培训场地等需求"
        },
        {
            value: "B093",
            label: "在符合相关要求和标准的基础上，厦门地区会议、培训场地等需求"
        },

        ]
    },
    {
        value: "B10",
        label: "进出口、清关",
        children: [{
            value: "B101",
            label: "货物清关、仓储物流等进出口相关业务"
        },]
    },
    ]
},
{
    value: "C",
    label: "区域内业务协同",
    children: [{
        value: "C01",
        label: "企业自有资源协同",
        children: [{
            value: "C011",
            label: "地理位置接近的公司各级企业应主动沟通对接，共同搭建区域业务协同平台"
        }]
    },
    {
        value: "C02",
        label: "社会化服务资源协同",
        children: [{
            value: "C021",
            label: "公司各级企业应积极共享本企业的协议优惠差旅住宿、会议服务、物业、保安、餐饮、图文印刷、交通运输、医疗体检等社会化服务资源"
        },
        {
            value: "C022",
            label: "地理位置接近且具备条件的公司各级企业，应共同协商、打捆签订上述相关社会化服务协议、合同等"
        }
        ]
    },
    {
        value: "C03",
        label: "港电协同",
        children: [{
            value: "C031",
            label: "港电协同"
        }]
    },
    {
        value: "C04",
        label: "直供电、供热、供汽等协同",
        children: [{
            value: "C041",
            label: "公司各级企业的大用户直供电以及供热、供汽、粉煤灰、脱硫石膏等需求"
        }]
    },
    ]
}
]
//采购部门
enum1.purchaseDeptName = [
    {
        code: 0,
        name: "党委办公室"
    },
    {
        code: 1,
        name: "董事会办公室"
    },
    {
        code: 2,
        name: "经理办公室"
    },
    {
        code: 3,
        name: "党委宣传部"
    },
    {
        code: 4,
        name: "工会"
    },
    {
        code: 5,
        name: "党委组织部（党委统战部）"
    },
    {
        code: 6,
        name: "人力资源部"
    },
    {
        code: 7,
        name: "纪委"
    },
    {
        code: 8,
        name: "监察专员办公室"
    },
    {
        code: 9,
        name: "审计部"
    },
    {
        code: 10,
        name: "法规部"
    },
    {
        code: 11,
        name: "财务部"
    },
    {
        code: 12,
        name: "资产管理部"
    },
    {
        code: 13,
        name: "综合计划部"
    },
    {
        code: 14,
        name: "安全环保部"
    },
    {
        code: 15,
        name: "信息中心"
    },
    {
        code: 16,
        name: "资本运营部（金融产业部）"
    },
    {
        code: 17,
        name: "电力产业部"
    },
    {
        code: 18,
        name: "燃气产业部"
    },
    {
        code: 19,
        name: "供热产业部"
    },
    {
        code: 20,
        name: "新能源产业部"
    },
]
//采购依据
enum1.ProcurementBasis = [
    {
        name: "年度投资计划",
        code: 1
    },
    {
        name: "年度预算",
        code: 2
    },
]
// 电煤采购类型
enum1.dianmeicaigouType = [{
    name: "长协煤",
    code: 1
},
{
    name: "市场煤",
    code: 2
},
]
// 谈判类型枚举   搜索
enum1.tanpanleixing = [{
    name: "自行谈判",
    code: 1
},
{
    name: "集中谈判",
    code: 2
},
{
    name: "全部",
    code: ""
},
]
// 谈判类型枚举  显示
enum1.tanpanleixingShow = [{
    name: "自行谈判",
    code: 1
},
{
    name: "集中谈判",
    code: 2
},
]
// 电煤品种
enum1.dianmeipinzhong = [{
    name: "精煤",
    code: 1
},
{
    name: "洗选煤",
    code: 2
},
{
    name: "筛选煤",
    code: 3
},
{
    name: "原煤",
    code: 4
},
{
    name: "低质煤",
    code: 5
},
]
// 交货方式
enum1.jiaohuofangshi = [{
    name: "平仓交货",
    code: 1
},
{
    name: "其他",
    code: 2
},
]
// 运输方式
enum1.yunshoufangshi = [{
    name: "船舶运输",
    code: 1
},
{
    name: "铁路运输",
    code: 2
},
{
    name: "公路运输",
    code: 3
},
]

/** 页面行为常量 **/
enum1.PageBehaviour = {
    add: { name: "add", code: 0, label: "新增" },
    delete: { name: "delete", code: 1, label: "删除" },
    edit: { name: "edit", code: 2, label: "编辑" },
    readonly: { name: "readonly", code: 3, label: "查看" }
}

/** 单位常量 **/
enum1.Units = [{ value: 0, label: "元" }, { value: 1, label: "%" }];

/** 竞价类型 **/
enum1.JingJiaTypes = [
    { code: 1, name: "自由竞价" },
    { code: 2, name: "单轮竞价" },
]

// 不良行为的审核状态 审核状态
enum1.auditStatusOption= [{
    code: 0,
    name: '未提交'
},{
    code: 1,
    name: '审核中'
},{
    code: 2,
    name: '审核不通过'
},{
    code: 3,
    name: '审核通过'
}
];
// 审核页面
enum1.auditStatusOption1= [{
    code: 0,
    name: '未提交'
},{
    code: 1,
    name: '待审核'
},{
    code: 2,
    name: '审核不通过'
},{
    code: 3,
    name: '审核通过'
}
];
//费用类型
enum1.belongToOptions=[
    {
        code: 0,
        name: '外部供应商'
    },{
        code: 1,
        name: '内部供应商'
    }
];
enum1.happenStageOptions= [
    // {
    //     code: 1,
    //     name: '准入申请'
    // },
    {
        code: 2,
        name: '采购活动'
    },{
        code: 3,
        name: '合同履约'
    }
];
// enum1.badBehaviorOption= [{
//         code: 1,
//         name: '用不正当手段获取准入资格'
//     },{
//         code: 2,
//         name: '提供虚假材料获取中标'
//     },{
//         code: 3,
//         name: '不按照合同进行生产'
//     },{
//         code: 4,
//         name: '不按投标时的承诺履行合同'
//     },{
//         code: 5,
//         name: '供应商售后服务不到位'
//     }
// ];
enum1.badBehaviorOption= [{
    code: 1,
    name: '投标截止后，非招标人、采购人原因撤销其投标行为，导致项目无法正常开评标的'
},{
    code: 2,
    name: '中标后以不正当理由不签约或签约后以不正当理由不履行或不守信的'
},{
    code: 3,
    name: '擅自向第三方转让生产供货或提供服务的'
},{
    code: 4,
    name: '严重违反合同约定，擅自降低产品、货物或工程质量、等级和售后服务，或者产品、货物、工程或服务存在严重质量问题的'
},{
    code: 5,
    name: '严重违反合同约定，未能完成全部供货、服务或者工程项目，中途停止配送、施工或者变相增加费用的'
},{
    code: 6,
    name: '捏造事实、提供虚假材料或者假冒他人名义进行投标的'
},{
    code: 7,
    name: '无正当理由拒不按照《天津能源集团电子商务平台招投标活动质疑及投诉管理办法（试行）》的规定配合进行异议、投诉调查的'
},{
    code: 8,
    name: '在招标、采购活动中，违反廉洁工作规定的'
},{
    code: 9,
    name: '供应商的其他不良行为'
}
];
// 审核列表的状态
enum1.shenheStatusOptions= [{
    code: 3,
    name: '未通过'
},{
    code: 4,
    name: '已通过'
}
];
enum1.punishResultOption= [{
        code: 0,
        name: '已恢复资格'
    },{
        code: 1,
        name: '暂停资格'
    },{
        code: 2,
        name: '暂停资格6个月'
    },{
        code: 3,
        name: '暂停资格2年'
    }
];

export default enum1