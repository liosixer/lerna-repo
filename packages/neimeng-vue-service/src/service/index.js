import request, { apiPrefix } from '@/api/index';

/**
 * 获取服务器时间
 * @param {any} data
 * @returns
 */
export function getServeTime(data) {
  return request({
    url: `/GT_API/dict/getSystemTime.do`,
    data: data,
    method: 'get',
  });
}

/**
 * 获取用户信息
 * @param {any} data
 * @returns
 */
export function getUserInfo(data) {
  return request({
    url: '/GT_API/enum/getCurrentUser.do',
    data,
    method: 'GET',
  });
}
