import axios from "axios";
import Vue from 'vue';
import config from "../config/config";
import store from "../store/";
let VUE = new Vue()

const util = {
    transDay: (start, end) => {
        if (!end) {
            return '--'
        } else {
            if (end - start > 0) {
                return Math.floor((end - start) / 3600 / 24 / 1000)
            } else {
                return '00'
            }
        }
    },
    transHours: (start, end) => {
        if (!end) {
            return '--'
        } else {
            if (end - start > 0) {
                const hourse = (end - start) % (3600 * 24 * 1000)
                return Math.floor(hourse / 3600 / 1000)
            } else {
                return '00'
            }
        }
    },
    downLoad: async (guid) => {
        const getToken = (guid) =>{
            return new Promise((resolve, reject) => {
                axios.post(config.fileDownUrl+'/file-web/token/grantToken', {
                    bindGuid: guid,
                    bindType: 1,
                    busSystemAccountName: "guotou",
                    busSystemPassword: "test123",
                    type: 2
                    }).then(res => {
                    if (res.data.success) {
                        resolve(res.data.result)
                    } else {
                        reject(res.data)
                    }
                })
            })
        }
        const token = await getToken(guid)
        if (token) {
            window.location.href = `${config.fileDownUrl}/file-web/downloadFile?guid=${guid}&token=${token}`
        }
    },
    deepClone(target) {
        // 定义一个变量
        let result;
        // 如果当前需要深拷贝的是一个对象的话
        if (typeof target === 'object') {
            // 如果是一个数组的话
            if (Array.isArray(target)) {
                result = []; // 将result赋值为一个数组，并且执行遍历
                for (let i in target) {
                    // 递归克隆数组中的每一项
                    result.push(this.deepClone(target[i]))
                }
                // 判断如果当前的值是null的话；直接赋值为null
            } else if (target === null) {
                result = null;
                // 判断如果当前的值是一个RegExp对象的话，直接赋值
            } else if (target.constructor === RegExp) {
                result = target;
            } else {
                // 否则是普通对象，直接for in循环，递归赋值对象的所有值
                result = {};
                for (let i in target) {
                    result[i] = this.deepClone(target[i]);
                }
            }
            // 如果不是对象的话，就是基本数据类型，那么直接赋值
        } else {
            result = target;
        }
        // 返回最终结果
        return result;
    },

    async getFiles(guid,type){
        if(type == 1){
            // 多附件
            if(guid){
                let result = await axios({
                    url: this.downSrc()+"guotou-file-business/queryByGroupGuid",
                    method: "get",
                    params: { groupGuid: guid },
                    headers: {
                        Authorization: "Bearer " + store.state.loginCookie.access_token
                    }
                });
                if (result.data.code == 1) {
                    return result.data.data;
                }
            }else{
                return null
            }
        }else{
            // 单附件
            if(guid){
                let result = await axios({
                    url: this.downSrc()+"guotou-file-business/getByFileGuid",
                    method: "get",
                    params: { fileInfoGuid: guid },
                    headers: {
                        Authorization: "Bearer " + store.state.loginCookie.access_token
                    }
                });
                if (result.data.code == 1) {
                    return result.data.data;
                }
            }else{
                return null
            }
        }
    },
    uploadingUrl() {
        return config.requestUrl+"/gt-jy-zhaobiao/api/"

    },
    // 换算年月日
    compareTime(time2) {
        if (time2) {
            let year = time2.getFullYear();
            let month = time2.getMonth() + 1;
            let date = time2.getDate();
            return year + "-" + month + "-" + date
        } else {
            return 0;
        }
    },
    oneSecondClick(fn) {
        var time = null
        return function () {
            var last = time;
            var now = Date.now();
            if (!last) {
                time = now;
                fn.apply(this, arguments)
                return
            }
            if (last + 1000 > now) return
            time = now;
            fn.apply(this, arguments)
        }
    },
    // 开标地址
    kbUrl(bdGuid, token) {
        window.open(config.openBidUrl+"/znkb/#/home?guid=" + bdGuid + "&token=" + token + "&type=1&userType=1");
    },
    // 评标地址
    pbUrl(bdGuid, token) {
        window.open(config.openBidUrl +"/znpb/#/login?guid=" + bdGuid + "&token=" + token);
    },
    // 上传附件地址
    downSrc(){
        return config.fileDownUrl+'/';
    },
    async getDownSrc(guid,type) {

        if (guid) {
            let fileData = {};
            if(type == 1){
                // 多附件
                if(guid){
                    let result = await axios({
                        url: config.requestUrl+"/guotou-file-business/queryByGroupGuid",
                        method: "get",
                        params: { groupGuid: guid },
                        headers: {
                            Authorization: "Bearer " + store.state.loginCookie.access_token
                        }
                    });
                    if (result.data.code == 1) {
                        fileData = result.data.data;
                        let downLoadSrc = "";
                            downLoadSrc = this.downSrc()+'/file-web/downloadFile?guid='
                        for(let i = 0;i<fileData.length;i++){
                            fileData[i].src = downLoadSrc + fileData[i].guid + '&token=' + fileData[i].downToken;
                            fileData[i].name = fileData[i].name;
                        }
                        return fileData.src;                                
                    }
                }else{
                    return null
                }
            }else{
                // 单附件
                if(guid){
                    
                    let result = await axios({
                        url: config.requestUrl+"/guotou-file-business/getByFileGuid",
                        method: "get",
                        params: { fileInfoGuid: guid },
                        headers: {
                            Authorization: "Bearer " + store.state.loginCookie.access_token
                        }
                    });
                    if (result.data.code == 1) {
                        let downLoadSrc = "";
                            downLoadSrc = this.downSrc()+'file-web/downloadFile?guid='
                        fileData.src = downLoadSrc + result.data.data.guid + '&token=' + result.data.data.downToken
                        console.log(fileData.src)
                        fileData.name = result.data.data.name;
                        return fileData.src;
                    }
                }else{
                    return null
                }
            }
            
        }
    },
    async getDownSrcName(guid,type) {
        if (guid) {
            let fileData = {};
            if(type == 1){
                // 多附件
                if(guid){
                    let result = await axios({
                        url: this.downSrc()+"guotou-file-business/queryByGroupGuid",
                        method: "get",
                        params: { groupGuid: guid },
                        headers: {
                            Authorization: "Bearer " + store.state.frame.token
                        }
                    });
                    if (result.data.code == 1) {
                        fileData = result.data.data;
                        let downLoadSrc = "";
                        // if (window.location.host == "111.206.219.82:8093" || window.location.host == "localhost:8090") {
                            downLoadSrc = this.downSrc()+'file-web/downloadFile?guid='
                        // }
                        for(let i = 0;i<fileData.length;i++){
                            fileData[i].src = downLoadSrc + fileData[i].guid + '&token=' + fileData[i].downToken;
                            fileData[i].name = fileData[i].name;
                        }
                        return fileData;
                    }
                }else{
                    return null
                }
            }else{
                console.log(guid)
                // 单附件
                if(guid){
                    let result = await axios({
                        url: this.downSrc()+"guotou-file-business/getByFileGuid",
                        method: "get",
                        params: { fileInfoGuid: guid },
                        headers: {
                            Authorization: "Bearer " + store.state.frame.token
                        }
                    });
                    if (result.data.code == 1) {
                        let downLoadSrc = "";
                        // if (window.location.host == "111.206.219.82:8093" || window.location.host == "localhost:8089") {
                            downLoadSrc = this.downSrc()+'file-web/downloadFile?guid='
                        // }
                        fileData.src = downLoadSrc + result.data.data.guid + '&token=' + result.data.data.downToken
                        console.log(fileData.src)
                        fileData.name = result.data.data.name;
                        return fileData;
                    }
                }else{
                    return null
                }
            }

        }
    },
    // 获取审批级别
    async getShenpiJibie(shiXiangCode) {
        let result = await VUE.portService.getApprovalLevalList({
            shiXiangCode: shiXiangCode
        })
        if (result.code === 1) {
            return result.data.approveLevel;
        }
    },
    // 获取获取用户信息
    async getUserInfo() {
        let result = await VUE.portService.getUserInfo()
        if (result.code === 1) {
            store.commit('changeUserType', result.data);
        }
    },
    //下载 打印回执等路径
    getLocation() {
        return config.requestUrl+'/gt-jy-zhaobiao/api/'
    },
    // 获取服务器时间
    getCurrentTime() {
        return new Date(store.state.currentTime.currentTime)
    },
    // 检测是不是jpg，png，pdf
    isFileType(){
        
    }
}
export default util
