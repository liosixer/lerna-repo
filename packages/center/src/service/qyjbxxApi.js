import loginSvs from './login'
import request from "../api";

const qyjbxx = {
    //企业基本信息查询
    queryQiYeBaseInfo: (data) => {
        return request({
            url: `/qiye/queryQiYeBaseInfo`,
            data: data,
            method: 'post'
        })
    },
    revokeApproval(data){
        return request({
            url: `/approveFlow/callbackFlow.do`,
            data: data,
            method: 'GET'
        })
    },
    // 账号申诉审核列表
    zhangHaoShenSuQueryList(data){
        return request({
            url: `/zhanghaoshensu/queryList`,
            data: data,
            method: 'POST'
        })
    },
    // 账号申诉审核详情
    zhangHaoShenSudetail(data){
        return request({
            url: `/zhanghaoshensu/detail`,
            data: data,
            method: 'GET'
        })
    },
    // 账号申诉审核通过、不通过
    zhangHaoShengSuShenHe(data){
        return request({
            url: `/zhanghaoshensu/zhangHaoShengSuShenHe`,
            data: data,
            method: 'POST'
        })
    },

    ...loginSvs
};
export default qyjbxx;