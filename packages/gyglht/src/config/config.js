
const { NODE_ENV, VUE_APP_URI_PREFIX, VUE_APP_URI_PORT, VUE_APP_URI_IP, VUE_APP_OPEN_BID_URL, VUE_APP_CA_URL } = process.env;
const baseUrl = `${VUE_APP_URI_PREFIX}${VUE_APP_URI_IP}` +  (!!VUE_APP_URI_PORT ? ":" : "")  + `${VUE_APP_URI_PORT}`;
const fileDownUrl = baseUrl;
const requestUrl = baseUrl;

const localUrl = window.location.protocol + '//' + window.location.host;
const getLocalUrl = NODE_ENV === "production" ? `${localUrl}/gt-jy-qyglht` : localUrl;

const config = {
    fileDownUrl,
    requestUrl,
    openBidUrl: VUE_APP_OPEN_BID_URL,
    //获取当前页面地址
    getLocalUrl,
    caUrl: VUE_APP_CA_URL
}

export default config;