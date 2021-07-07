import request from '../api/index';

const costManage = {
    /*
    * 获取订单分页数据
    * */
    orderfindPage: (data) => {
        console.log(data)
        return request({
            url: `/order/xmjl/findPage.do`,
            data: data,
            method: 'POST',
        })
    },
/*
    * 获取订单分页数据
    * */
    getApplyInfoInOrderWay: (data) => {
        return request({
            url: `/refund/apply/getApplyInfoInOrderWay.do`,
            data: data,
            method: 'GET'
        })
    },
    /*
    * 保存更新订单
    * */
    saveOrUpdateApplyInOrderWay: (data) => {
        return request({
            url: `/refund/apply/saveOrUpdateApplyInOrderWay.do`,
            data: data,
            method: 'POST'
        })
    },
    /*
    * 提交审核
    * */
    submitApply: (data) => {
        return request({
            url: `/refund/apply/submitApply.do`,
            data: data,
            headers: {
                contentType: 'formType'
            },
            method: 'POST'
        })
    },
    /*
    * 撤回退款申请
    * */
    withdrawApplyInOrderWay: (data) => {
        return request({
            url: `/refund/apply/withdrawApplyInOrderWay.do`,
            data: data,
            headers: {
                contentType: 'formType'
            },
            method: 'POST'
        })
    },
    /*
    * 获取标书列表
    * */
    biaoshuPageList: (data) => {
        return request({
            url: `/zbwjFyManager/page.do`,
            data: data,
            method: 'POST'
        })
    },
    /*
    * 标书费缴纳情况
    * */
    biaoshuPageDetail: (data) => {
        return request({
            url: `/zbwjFyManager/detail.do`,
            data: data,
            method: 'GET'
        })
    },
    /*
    * 平台服务费列表
    * */
    ptfwfManagerPage: (data) => {
        return request({
            url: `/ptfwfManager/page.do`,
            data: data,
            method: 'POST'
        })
    },
    /*
    * 平台服务费详情
    * */
    ptfwfManagerDetail: (data) => {
        return request({
            url: `/ptfwfManager/detail.do`,
            data: data,
            method: 'GET'
        })
    },
    /*
    * 代理服务费列表
    * */
    dlfwfManagerPage: (data) => {
        return request({
            url: `/dlfwfManager/page.do`,
            data: data,
            method: 'POST'
        })
    },
    /*
    * 代理服务费详情
    * */
    dlfwfManagerDetail: (data) => {
        return request({
            url: `/dlfwfManager/detail.do`,
            data: data,
            method: 'GET'
        })
    },
    /*
    * 获取退款列表信息
    * */
    refundApplyPage: (data) => {
        return request({
            url: `/refund/apply/page.do`,
            headers: {
                contentType: 'formType'
            },
            data: data,
            method: 'POST'
        })
    },
    /*
    * 获取退款详情信息
    * */
    getApplyInfoInGroupWay: (data) => {
        return request({
            url: `/refund/apply/getApplyInfoInGroupWay.do`,
            data: data,
            method: 'GET'
        })
    },
    /*
    * 获取标段信息
    * */
    getBdInfo: (data) => {
        return request({
            url: `/refund/apply/getBdInfo.do`,
            data: data,
            method: 'GET'
        })
    },
    /*
   * 获取可以申请退款的标段
   * */
    queryEnableChooseBd: (data) => {
        return request({
            url: `/refund/apply/queryEnableChooseBd.do`,
            data: data,
            headers: {
                contentType: 'formType'
            },
            method: 'POST'
        })
    },
    /*
    * 查询标段下允许退款的订单
    * */
    queryEnableOrders: (data) => {
        return request({
            url: `/refund/apply/queryEnableOrders.do`,
            data: data,
            headers: {
                contentType: 'formType'
            },
            method: 'POST'
        })
    },
    /*
    * 保存按项目方式退款申请信息
    * */
    saveApplyInGroupWay: (data) => {
        return request({
            url: `/refund/apply/saveApplyInGroupWay.do`,
            data: data,
            method: 'POST'
        })
    },
    /*
    * 更新按项目方式退款申请信息
    * */
    updateApplyInGroupWay: (data) => {
        return request({
            url: `/refund/apply/updateApplyInGroupWay.do`,
            data: data,
            method: 'POST'
        })
    },
    /*
    * 获取审核人列表
    * */
    getApproveUser: (data) => {
        return request({
            url: `/approveFlow/getApproveUser.do`,
            data: data,
            method: 'GET'
        })
    },
    /*
    * 撤回按项目方式的退款申请
    * */
    withdrawApplyInGroupWay: (data) => {
        return request({
            url: `/refund/apply/withdrawApplyInGroupWay.do`,
            data: data,
            headers: {
                contentType: 'formType'
            },
            method: 'POST'
        })
    },
    /*
    * 删除申请
    * */
    deleteApply: (data) => {
        return request({
            url: `/refund/apply/deleteApply.do`,
            data: data,
            headers: {
                contentType: 'formType'
            },
            method: 'POST'
        })
    },
    /*
    * 获取专家费列表
    * */
    zhuanJiaFeiManagerPage: (data) => {
        return request({
            url: `/zhuanJiaFeiManager/page.do`,
            data: data,
            method: 'POST'
        })
    },
    /*
    * 获取专家费详细页面
    * */
    zhuanJiaFeiManagerDetail: (data) => {
        return request({
            url: `/zhuanJiaFeiManager/detail.do`,
            data: data,
            // headers: {
            //     contentType: 'formType'
            // },
            method: 'GET'
        })
    },
    /*
    * 获取专家费审批撤回
    * */
    zhuanJiaFeiManagerRevoke: (data) => {
        return request({
            url: `/zhuanJiaFeiManager/revoke.do`,
            data: data,
            headers: {
                contentType: 'formType'
            },
            method: 'POST'
        })
    },
    /*
    * 专家费-新建选择标段
    * */
    queryBdForSel: (data) => {
        return request({
            url: `/zhuanJiaFeiManager/queryBdForSel.do`,
            data: data,
            method: 'POST'
        })
    },
    /*
    * 专家费-新建-通过标段获取详细信息
    * */
    queryDetailByGgBdGuid: (data) => {
        return request({
            url: `/zhuanJiaFeiManager/queryDetailByGgBdGuid.do`,
            data: data,
            method: 'GET'
        })
    },
    /*
    * 专家费保存或修改
    * */
    zhuanJiaFeiManagerSave: (data) => {
        return request({
            url: `/zhuanJiaFeiManager/save.do`,
            data: data,
            method: 'POST'
        })
    },
    /*
    * 专家费提交审核
    * */
    zhuanJiaFeiManagerCommit: (data) => {
        return request({
            url: `/zhuanJiaFeiManager/commit.do`,
            data: data,
            method: 'POST'
        })
    },
    /*
    * 专家费用-根据标段获取可使用的评审类型
    * */
    queryCanUserPsLeiXing: (data) => {
        return request({
            url: `/zhuanJiaFeiManager/queryCanUserPsLeiXing.do`,
            data: data,
            method: 'GET'
        })
    },
    /*
    * 获取审批人列表请求所需的参数
    * */
    getAuditorQueryParam: (data) => {
        return request({
            url: `/order/appflow/getAuditorQueryParam.do`,
            data: data,
            method: 'GET'
        })
    },
    /*
    * 获取分页数据（全部订单） 财务订单
    * */
    caiwuFindPage: (data) => {
        return request({
            url: `/order/caiwu/findPage.do`,
            data: data,
            headers: {
                contentType: 'formType'
            },
            method: 'POST'
        })
    },

    /*
    * 获取待开票的订单列表数据 财务订单
    * */
    caiwuFindNeedIssueInvPage: (data) => {
        return request({
            url: `/order/caiwu/findNeedIssueInvPage.do`,
            data: data,
            headers: {
                contentType: 'formType'
            },
            method: 'POST'
        })
    },

    /*
    * 获取待退款的订单列表数据 财务订单
    * */
    caiwuFindNeedRefundPage: (data) => {
        return request({
            url: `/order/caiwu/findNeedRefundPage.do`,
            data: data,
            headers: {
                contentType: 'formType'
            },
            method: 'POST'
        })
    },
    /*
    * 获取待退款的订单列表数据 财务订单
    * */
    caiwuGetOrderStatistic: (data) => {
        return request({
            url: `/order/caiwu/getOrderStatistic.do`,
            data: data,
            method: 'GET'
        })
    },
    /*
    * 开票接口调用
    * */
    invoiceIssue: (data) => {
        return request({
            url: `/invoice/issue.do`,
            data: data,
            headers: {
                contentType: 'formType'
            },
            method: 'POST'
        })
    },
    /*
    * 红冲接口调用
    * */
    invoiceWriteBack: (data) => {
        return request({
            url: `/invoice/writeBack.do`,
            data: data,
            headers: {
                contentType: 'formType'
            },
            method: 'POST'
        })
    },
    /*
    * 退款（调用支付系统进行退款）
    * */
    caiwuRefund: (data) => {
        return request({
            url: `/order/caiwu/refund.do`,
            data: data,
            headers: {
                contentType: 'formType'
            },
            method: 'POST'
        })
    },
    /*
    * 获取订单信息
    * */
    orderGetOrderInfo: (data) => {
        return request({
            url: `/order/getOrderInfo.do`,
            data: data,
            method: 'GET'
        })
    },
    /*
    * 保存发票
    * */
    invoiceEditFaPiao: (data) => {
        return request({
            url: `/invoice/editFaPiaoByCaiwu.do`,
            data: data,
            method: 'POST'
        })
    },
    /*
    * 获取下载发票地址
    * */
    invoiceGetUrl: (data) => {
        return request({
            url: `/invoice/getUrl.do`,
            data: data,
            method: 'GET'
        })
    },
    /*
    * 专家费用明细-删除
    * */
    deleteByRecordGuid: (data) => {
        return request({
            url: `/zhuanJiaFeiManager/deleteByRecordGuid.do`,
            data: data,
            method: 'GET'
        })
    },
    /*
    * 专家费用明细-添加/编辑
    * */
    saveAndEditZhuanJiaFeiRecordVO: (data) => {
        return request({
            url: `/zhuanJiaFeiManager/saveAndEditZhuanJiaFeiRecordVO.do`,
            data: data,
            method: 'POST'
        })
    },
    /*
    * 获取专家费列表-财务
    * */
    zhuanJiaFeiManagerPageForCwSys: (data) => {
        return request({
            url: `/zhuanJiaFeiManager/pageForCwSys.do`,
            data: data,
            method: 'POST'
        })
    },
    /*
    * 获取专家费详细页面-财务
    * */
    zhuanJiaFeiManagerDetailForCwSys: (data) => {
        return request({
            url: `/zhuanJiaFeiManager/detailForCwSys.do`,
            data: data,
            method: 'GET'
        })
    },
    /*
    * 专家费-数据推送-单推
    * */
    zhuanJiaFeiManagerPushDataByRecordGuid: (data) => {
        return request({
            url: `/zhuanJiaFeiManager/pushDataByRecordGuid.do`,
            data: data,
            method: 'GET'
        })
    },
    /*
    * 专家费-数据推送-批量推送
    * */
    zhuanJiaFeiManagerPushDataByBd: (data) => {
        return request({
            url: `/zhuanJiaFeiManager/pushDataByBd.do`,
            data: data,
            method: 'POST'
        })
    },
    /*
    * 专家费-获取获取专家列表
    * */
    queryCostPayerList: (data) => {
        return request({
            url: `/zhuanJiaFeiManager/queryCostPayerList.do`,
            data: data,
            method: 'GET'
        })
    },
    /*
    * 专家费-获取获取专家列表
    * */
   commit: (data) => {
        return request({
            url: `/zhuanJiaFeiManager/commit.do`,
            data: data,
            method: 'POST'
        })
    }
}
export default costManage