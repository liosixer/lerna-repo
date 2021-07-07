import request from '../api/index';

const logManagement = {
  /**
   * 操作日志
   */
  // 操作系统
  fetchSystemType: data => {
    return request({
      url: `/api/operateLog/getXiTong.do`,
      data: data,
      method: 'GET'
    })
  },
  // 操作事项类型
  fetchMatterType: data => {
    return request({
      url: `/api/operateLog/getShiXiangByXiTong.do`,
      data: data,
      method: 'GET'
    })
  },
  // 列表
  fetchOperateLogList: (data) => {
    return request({
      url: `/api/operateLog/getList.do`,
      data: data,
      method: 'GET'
    })
  },
  // 详情
  fetchOperateLogDetail: (data) => {
    return request({
      url: `/api/operateLog/detail.do`,
      data: data,
      method: 'GET'
    })
  },
}

export default logManagement