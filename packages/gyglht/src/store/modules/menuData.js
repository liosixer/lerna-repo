export default {
    baseMenu: [
        {
            name: "企业信息",
            path: "",
            icon: "icon-xinxi",
            children: [
                {
                    name: "企业基本信息",
                    path: "/qyxxgl/qyjbxx"
                },
                {
                    name: "供应商专业申请",
                    path: "/qyxxgl/gyszyxx"
                },
                {
                    name: "企业完整信息",
                    path: "/qyxxgl/zsqyxx"
                },
                // {
                //     name: "采购制度上传",
                //     path: "/sys-manage/detail",
                // },
                // {
                //     name: "供应商评价结果",
                //     path: "/qyxxgl/evaluate"
                // },
                // {
                //     name: "供应商不良行为",
                //     path: "/qyxxgl/misconduct"
                // },
            ]
        }
    ],
    baseMenu2: [
        {
            name: "企业信息",
            path: "",
            icon: "icon-xinxi",
            children: [
                {
                    name: "企业基本信息",
                    path: "/qyxxgl/qyjbxx"
                },
                {
                    name: "企业完整信息",
                    path: "/qyxxgl/zsqyxx"
                },
                // {
                //     name: "采购制度上传",
                //     path: "/sys-manage/detail",
                // }
            ]
        }
    ],
    baseMenu3: [
        {
            name: "企业信息",
            path: "",
            icon: "icon-xinxi",
            children: [
                {
                    name: "企业基本信息",
                    path: "/qyxxgl/qyjbxx"
                },
                {
                    name: "企业完整信息",
                    path: "/qyxxgl/zsqyxx"
                },
                {
                    name: "采购制度上传",
                    path: "/sys-manage/detail",
                }
            ]
        }
    ],
    baseMenu4: [
        {
            name: "企业信息",
            path: "",
            icon: "icon-xinxi",
            children: [
                {
                    name: "企业基本信息",
                    path: "/qyxxgl/qyjbxx"
                },
                {
                    name: "供应商专业申请",
                    path: "/qyxxgl/gyszyxx"
                },
                {
                    name: "企业完整信息",
                    path: "/qyxxgl/zsqyxx"
                },
                {
                    name: "采购制度上传",
                    path: "/sys-manage/detail",
                },

                // {
                //     name: "供应商评价结果",
                //     path: "/qyxxgl/evaluate"
                // },
                // {
                //     name: "供应商不良行为",
                //     path: "/qyxxgl/misconduct"
                // },
            ]
        }
    ],
    appendMenu: [
        {
            name: "用户权限",
            path: "",
            icon: "icon-caigoujihua",
            children: [
                {
                    name: "组织架构",
                    path: "/userAndQxManage/zzjg"
                },
                {
                    name: "角色管理",
                    path: "/userAndQxManage/userManageTable"
                },
                {
                    name: "审批管理",
                    path: "/spManage/spLevelSz"
                }
            ]
        },
        // {
        //     name: "审批管理",
        //     path: "",
        //     icon: "icon-daiban",
        //     children: [
        //         {
        //             name: "审批级别设置",
        //             path: "/spManage/spLevelSz"
        //         }
        //     ]
        // },
        {
            name: "人员管理",
            path: "",
            icon: "icon-weituo",
            children: [
                {
                    name: "招标人代表库",
                    path: "/zbrdb/zbrdbTable"
                },
                {
                    name: "监标人库",
                    path: "/zbrdb/jbrdbTable"
                },
            ]
        },
        {
            name: "业务监管",
            path: "",
            icon: "icon-shangbiaoyiyidabian",
            children: [
                // {
                //     name: "监管人员设置",
                //     path: "/superviseManage/superviseRsz"
                // },
                {
                    name: "监管单位设置",
                    path: "/superviseManage/superviseDwsz"
                }
            ]
        },
        {
            name: "个性化配置",
            path: "",
            icon: "icon-xiangmuguanli",
            children: [
                {
                    name: "供应商专业标签",
                    path: "/qyxxgl/gyszybq"
                },
                {
                    name: "专业审核权限管理",
                    path: "/spec-check-auth"
                },
                {
                    name: "采购计划权限管理",
                    path: "/spec-check-auth-plan"
                },
                {
                    name: "采购立项权限管理",
                    path: "/spec-check-auth-project"
                }
            ]
        }

    ]
}
