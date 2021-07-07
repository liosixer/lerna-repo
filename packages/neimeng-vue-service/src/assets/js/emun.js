let enum1 = new Object()
import store from "../../store";

//项目类型
enum1.ProjectType = [{
        value: 0,
        label: "工程"
    },
    {
        value: 2,
        label: "服务"
    },
    {
        value: 1,
        label: "货物"
    }
];
if (store.state.logoType == 2) {
    enum1.ProjectType = [{
            value: 1,
            label: "货物"
        },
        {
            value: 2,
            label: "服务"
        },
        {
            value: 0,
            label: "工程"
        },
    ]
}
//组织形式
enum1.zuZhiXingShi = [{
        value: 2,
        label: "委托采购"
    },
    {
        value: 1,
        label: "自行采购"
    }
];
//项目性质
enum1.xmXingZhi = [
    // {
    //     value: 1,
    //     label: "大中型基建"
    // },
    // {
    //     value: 2,
    //     label: "小型工程"
    // },
    // {
    //     value: 3,
    //     label: "生产运营"
    // },
    // {
    //     value: 4,
    //     label: "经营管理"
    // },
    // {
    //     value: 5,
    //     label: "工程承包"
    // }
    {
        value: 2,
        label: "基建类",
    },
    {
        value: 3,
        label: "技改类",
    },
    {
        value: 4,
        label: "经营类",
    },
    {
        value: 5,
        label: "工程承包类",
    },
    {
        value: 6,
        label: "大宗物资类",
    },
    {
        value: 7,
        label: "运行维护类",
    },
    {
        value: 8,
        label: "设备维修、维保类",
    },
    {
        value: 9,
        label: "其他",
    }
];


//计划类型
enum1.PlanType = [{
    value: 1,
    label: "审计类计划"
}];
//代理费收取方式
enum1.AgencyFeeMethod = [{
        value: 1,
        label: "标准累进制",
        children: [{
            value: 1,
            label: "优惠"
        }, {
            value: 2,
            label: "不优惠"
        }, {
            value: 3,
            label: "其他"
        }]
    },
    {
        value: 2,
        label: "固定金额"
    },
    {
        value: 3,
        label: "固定比例"
    }
];
//合同类型
enum1.ContracType = [{
        value: 1,
        label: "整体项目合同"
    },
    {
        value: 2,
        label: "年度合同"
    },
    {
        value: 3,
        label: "单项合同"
    }
];
/** 委托合同状态 **/
enum1.ContractIdentityType = [{
        value: 1,
        label: "委托人",
    },
    {
        value: 2,
        label: "代理人"
    }
];
//保证金收取方式
enum1.DepositCollectionMethod = [{
        value: 1,
        label: "固定金额"
    },
    {
        value: 2,
        label: "固定比例"
    }
];
// 采购方式
enum1.PurchaseType = [{
        value: 1,
        label: "公开招标"
    },
    {
        value: 2,
        label: "邀请招标"
    },
    {
        value: 7,
        label: "谈判采购"
    },
    {
        value: 8,
        label: "磋商采购"
    },
    {
        value: 4,
        label: "单一来源"
    },
    {
        value: 10,
        label: "竞价"
    }
];
// 采购委托状态
enum1.entrustStatus = [{
        value: 1,
        label: "未提交"
    },
    {
        value: 2,
        label: "审核中"
    },
    {
        value: 3,
        label: "未通过"
    },
    {
        value: 4,
        label: "已通过"
    },
    {
        value: 5,
        label: "已建项"
    },
    {
        value: 6,
        label: "未建项"
    },
    {
        value: 7,
        label: "已指派"
    },
    {
        value: 8,
        label: "已委托"
    },
    {
        value: 9,
        label: "未接收"
    },
    {
        value: 10,
        label: "未指派"
    }
];
enum1.attachmentTypeOptions = [{
        value: 2001,
        label: "项目审批、核准或备案文件"
    },
    {
        value: 2002,
        label: "委托代理合同"
    },
    {
        value: 2003,
        label: "公告/邀请函"
    },
    {
        value: 2004,
        label: "招标文件/采购文件"
    },
    {
        value: 2005,
        label: "文件领购记录表"
    },
    {
        value: 2006,
        label: "澄清文件"
    },
    {
        value: 2007,
        label: "投标文件"
    },
    {
        value: 2008,
        label: "评委会信息"
    },

    {
        value: 2009,
        label: "开标一览表"
    },
    {
        value: 2010,
        label: "评标报告"
    },
    {
        value: 2011,
        label: "评标澄清"
    },
    {
        value: 2012,
        label: "中标候选人公示"
    },
    {
        value: 2013,
        label: "中标结果公示"
    },
    {
        value: 2014,
        label: "中标通知书"
    },
    {
        value: 2015,
        label: "采购合同"
    },
    {
        value: 2016,
        label: "审批记录"
    },
    {
        value: 2017,
        label: "定标文件"
    },
];
enum1.contractStatus = [{
            value: 1001,
            label: '未通过'
        },
        {
            value: 1009,
            label: '审核中'
        },
        {
            value: 1011,
            label: '审核不通过'
        },
        {
            value: 1012,
            label: '已生效/已通过'
        },
        {
            value: 1019,
            label: '已废弃'
        },
        {
            value: 1,
            label: '已发布'
        }
    ],
    enum1.stepsData = {
        allStepList: [
            //公开预审
            {
                label: '预审公告',
                value: 11,
                isDeal: true,
                active: false
            },
            {
                label: '预审文件',
                value: 12,
                isDeal: true,
                active: true
            },
            {
                label: '资审准备',
                value: 13,
                isDeal: true,
                active: false
            },
            {
                label: '开启',
                value: 14,
                isDeal: true,
                active: false
            },
            {
                label: '资格审查',
                value: 15,
                isDeal: true,
                active: false
            },
            {
                label: '资审结果',
                value: 16,
                isDeal: true,
                active: false
            },
            //公开后审
            {
                label: '招标公告',
                value: 21,
                isDeal: true,
                active: false
            },
            {
                label: '招标文件',
                value: 22,
                isDeal: true,
                active: true
            },
            {
                label: '标前准备',
                value: 23,
                isDeal: true,
                active: false
            },
            {
                label: '开标',
                value: 24,
                isDeal: true,
                active: false
            },
            {
                label: '评标',
                value: 25,
                isDeal: true,
                active: false
            },
            {
                label: '定标',
                value: 26,
                isDeal: true,
                active: false
            },
            {
                label: '标后',
                value: 27,
                isDeal: true,
                active: false
            },
            //邀请招标
            {
                label: '邀请函',
                value: 31,
                isDeal: true,
                active: false
            },
            {
                label: '招标文件',
                value: 32,
                isDeal: true,
                active: true
            },
            {
                label: '标前准备',
                value: 33,
                isDeal: true,
                active: false
            },
            {
                label: '开标',
                value: 34,
                isDeal: true,
                active: false
            },
            {
                label: '评标',
                value: 35,
                isDeal: true,
                active: false
            },
            {
                label: '定标',
                value: 36,
                isDeal: true,
                active: false
            },
            {
                label: '标后',
                value: 37,
                isDeal: true,
                active: false
            },
            //询比公开
            {
                label: '询比公告',
                value: 41,
                isDeal: true,
                active: false
            },
            {
                label: '采购文件',
                value: 42,
                isDeal: true,
                active: true
            },
            {
                label: '标前准备',
                value: 43,
                isDeal: true,
                active: false
            },
            {
                label: '开启',
                value: 44,
                isDeal: true,
                active: false
            },
            {
                label: '评审',
                value: 45,
                isDeal: true,
                active: false
            },
            {
                label: '成交',
                value: 46,
                isDeal: true,
                active: false
            },
            {
                label: '成交后',
                value: 47,
                isDeal: true,
                active: false
            },
            //询比邀请
            {
                label: '邀请函',
                value: 51,
                isDeal: true,
                active: false
            },
            {
                label: '采购文件',
                value: 52,
                isDeal: true,
                active: true
            },
            {
                label: '标前准备',
                value: 53,
                isDeal: true,
                active: false
            },
            {
                label: '开启',
                value: 54,
                isDeal: true,
                active: false
            },
            {
                label: '评审',
                value: 55,
                isDeal: true,
                active: false
            },
            {
                label: '成交',
                value: 56,
                isDeal: true,
                active: false
            },
            {
                label: '成交后',
                value: 57,
                isDeal: true,
                active: false
            },
            //竞争性谈判
            {
                label: '邀请函',
                value: 61,
                isDeal: true,
                active: false
            },
            {
                label: '采购文件',
                value: 62,
                isDeal: true,
                active: true
            },
            {
                label: '标前准备',
                value: 63,
                isDeal: true,
                active: false
            },
            {
                label: '开启',
                value: 64,
                isDeal: true,
                active: false
            },
            {
                label: '评审',
                value: 65,
                isDeal: true,
                active: false
            },
            {
                label: '成交',
                value: 66,
                isDeal: true,
                active: false
            },
            {
                label: '成交后',
                value: 67,
                isDeal: true,
                active: false
            },
            //单一来源
            {
                label: '邀请书',
                value: 71,
                isDeal: true,
                active: false
            },
            {
                label: '采购文件',
                value: 72,
                isDeal: true,
                active: true
            },
            {
                label: '标前准备',
                value: 73,
                isDeal: true,
                active: false
            },
            {
                label: '开启',
                value: 74,
                isDeal: true,
                active: false
            },
            {
                label: '评审',
                value: 75,
                isDeal: true,
                active: false
            },
            {
                label: '成交',
                value: 76,
                isDeal: true,
                active: false
            },
            {
                label: '成交后',
                value: 77,
                isDeal: true,
                active: false
            },
            //竞价公开
            {
                label: '竞价公告',
                value: 81,
                isDeal: true,
                active: false
            },
            {
                label: '竞价准备',
                value: 83,
                isDeal: true,
                active: false
            },
            {
                label: '竞价',
                value: 85,
                isDeal: true,
                active: false
            },
            {
                label: '成交',
                value: 86,
                isDeal: true,
                active: false
            },
            {
                label: '成交后',
                value: 87,
                isDeal: true,
                active: false
            },
            //竞价邀请
            {
                label: '邀请函',
                value: 91,
                isDeal: true,
                active: false
            },
            {
                label: '竞价准备',
                value: 93,
                isDeal: true,
                active: false
            },
            {
                label: '竞价',
                value: 95,
                isDeal: true,
                active: false
            },
            {
                label: '定标',
                value: 96,
                isDeal: true,
                active: false
            },
            {
                label: '标后',
                value: 97,
                isDeal: true,
                active: false
            },
            //竞争性谈判公开
            {
                label: '竞谈公告',
                value: 101,
                isDeal: true,
                active: false
            },
            {
                label: '采购文件',
                value: 102,
                isDeal: true,
                active: false
            },
            {
                label: '标前准备',
                value: 103,
                isDeal: true,
                active: false
            },
            {
                label: '开启',
                value: 104,
                isDeal: true,
                active: false
            },
            {
                label: '评审',
                value: 105,
                isDeal: true,
                active: false
            },
            {
                label: '成交',
                value: 106,
                isDeal: true,
                active: false
            },
            {
                label: '成交后',
                value: 107,
                isDeal: true,
                active: false
            }, {
                label: '标段异常流标',
                value: 999,
                isDeal: true,
                active: false
            }, {
                label: '标段异常终止',
                value: 888,
                isDeal: true,
                active: false
            },
            {value: 111, label: "邀请函", code: "Notice", isDeal: true, active: true},
            {value: 112, label: "采购文件", code: "BidFile", isDeal: true, active: false},
            {value: 113, label: "标前准备", code: "Tender", isDeal: true, active: false},
            {value: 114, label: "开启", code: "OpenTender", isDeal: true, active: false},
            {value: 115, label: "评审", code: "EvalTender", isDeal: true, active: false},
            {value: 116, label: "成交", code: "CaliTender", isDeal: true, active: false},
            { value: 117, label: "成交后", code: "AfterTender", isDeal: true, active: false },
            {value: 121, label: "磋商公告", code: "Notice", isDeal: true, active: true},
            {value: 122, label: "采购文件", code: "BidFile", isDeal: true, active: false},
            {value: 123, label: "标前准备", code: "Tender", isDeal: true, active: false},
            {value: 124, label: "开启", code: "OpenTender", isDeal: true, active: false},
            {value: 125, label: "评审", code: "EvalTender", isDeal: true, active: false},
            {value: 126, label: "成交", code: "CaliTender", isDeal: true, active: false},
            {value: 127, label: "成交后", code: "AfterTender", isDeal: true, active: false}
        ] //步骤条数据
    }
export default enum1