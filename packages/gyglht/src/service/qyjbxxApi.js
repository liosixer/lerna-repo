import loginSvs from './login'
import request from "../api";

const portService = {
    //企业基本信息查询
    queryQiYeBaseInfo: (data) => {
        return request({
            url: `/qiye/queryQiYeBaseInfo`,
            data: data,
            method: 'post'
        })
    },
    revokeApproval(data) {
        return request({
            url: `/approveFlow/callbackFlow.do`,
            data: data,
            method: 'GET'
        })
    },
    ...loginSvs
};
export default portService;