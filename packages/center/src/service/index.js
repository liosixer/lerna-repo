import request from "../api";
import loginSvs from './login';
import zbrdb from './zbrdb';
import spManage from './spManage';
import superviseManage from './superviseManage';
import qyjbxx from './qyjbxxApi';
import zsqyxx from './zsqyxx';
import userPowerService from './userPowerService'
import costManageService from './costManageService'
import logManagement from "./logManagement"
import platformConfig from "./platformConfig"
import enterpriseLabel from "./enterpriseLabel"
import personalUser from "./personalUser"

const portService = {
    //获取服务器时间
    getServeTive: (data) => {
        return request({
            url: `/admin/center/dict/getSystemTime.do`,
            data: data,
            method: 'get'
        })
    },
    // getUserInfo: (data) => {
    //     return request({
    //         url: '/enum/getCurrentUser.do',
    //         data,
    //         method: 'GET',
    //     })
    // },
    getUserInfo: (data) => {
        return request({
            url: '/api/sysUser/getCurrentUser.do',
            data,
            method: 'GET',
        })
    },
    revokeApproval(data){
        return request({
            url: `/approveFlow/callbackFlow.do`,
            data: data,
            method: 'GET'
        })
    },
    getUserAuth(data){
        return request({
            url: `/admin/authManage/getUserAuth`,
            data: data,
            method: 'GET'
        })
    },
    //修改密码
    changePassword(data) {
        return request({
            url: `/api/sysUser/updatePassword.do`,
            data: data,
            headers: {
                contentType: 'formType'
            },
            method: 'post'
        })
    },
    //重置密码
    resetPasswords(data) {
        return request({
            url: `/admin/yonghu/modifyPassword.do`,
            data: data,
            headers: {
                contentType: 'formType'
            },
            method: 'post'
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
    // /admin/authManage/getUserAuth
    ...loginSvs,
    ...zbrdb,
    ...spManage,
    ...superviseManage,
    ...qyjbxx,
    ...zsqyxx,
    ...userPowerService,
    ...costManageService,
    ...logManagement,
    ...platformConfig,
    ...enterpriseLabel,
    ...personalUser,
};
export default portService;