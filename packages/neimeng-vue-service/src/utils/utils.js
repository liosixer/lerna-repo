import axios from 'axios';
import Vue from 'vue';
import config from '../config/config';
import store from '../store/';
let VUE = new Vue();
import { getUserInfo } from '@/service/index';

const util = {
  transDay: (start, end) => {
    if (!end) {
      return '--';
    } else {
      if (end - start > 0) {
        return Math.floor((end - start) / 3600 / 24 / 1000);
      } else {
        return '00';
      }
    }
  },
  transHours: (start, end) => {
    if (!end) {
      return '--';
    } else {
      if (end - start > 0) {
        const hourse = (end - start) % (3600 * 24 * 1000);
        return Math.floor(hourse / 3600 / 1000);
      } else {
        return '00';
      }
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
          result.push(this.deepClone(target[i]));
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
  async getFiles(guid, type) {
    // console.log(type)
    if (type == 1) {
      // 多附件
      if (guid) {
        let result = await axios({
          url: config.requestUrl + '/guotou-file-business/queryByGroupGuid',
          method: 'get',
          params: {
            groupGuid: guid,
          },
          headers: {
            Authorization: 'Bearer ' + store.state.loginCookie.access_token,
          },
        });
        if (result.data.code == 1 && result.data.data.length > 0) {
          return result.data.data;
        } else {
          return [];
        }
      } else {
        return null;
      }
    } else {
      // 单附件
      if (guid) {
        let result = await axios({
          url: config.requestUrl + '/guotou-file-business/getByFileGuid',
          method: 'get',
          params: {
            fileInfoGuid: guid,
          },
          headers: {
            Authorization: 'Bearer ' + store.state.loginCookie.access_token,
          },
        });
        if (result.data.code == 1 && result.data.data) {
          return result.data.data;
        }
      } else {
        return null;
      }
    }
  },
  uploadingUrl() {
    return config.requestUrl + '/gt-jy-zhaobiao/api/';
  },
  downWtPdf() {
    return config.requestUrl + '/gt-jy-zhaobiao/api/';
  },
  // 换算年月日
  compareTime(time2) {
    if (time2) {
      let year = time2.getFullYear();
      let month = time2.getMonth() + 1;
      let date = time2.getDate();
      return year + '-' + month + '-' + date;
    } else {
      return 0;
    }
  },
  oneSecondClick(fn) {
    var time = null;
    return function() {
      var last = time;
      var now = Date.now();
      if (!last) {
        time = now;
        fn.apply(this, arguments);
        return;
      }
      if (last + 1000 > now) return;
      time = now;
      fn.apply(this, arguments);
    };
  },
  // 开标地址
  kbUrl(bdGuid, token) {
    window.open(
      config.openBidUrl +
        '/znkb/#/home?guid=' +
        bdGuid +
        '&token=' +
        token +
        '&type=1&userType=3'
    );
  },
  // 评标地址
  pbUrl(bdGuid, token) {
    window.open(
      config.openBidUrl + '/znpb/#/login?guid=' + bdGuid + '&token=' + token
    );
  },
  // 上传附件地址
  downSrc() {
    let src = config.fileDownUrl + '/';
    return src;
  },
  async getDownSrc(guid, type) {
    if (guid) {
      let fileData = {};
      if (type == 1) {
        // 多附件
        if (guid) {
          let result = await axios({
            url: config.requestUrl + '/guotou-file-business/queryByGroupGuid',
            method: 'get',
            params: {
              groupGuid: guid,
            },
            headers: {
              Authorization: 'Bearer ' + store.state.loginCookie.access_token,
            },
          });
          if (result.data.code == 1) {
            fileData = result.data.data;
            let downLoadSrc = '';
            downLoadSrc = this.downSrc() + '/file-web/downloadFile?guid=';
            for (let i = 0; i < fileData.length; i++) {
              fileData[i].src =
                downLoadSrc +
                fileData[i].guid +
                '&token=' +
                fileData[i].downToken;
              fileData[i].name = fileData[i].name;
            }
            return fileData.src;
          }
        } else {
          return null;
        }
      } else {
        // 单附件
        if (guid) {
          let result = await axios({
            url: config.requestUrl + '/guotou-file-business/getByFileGuid',
            method: 'get',
            params: {
              fileInfoGuid: guid,
            },
            headers: {
              Authorization: 'Bearer ' + store.state.loginCookie.access_token,
            },
          });
          if (result.data.code == 1) {
            let downLoadSrc = '';
            downLoadSrc = this.downSrc() + 'file-web/downloadFile?guid=';
            fileData.src =
              downLoadSrc +
              result.data.data.guid +
              '&token=' +
              result.data.data.downToken;
            console.log(fileData.src);
            fileData.name = result.data.data.name;
            return fileData.src;
          }
        } else {
          return null;
        }
      }
    }
  },
  async getDownSrcName(guid, type) {
    if (guid) {
      let fileData = {};
      if (type == 1) {
        // 多附件
        if (guid) {
          let result = await axios({
            url: config.requestUrl + '/guotou-file-business/queryByGroupGuid',
            method: 'get',
            params: {
              groupGuid: guid,
            },
            headers: {
              Authorization: 'Bearer ' + store.state.loginCookie.access_token,
            },
          });
          if (result.data.code == 1) {
            fileData = result.data.data;
            let downLoadSrc = '';
            downLoadSrc = this.downSrc() + 'file-web/downloadFile?guid=';
            for (let i = 0; i < fileData.length; i++) {
              fileData[i].src =
                downLoadSrc +
                fileData[i].guid +
                '&token=' +
                fileData[i].downToken;
              fileData[i].name = fileData[i].name;
              fileData[i].createTime = fileData[i].createTime;
            }
            return fileData;
          }
        } else {
          return null;
        }
      } else {
        // 单附件
        if (guid) {
          let result = await axios({
            url: config.requestUrl + '/guotou-file-business/getByFileGuid',
            method: 'get',
            params: {
              fileInfoGuid: guid,
            },
            headers: {
              Authorization: 'Bearer ' + store.state.loginCookie.access_token,
            },
          });
          if (result.data.code == 1) {
            let downLoadSrc = '';
            downLoadSrc = this.downSrc() + 'file-web/downloadFile?guid=';
            if (result.data.data) {
              fileData.src =
                downLoadSrc +
                result.data.data.guid +
                '&token=' +
                result.data.data.downToken;
              fileData.name = result.data.data.name;
              fileData.createTime = result.data.data.createTime;
            }
            return fileData;
          }
        } else {
          return null;
        }
      }
    }
  },
  // 获取审批级别
  async getShenpiJibie(shiXiangCode) {
    let result = await VUE.portService.getApprovalLevalList({
      shiXiangCode: shiXiangCode,
    });
    if (result.code === 1) {
      return result.data.approveLevel;
    }
  },
  // 获取获取用户信息
  async getUserInfo() {
    let result = await getUserInfo();
    if (result.code === 1) {
      // A：招标代理   B：招标人   T：投标人
      let isAngency;
      if (result.data.type.indexOf('A') != -1) {
        isAngency = true;
      } else {
        isAngency = false;
      }
      result.data.isAngency = isAngency;
      store.commit('changeUserType', result.data);
    }
  },
  //下载 打印回执等路径
  getLocation() {
    return config.requestUrl + '/gt-jy-zhaobiao/api/';
  },
  // 服务器时间和一些时间的对比
  async currentTimeComparison(time) {
    let result = await VUE.portService.getServeTive();
    console.log(result.dateTime);
    console.log(time);
    if (result.dateTime > time) {
      return true;
    } else {
      return false;
    }
  },
  // 大概览各流程判断
  mainProcessControl(type, status) {
    // status当前流程
    if (type <= status % 10) {
      return '#157edf';
    } else {
      return '#B1B1B1';
    }
  },
  // 保留6位小数
  getFloat(num) {
    num = Math.round(num * Math.pow(10, 6)) / Math.pow(10, 6); //四舍五入
    // num = Number(num).toFixed(n); //补足位数
    return num;
  },
  //去掉时间戳的秒对比时间
  remSe(value) {
    if (value) {
      let values = util.deepClone(value);
      let seconds = Number(values) / 1000;
      let second = seconds % 60;
      return Number(seconds - second);
    }
  },
  //获取行业分类名称集合
  getHyNames(data, code, separator) {
    //data:要解析数据  code:行业编码  separator：分隔符
    const separators = separator ? separator : '--';
    let arr = [];
    data.forEach((item1) => {
      item1.children.forEach((item2) => {
        if (item2.children) {
          //可能有三级
          item2.children.forEach((item3) => {
            if (item3.cid == code) {
              arr.push(item1.name, item2.name, item3.name);
            }
          });
        } else {
          //只有二级
          if (item2.cid == code) {
            arr.push(item1.name, item2.name);
          }
        }
      });
    });
    return arr.join(separators);
  },
  // 导出
  exportMethods(obj, str, dianmeiType) {
    if (obj.projectName == undefined) {
      obj.projectName = '';
    }
    if (obj.projectNo == undefined) {
      obj.projectNo = '';
    }
    if (obj.projectNature == undefined) {
      obj.projectNature = '';
    }
    if (obj.tenderWay == undefined) {
      obj.tenderWay = '';
    }
    if (obj.projectType == undefined) {
      obj.projectType = '';
    }
    if (obj.yearPlanId == undefined) {
      obj.yearPlanId = '';
    }
    window.location.href =
      this.uploadingUrl() +
      str +
      '?projectType=' +
      obj.projectType +
      '&projectName=' +
      obj.projectName +
      '&projectNo=' +
      obj.projectNo +
      '&projectNature=' +
      obj.projectNature +
      '&tenderWay=' +
      obj.tenderWay +
      '&yearPlanId=' +
      obj.yearPlanId +
      '&dianmeiLeixing=' +
      obj.dianmeiLeixing +
      '&access_token=' +
      store.state.loginCookie.access_token;
  },

  /**
   * 向目标对象上赋予其对应属性上的值(会忽略掉name属性)
   * @param {target} *object / class* 目标对象
   * @param {source} *object* 资源对象
   *  **/
  assignProperties(target, source) {
    const copy = { ...source };
    for (let key of Reflect.ownKeys(target)) {
      if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
        if (copy.hasOwnProperty(key)) {
          target[key] = copy[key];
        }
      }
    }
  },

  getUuid: function(len, radix) {
    /* eslint-disable */
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
      ''
    );
    var uuid = [];
    var i;
    radix = radix || chars.length;
    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
    } else {
      // rfc4122, version 4 form
      var r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | (Math.random() * 16);
          uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
        }
      }
    }
    return uuid.join('');
    /* eslint-enable */
  },
  /**
   * 调用服务
   */
  async communicateService(signature) {
    let url = '';
    if ('https:' == location.protocol) {
      url = 'https://127.0.0.1:64366';
    } else {
      url = 'http://127.0.0.1:64365';
    }
    let res = null;
    var successFunc = function(data) {
      res = data;
    };
    await this.ajax_method(url, signature, 'post', successFunc);
    return res;
  },
  // 请求连接数字证书服务
  async ajax_method(url, data, method, success, error) {
    console.log(url, data, method, success, '6666666666');
    if (!url) {
      url = this.jmUrl;
    }
    //alert("正在连接");
    try {
      // 异步对象
      var ajax = await this.createXHR();

      // 注册事件
      ajax.onreadystatechange = function() {
        // 在事件中 获取数据 并修改界面显示
        if (ajax.readyState == 4) {
          // status响应的状态代码  304表示没有变化，可使用浏览器的缓存
          if ((ajax.status >= 200 && ajax.status < 300) || ajax.status == 304) {
            success(JSON.parse(ajax.responseText));
          } else {
          }
        }
      };

      // get 跟post  需要分别写不同的代码
      if (method == 'get') {
        // get请求
        if (data) {
          // 如果有值
          url += '?';
          url += data;
        } else {
        }
        // 设置 方法 以及 url
        ajax.open(method, url, false); //设置成false改成同步
        ajax.send();
        // send即可
      } else {
        // post请求
        // post请求 url 是不需要改变
        ajax.open(method, url, false); //设置成false改成同步
        // 需要设置请求报文
        ajax.setRequestHeader(
          'Content-type',
          'application/x-www-form-urlencoded'
        );
        // 判断data send发送数据
        if (data) {
          // 如果有值 从send发送
          ajax.send(data);
        } else {
          // 木有值 直接发送即可
          ajax.send();
        }

        if (!ajax.response) {
          error({ code: '500' });
        }
      }
    } catch (err) {
      // this.$message({
      //     showClose: true,
      //     message: '没有启动数字证书服务!',
      //     offset:80,
      //     type: 'error'
      // });
      error({ code: '500' });
    }
  },
  //CA服务 创建定义 XMLHttpRequest
  async createXHR() {
    if (typeof XMLHttpRequest != 'undefined') {
      return new XMLHttpRequest();
    } else if (typeof ActiveXObject != 'undefined') {
      if (typeof arguments.callee.activeXString != 'string') {
        var versions = [
            'MSXML2.XMLHttp.6.0',
            'MSXML2.XMLHttp.3.0',
            'MSXML2.XMLHttp',
          ],
          i,
          len;
        for (i = 0, len = versions.length; i < len; i++) {
          try {
            new ActiveXObject(versions[i]);
            arguments.callee.activeXString = versions[i];
            break;
          } catch (ex) {
            //可放入提示文字
          }
        }
      }
      return new ActiveXObject(arguments.callee.activeXString);
    } else {
      // 没有XHR对象可用，抛出错误
      throw new Error('No XHR object available.');
    }
  },
  /**
   * 对象转url参数
   * @param {Object<any>} data 参数对象
   * @param {Boolean} isPrefix 是否需要?前缀
   * @param {Boolean} paramIsEncode 参数编码
   * @returns
   */
  queryParams(data, isPrefix = false, paramIsEncode = false) {
    let prefix = isPrefix ? '?' : '';
    let _result = [];
    for (let key in data) {
      let value = data[key];
      // 去掉为空的参数
      if (['', undefined, null].includes(value)) {
        continue;
      }
      if (value.constructor === Array) {
        value.forEach((_value) => {
          if (paramIsEncode)
            _result.push(
              encodeURIComponent(key) + '[]=' + encodeURIComponent(_value)
            );
          else _result.push(key + '[]=' + _value);
        });
      } else {
        if (paramIsEncode)
          _result.push(
            encodeURIComponent(key) + '=' + encodeURIComponent(value)
          );
        else _result.push(key + '=' + value);
      }
    }

    return _result.length ? prefix + _result.join('&') : '';
  },
};

/**
 * 删除对象的空值属性
 * @param {any} obj 需要处理的对象
 * @returns 返回处理后的对象
 */
export function removeNullOrEmptyAndTrim(obj) {
  if (Object.keys(obj).length <= 0) return;
  const data = {};
  for (const key in obj) {
    if (obj[key] !== '' && obj[key] !== null) {
      data[key] = obj[key];
      if (typeof data[key] === 'string') {
        data[key] = data[key].replace(/(^\s*)|(\s*$)/g, '');
      }
    }
  }
  return data;
}

export default util;
