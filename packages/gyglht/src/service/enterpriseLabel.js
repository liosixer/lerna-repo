import request from "../api/index";

const enterpriseLabel = {
    // 列表页
    fetchLabelList: (data) => {
        return request({
            url: `/api/zhuanYeBiaoQian/getList.do`,
            data: data,
            method: 'GET'
        })
    },
    // 详情页
    fetchLabelDetail: (data) => {
      return request({
          url: `/api/zhuanYeBiaoQian/detail.do`,
          data: data,
          method: 'GET'
      })
  },
  // 删除
  fetchDelLabel: (data) => {
    return request({
        url: `/api/zhuanYeBiaoQian/delete.do`,
        data: data,
        method: 'GET'
    })
  },
  // 保存
  fetchSaveLabel: (data) => {
    return request({
        url: `/api/zhuanYeBiaoQian/save.do `,
        data: data,
        method: 'POST',
    })
  },
  // 行业分类
  enumIndustryClassify: (data) => {
    return request({
      url: `/enum/industryClassify.do`,
      data: data,
      method: 'GET'
    })
  },
  // 采购单位
  fetchPurchaseAgency: (data) => {
    return request({
      url: `/api/zhuanYeBiaoQian/getSuoShuDanWei.do`,
      data: data,
      method: 'GET'
    })
  },
  // 供应商
  fetchSupplier: (data) => {
    return request({
      url: `/api/zhuanYeBiaoQian/getZhuanYeGongYingShang.do`,
      data: data,
      method: 'GET'
    })
  },
  // 是否设置电煤采购
  fetchSetDianmei: (data) => {
    return request({
      url: `/api/zhuanYeBiaoQian/dianmei.do`,
      data: data,
      method: 'GET'
    })
  },
};
export default enterpriseLabel