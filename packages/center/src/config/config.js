const { VUE_APP_URI_PREFIX, VUE_APP_URI_PORT, VUE_APP_URI_IP, VUE_APP_OPEN_BID_URL } = process.env;
const baseUrl = `${VUE_APP_URI_PREFIX}${VUE_APP_URI_IP}` +  (!!VUE_APP_URI_PORT ? ":" : "")  + `${VUE_APP_URI_PORT}`;
const fileDownUrl = baseUrl;
const requestUrl = baseUrl;

const config = {
    // 上传文件 下载文件的域名
    fileDownUrl: fileDownUrl,
    // 测试环境地址
    requestUrl: requestUrl,
    //开评标地址
    openBidUrl: VUE_APP_OPEN_BID_URL,
    //获取当前页面地址
    getLocalUrl:window.location.protocol + '//' + window.location.host
}

export default config;
