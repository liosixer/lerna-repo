const menuList = [
    {
        name: "交易用户管理",
        path: "",
        icon: "icon-xinxi",
        children: [
            {
                name: "注册信息查询",
                path: '/baseInfo/registerList'
            },
            {
                name: "基础信息审核",
                path: '/baseInfo/baseInfoCheck'
            },
            {
                name: "专业供应商审核",
                path: '/supplier/checked'
            },
            {
                name: "专业供应商管理",
                path: '/supplier/management'
            },
            {
                name: "账户申诉审核",
                path: '/baseInfo/accoutAppeal'
            },
            {
                name: "供应商专业标签",
                path: "/qyxxgl/gyszybq"
            },
            {
                name: "个人用户查询",
                path: "/qyxxgl/personalUser"
            },
            {
                name: "默认角色查询",
                path: "/qyxxgl/defaultRole"
            },
            {
                name: "正式企业信息",
                path: '/qyxxgl/zsqyxx'
            },
        ]
    },
    {
        name: "组织及用户管理",
        path: "",
        icon: "icon-ziyuan",
        children: [
            {
                name: "组织架构",
                path: "/userAndQxManage/zzjg"
            },
            {
                name: "角色管理",
                path: "/userAndQxManage/userManageTable"
            }
        ]
    },
    {
        name: "费用管理",
        path: "",
        icon: "icon-feiyongguanli1",
        children: [
            {
                name: "代理服务费设置",
                path: "/costManage/agentCost"
            },
            {
                name: "平台使用费设置",
                path: "/costManage/platformCost"
            }
        ]
    },
    {
        name: "日志管理",
        path: "",
        icon: "icon-rizhi",
        children: [
            {
                name: "操作日志",
                path: "/logManagement/operationLog"
            },
            {
                name: "文件日志",
                path: "/logManagement/fileLog"
            }
        ]
    },
    {
        name: "平台配置",
        path: "",
        icon: "icon-peizhiguanli",
        children: [
            {
                name: "收费规则设置",
                path: "/platformConfig/chargeRules"
            },
            {
                name: "采购用户管理",
                path: "/platformConfig/purchaseUserManagement"
            }
        ]
    }
];
export default  menuList
