let enum1 = new Object()


//项目类型
enum1.projectType = [{
    code: 1,
    name: "工程"
},
    {
        code: 2,
        name: "服务"
    },
    {
        code: 3,
        name: "货物"
    }
];
//组织形式
enum1.zuZhiXingShi = [{
    code: 1,
    name: "委托采购"
},
    {
        code: 2,
        name: "自行采购"
    }
];
//项目性质
enum1.projectNature = [{
    code: 1,
    name: "大中型基建"
},
    {
        code: 2,
        name: "小型工程"
    },
    {
        code: 3,
        name: "生产运营"
    },
    {
        code: 4,
        name: "经营管理"
    },
    {
        code: 5,
        name: "工程承包"
    }
];
//计划类型
enum1.PlanType = [{
    code: 1,
    name: "审计类计划"
}];
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
        code: 3,
        name: "询比采购"
    },
    {
        code: 4,
        name: "竞争性谈判"
    },
    {
        code: 5,
        name: "单一来源"
    },
    {
        code: 6,
        name: "竞价"
    }
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
enum1.meetingtype = [
    {
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
];
//事项类型
enum1.singstype = [
    {
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
        name: "中标候选人"
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
        code: '2014',
        name: "代理人采购委托"
    },
];
//递交方式
enum1.sendType = [
    {
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
enum1.sendStatus = [
    {
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
enum1.computeType = [
    {
        code: 1,
        name: "固定金额"
    },
    {
        code: 2,
        name: "固定比例"
    }
];
//投标文件加密情况
enum1.secType = [
    {
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
enum1.fileSendType = [
    {
        code: 0,
        name: "未递交"
    },
    {
        code: 1,
        name: "已递交"
    }
];
//公告状态
enum1.noticeStatus = [
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
];
// 异议阶段
enum1.yiyijiedianType = [{
    code: 2,
    name: "资格预审文件"
},
    {
        code: 3,
        name: "招标文件"
    },
    {
        code: 7,
        name: "中标候选人公示"
    },
    {
        code: 8,
        name: "开标"
    },
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
enum1.contractType = [
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
        name: "未通过"
    },
    {
        code: 1012,
        name: "已通过"
    },
]
// 文件类别名称
enum1.fileTypeName = [
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
]
// 采购计划类型
enum1.cgPlanType = [
    {
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
        code: 1,
        name: "未提交"
    },
    {
        code: 2,
        name: "审核中"
    },
    {
        code: 3,
        name: "未通过"
    },
    {
        code: 4,
        name: "已通过"
    },
    {
        code: 5,
        name: "已使用"
    },
]
// 专家等级
enum1.expertLeval = [
    {
        code: 0,
        name: "资深专家"
    },
    {
        code: 1,
        name: "普通专家"
    }
]
// 专业级别
enum1.specialLeval = [
    {
        code: 10,
        name: "第一专业"
    },
    {
        code: 20,
        name: "第二专业"
    }
]
// 会议室预约状态
enum1.meetappointStatus = [
    {
        code: 1,
        name: "未提交"
    },
    {
        code: 2,
        name: "已提交"
    },
    {
        code: 3,
        name: "审核不通过"
    },
    {
        code: 4,
        name: "已生效"
    }
]
// 中标形式
enum1.caliType = [
    {
        code: 1,
        name: "中标价"
    },
    {
        code: 2,
        name: "下浮率"
    },
    {
        code: 3,
        name: "其他"
    }
]
// 收取方式
enum1.shouquType = [
    {
        code: 1,
        name: "标准累进制"
    },
    {
        code: 2,
        name: "固定金额"
    },
    {
        code: 3,
        name: "固定比例"
    }
]
// 优惠方式
enum1.youhuiType = [
    {
        code: 1,
        name: "优惠"
    },
    {
        code: 2,
        name: "不优惠"
    },
    {
        code: 3,
        name: "其他"
    }
]
// 抽取方式
enum1.chouquType = [
    {
        code: 10,
        name: "随机抽取"
    },
    {
        code: 20,
        name: "直接抽取"
    }
]
// 通知方式
enum1.tongzhiType = [
    {
        code: 10,
        name: "语音通知"
    },
    {
        code: 20,
        name: "人工通知"
    },
    {
        code: 30,
        name: "自主通知"
    }
]
// 评审类型
enum1.evalType = [
    {
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
enum1.expertLib = [
    {
        code: 'PSZJK',
        name: "评审专家库"
    },
    {
        code: 'PBZJK',
        name: "评标专家库"
    }
]
export default enum1