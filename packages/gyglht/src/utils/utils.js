import axios from "axios";
import config from "../config/config";
const util = {
    transDay: (start, end) => {
        if (end - start > 0) {
            return Math.floor((end - start) / 3600 / 24 / 1000)
        } else {
            return ''
        }
    },
    transHours: (start, end) => {
        if (end - start > 0) {
            const hourse = (end - start) % (3600 * 24 * 1000)
            return Math.floor(hourse / 3600 / 1000)
        } else {
            return ''
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
}
export default util