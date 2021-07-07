let logManagement = new Object()

// 系统类型
logManagement.systemType = [
  {
    code: 1,
    name: "采购系统"
  },
  {
    code: 2,
    name: "招标系统"
  },
  {
    code: 3,
    name: "服务系统"
  },
  {
    code: 4,
    name: "监督系统"
  },
  {
    code: 5,
    name: "企业控制台"
  },
  {
    code: 6,
    name: "平台控制中心"
  },
]

// 文件状态
logManagement.fileStatus = [
  { code: 0, name: "异常" },
  { code: 1, name: "正常" },
]

// 操作类型
logManagement.operateType = [
  { code: 1, name: "登录" },
  { code: 2, name: "保存" },
  { code: 3, name: "变更" },
  { code: 4, name: "驳回" },
  { code: 5, name: "补抽" },
  { code: 6, name: "补遗" },
  { code: 7, name: "查看" },
  { code: 8, name: "查看复议" },
  { code: 9, name: "查看异议" },
  { code: 10, name: "撤回" },
  { code: 11, name: "撤回复议" },
  { code: 12, name: "撤销" },
  { code: 13, name: "冲销" },
  { code: 14, name: "处理" },
  { code: 15, name: "答复" },
  { code: 16, name: "递交" },
  { code: 17, name: "对账成功" },
  { code: 18, name: "对账失败" },
  { code: 19, name: "发起复议" },
  { code: 20, name: "废弃" },
  { code: 21, name: "分发" },
  { code: 22, name: "分派" },
  { code: 23, name: "分配角色" },
  { code: 24, name: "分配权限" },
  { code: 25, name: "更换头像" },
  { code: 26, name: "关注" },
  { code: 27, name: "换专业" },
  { code: 28, name: "缴纳" },
  { code: 29, name: "接收" },
  { code: 30, name: "结束竞价" },
  { code: 31, name: "结束开标" },
  { code: 32, name: "结束评标" },
  { code: 33, name: "今日项目" },
  { code: 34, name: "进入" },
  { code: 35, name: "进入竞价大厅" },
  { code: 36, name: "进入开标会" },
  { code: 37, name: "进入评标会" },
  { code: 38, name: "进入项目" },
  { code: 39, name: "开始竞价" },
  { code: 40, name: "开始开标" },
  { code: 41, name: "开始评标" },
  { code: 42, name: "签收" },
  { code: 43, name: "切换至CA办理平台" },
  { code: 44, name: "切换至采购系统" },
  { code: 45, name: "切换至供应商系统" },
  { code: 46, name: "切换至监管系统" },
  { code: 47, name: "切换至控制中心" },
  { code: 48, name: "切换至运营系统" },
  { code: 49, name: "切换至专家系统" },
  { code: 50, name: "取消关注" },
  { code: 51, name: "取消管理" },
  { code: 52, name: "删除" },
  { code: 53, name: "设置" },
  { code: 54, name: "申请退款" },
  { code: 55, name: "审核" },
  { code: 56, name: "提交复议" },
  { code: 57, name: "添加" },
  { code: 58, name: "退出" },
  { code: 59, name: "退还" },
  { code: 60, name: "下载" },
  { code: 61, name: "下载发票" },
  { code: 62, name: "下载文件" },
  { code: 64, name: "修改密码" },
  { code: 65, name: "异常" },
  { code: 66, name: "支付" },
  { code: 67, name: "指派" },
  { code: 68, name: "终止" },
  { code: 69, name: "开票" },
  { code: 70, name: "红冲" },
  { code: 71, name: "允许退还" },

]

export default logManagement