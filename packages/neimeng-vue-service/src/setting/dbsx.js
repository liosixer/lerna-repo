import marginManage from "./marginManage";

let dbsx = new Object()

/*
* 保证金退还的状态
* */

//费用类型
dbsx.costType = [
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
//项目经理退还申请审批状态：
dbsx.manageApplyBackStates = [
    {
        code: 0,
        name: "未提交"
    },
    {
        code: 1,
        name: "审批中"
    },
    {
        code: 2,
        name: "审批通过"
    },
    {
        code: 3,
        name: "审批驳回"
    },
    {
        code: 4,
        name: "审批撤回"
    },
    {
        code: 5,
        name: "审批失败"
    },
];

export default dbsx