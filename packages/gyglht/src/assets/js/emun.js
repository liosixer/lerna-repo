let enum1 = new Object()

//项目类型
enum1.ProjectType = [{
        value: 1,
        label: "工程"
    },
    {
        value: 2,
        label: "服务"
    },
    {
        value: 3,
        label: "物资"
    }
];
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
enum1.xmXingZhi = [{
        value: 1,
        label: "大中型基建"
    },
    {
        value: 2,
        label: "小型工程"
    },
    {
        value: 3,
        label: "生产运营"
    },
    {
        value: 4,
        label: "经营管理"
    },
    {
        value: 5,
        label: "工程承包"
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
        value: 6,
        label: "询比采购"
    },
    {
        value: 7,
        label: "竞争性谈判"
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
export default enum1