import request, { apiPrefix } from '@/api/index';

/**
 * 获取我的项目
 * @param {*} data
 * @returns
 */
export function getMyProject(data) {
  return request({
    url: `${apiPrefix}/zhuanjiachouqu/list`,
    data: data,
    method: 'post',
    headers: {
      contentType: 'formType',
    },
  });
}
