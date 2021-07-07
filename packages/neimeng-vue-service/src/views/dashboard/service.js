import request, { apiPrefix } from '@/api/index';

/**
 * 获取待办事项
 * @param {*} data
 * @returns
 */
export function getApproverecord(data) {
  return request({
    url: `${apiPrefix}/approverecord/list`,
    data: data,
    method: 'post',
    headers: {
      contentType: 'formType',
    },
  });
}

/**
 * 获取待办事项统计
 * @param {*} data
 * @returns
 */
export function getApproveRecordCount(data) {
  return request({
    url: `${apiPrefix}/approverecord/queryApproveRecordCount`,
    data: data,
    method: 'post',
    headers: {
      contentType: 'formType',
    },
  });
}

/**
 * 获取进行中的项目
 * @param {*} data
 * @returns
 */
export function getMyProject(data) {
  return request({
    url: `${apiPrefix}/projectbd/queryMyProjectBdList`,
    data: data,
    method: 'post',
    headers: {
      contentType: 'formType',
    },
  });
}

/**
 * 获取开标项目
 * @param {*} data
 * @returns
 */
export function getKbList(data) {
  return request({
    url: `${apiPrefix}/projectbd/queryCurrentKbList`,
    data: data,
    method: 'post',
    headers: {
      contentType: 'formType',
    },
  });
}
