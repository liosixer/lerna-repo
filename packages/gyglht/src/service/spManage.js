import request from '../api/index';

const spManage = {
    //查询审批级别列表
    queryShenPiShiXiangList: (data) => {
        return request({
            url: `/shenpi/queryShenPiShiXiangList`,
            data: data,
            method: 'get'
        })
    },
    //查询审批人员信息
    queryShenPiRenYuan: (data) => {
        return request({
            url: `/shenpi/queryShenPiRenYuan`,
            data: data,
            method: 'get'
        })
    },
    //保存审批人员设置信息
    saveShenPiRenYuan: (data) => {
        return request({
            url: `/shenpi/saveShenPiRenYuan`,
            data: data,
            method: 'post'
        })
    },
    //查询所有审批人员信息
    querySubShenPiRenYuan: (data) => {
        return request({
            url: `/shenpi/querySubShenPiRenYuan`,
            data: data,
            method: 'get'
        })
    },
    //查询专业审核权限列表
    querySpecCheckAuthList: (data) => {
        return request({
            url: `/zyshqx/pageList`,
            data: data,
            method: 'post'
        })
    },
    //查询专业审核权限设置单个
    SpecCheckAuthSetOne: (data) => {
        return request({
            url: `/zyshqx/updateStatusOne`,
            data: data,
            method: 'post',
            headers: {
                contentType: 'formType'
            }
        })
    },
    //查询专业审核权限设置单个
    SpecCheckAuthSetAll: (data) => {
        return request({
            url: `/zyshqx/updateStatusAll`,
            data: data,
            method: 'post',
            headers: {
                contentType: 'formType'
            }
        })
    },
}
export default spManage