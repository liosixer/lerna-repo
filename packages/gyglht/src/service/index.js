import request from "../api";
import loginSvs from './login';
import zbrdb from './zbrdb';
import spManage from './spManage';
import superviseManage from './superviseManage';
import enterpriseLabel from "./enterpriseLabel"
import enterpriseEvaluate from "./enterpriseEvaluate"
import purchaseInstitution from "./purchaseInstitution"

const portService = {
    //获取服务器时间
    getServeTive: (data) => {
        return request({
            url: `/dictdata/dict/getSystemTime.do`,
            data: data,
            method: 'get'
        })
    },
    revokeApproval(data){
        return request({
            url: `/approveFlow/callbackFlow.do`,
            data: data,
            method: 'GET'
        })
    },
    getLoginUserInfo(data){
        return request({
            url: `/api/sysUser/getCurrentUser.do`,
            data: data,
            method: 'GET'
        })
    },
    //更换用户头像
    changeHeadImages(data) {
        return request({
            url: `/api/sysUser/updateUserHeadImage.do`,
            data: data,
            headers: {
                contentType: 'formType'
            },
            method: 'post'
        })
    },
    ...loginSvs,
    ...zbrdb,
    ...spManage,
    ...superviseManage,
    ...enterpriseLabel,
    ...enterpriseEvaluate,
    ...purchaseInstitution
};
export default portService;