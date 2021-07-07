import request from "../api/index";

const enterpriseEvaluate = {
  // 供应商评价-列表页
  fetchEvaluateList: (data) => {
      return request({
          url: `/api/supplierEvaluation/getList.do`,
          data: data,
          method: 'POST'
      })
  },
  // 供应商评价-详情页
  fetchEvaluateDetail: (data) => {
    return request({
        url: `/api/supplierEvaluation/detail.do`,
        data: data,
        method: 'GET'
    })
  },
  // 不良行为-列表页
  fetchMisconductList: (data) => {
    return request({
        url: `/api/badBehavior/getList.do`,
        data: data,
        method: 'POST'
    })
  },
  // 不良行为-详情页
  fetchMisconductDetail: (data) => {
    return request({
        url: `/api/badBehavior/detail.do`,
        data: data,
        method: 'GET'
    })
  },
};
export default enterpriseEvaluate