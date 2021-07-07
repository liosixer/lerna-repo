let fileDownUrl = '';
let requestUrl = '';
let wsRequestUrl = '';
let jjRequestUrl = '';
let openBidUrl = '';
let fileDownUrlSuffix = '/guotou-file-business/getByFileGuid';
let caUrl = '';
let homeUrl = '';
const {
  VUE_APP_IP_PROD,
  VUE_APP_IP_DEV,
  VUE_APP_NM_IP_DEV,
  VUE_APP_NM_IP_PROD,
  VUE_APP_OPEN_BID_URL_PROD,
  VUE_APP_OPEN_BID_URL_DEV,
  VUE_APP_FILE_COMPARE_TOOL,
  VUE_APP_CA_URL,
} = process.env;
const HTTP_PREFIX = 'http://';
const HTTPS_PREFIX = 'https://';
const WS_PREFIX = 'ws://';
const BIDDING_SUFFIX = '/jingjia-cgr/';
const WS_SUFFIX = 'websocket/123';
const HOME_SUFFIX = '/tj-home-web';

const fileCompareTool = VUE_APP_FILE_COMPARE_TOOL;

if (process.env.NODE_ENV === 'production') {
  fileDownUrl = `${HTTPS_PREFIX}${VUE_APP_IP_PROD}`;
  // requestUrl = `${HTTPS_PREFIX}${VUE_APP_IP_PROD}`;
  requestUrl = `${HTTP_PREFIX}${VUE_APP_NM_IP_PROD}`;
  jjRequestUrl = `${HTTPS_PREFIX}${VUE_APP_IP_PROD}${BIDDING_SUFFIX}`;
  wsRequestUrl = `${WS_PREFIX}${VUE_APP_IP_PROD}${BIDDING_SUFFIX}${WS_SUFFIX}`;
  openBidUrl = VUE_APP_OPEN_BID_URL_PROD;
  caUrl = `${HTTPS_PREFIX}${VUE_APP_IP_PROD}${VUE_APP_CA_URL}`;
  homeUrl = `${HTTPS_PREFIX}${VUE_APP_IP_PROD}`;
} else {
  fileDownUrl = `${HTTP_PREFIX}${VUE_APP_IP_DEV}`;
  // requestUrl = `${HTTP_PREFIX}${VUE_APP_IP_DEV}`;
  requestUrl = `${HTTP_PREFIX}${VUE_APP_NM_IP_DEV}`;
  jjRequestUrl = `${HTTP_PREFIX}${VUE_APP_IP_DEV}${BIDDING_SUFFIX}`;
  wsRequestUrl = `${WS_PREFIX}${VUE_APP_IP_DEV}${BIDDING_SUFFIX}${WS_SUFFIX}`;
  openBidUrl = VUE_APP_OPEN_BID_URL_DEV;
  caUrl = `${HTTPS_PREFIX}${VUE_APP_IP_PROD}${VUE_APP_CA_URL}`;
  homeUrl = `${HTTP_PREFIX}${VUE_APP_IP_DEV}${HOME_SUFFIX}`;
}

const { NODE_ENV } = process.env;
console.log(`【当前环境】${NODE_ENV}`);
console.log(`【当前竞价地址】${jjRequestUrl}`);

const config = {
  // 上传文件 下载文件的域名
  fileDownUrl,
  //下载文件后缀
  fileDownUrlSuffix,
  // 测试环境地址
  requestUrl,
  jjRequestUrl,
  wsRequestUrl,
  //开评标地址
  openBidUrl,
  caUrl,
  //获取当前页面地址
  getLocalUrl: window.location.protocol + '//' + window.location.host,
  fileCompareTool,
  homeUrl,
};

export default config;
