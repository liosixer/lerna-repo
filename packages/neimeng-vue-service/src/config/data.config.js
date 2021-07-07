/**
 * 交易领域数据字典
 */
export const businessFrom = [
  { name: '工程建设', img: 'gongcheng', code: 1 },
  { name: '政府采购', img: 'zhengfu', code: 2 },
  { name: '自然资源', img: 'ziran', code: 3 },
];

/**
 * 二级交易领域数据字典
 */
export const systemFrom = [
  { name: '补耕及节余指标', code: 1 },
  { name: '矿业权及地勘', code: 2 },
];

/**
 * 行业分类
 */
export const industryType = [
  { name: '房屋市政工程', code: 1 },
  { name: '长输管道', code: 3 },
  { name: '水利工程', code: 3 },
  { name: '交通工程', code: 4 },
  { name: '电力工程', code: 5 },
];

/**
 * 事项类型
 */
export const businessType = [
  { name: '项目注册', code: 1 },
  { name: '招标文件', code: 2 },
  { name: '招标公告', code: 3 },
  { name: '场地预约', code: 4 },
  { name: '场地变更', code: 5 },
];

/**
 * 招标方式数据字典
 */
export const zbFangshi = [
  {
    code: 1,
    name: '公开招标',
  },
  {
    code: 2,
    name: '邀请招标',
  },
  {
    code: 4,
    name: '单一来源采购',
  },
  {
    code: 7,
    name: '竞争性谈判采购',
  },
  {
    code: 8,
    name: '竞争性磋商',
  },
  {
    code: 11,
    name: '询价',
  },
];

/**
 * 计划状态数据字典
 */
export const planStatus = [
  {
    code: 1,
    name: '编辑中',
  },
  {
    code: 2,
    name: '待接收',
  },
  {
    code: 3,
    name: '待分办',
  },
  {
    code: 4,
    name: '待审核',
  },
  {
    code: 5,
    name: '已审核',
  },
  {
    code: 6,
    name: '待指派',
  },
  {
    code: 7,
    name: '已指派',
  },
  {
    code: 8,
    name: '变更中',
  },
  {
    code: 9,
    name: '转委托待审核',
  },
  {
    code: 10,
    name: '起草委托协议',
  },
  {
    code: 11,
    name: '签署委托协议',
  },
  {
    code: 12,
    name: '已结项',
  },
  {
    code: 13,
    name: '已取消',
  },
  {
    code: 14,
    name: '变更待核验',
  },
];

/**
 * 交易方式
 */
export const tradeType = [
  {
    code: 1,
    name: '挂牌',
  },
  {
    code: 2,
    name: '拍卖',
  },
  {
    code: 3,
    name: '招标',
  },
];

/**
 * 资源类型
 */
export const resourceNoteType = [
  { name: '采矿权公告', img: 'mine', code: 1 },
  { name: '探矿权公告', img: 'prospect', code: 2 },
  { name: '地质勘察基金公告', img: 'survey', code: 3 },
];

/**
 * 公告类型
 */
export const ggType = [
  { name: '补充耕地指标公告', code: 10 },
  { name: '零星指标公告', code: 20 },
  { name: '采矿权', suffix: '公告', code: 30 },
  { name: '探矿权', suffix: '公告', code: 40 },
  { name: '地质勘察基金', suffix: '公告', code: 50 },
];

/**
 * 指标类别
 */
export const indexType = [
  { name: '耕地数量', code: 10 },
  { name: '水田规模', code: 20 },
  { name: '粮食产能', code: 30 },
];

/**
 * 资源类型
 */
export const resourceType = [
  { name: '采矿权', img: 'mine', code: 1 },
  { name: '探矿权', img: 'prospect', code: 2 },
  { name: '地质勘察基金', img: 'survey', code: 3 },
];

/**
 * 指标公告分类
 */
export const indexNoticeType = [
  { name: '补充耕地指标公告', code: 1 },
  { name: '零星指标公告', code: 2 },
];

/**
 * 资源阶段
 */
export const resourceStage = [
  { name: '已开始', code: 1 },
  { name: '公告期', code: 2 },
  { name: '评标期', code: 3 },
  { name: '唱标期', code: 4 },
  { name: '预成交', code: 5 },
  { name: '结果公示期', code: 6 },
  { name: '成交', code: 7 },
  { name: '未成交', code: 8 },
  { name: '交易终止', code: 9 },
];

/**
 * 文件状态
 */
export const fileStatus = [
  { name: '编制中', code: 1 },
  { name: '待审核', code: 2 },
  { name: '待确认', code: 3 },
  { name: '待审批', code: 4 },
  { name: '已定稿', code: 5 },
  { name: '变更中', code: 6 },
];

/**
 * 审核状态(项目注册)
 */
export const auditStatus = [
  { name: '未提交', code: 1 },
  { name: '已提交', code: 2 },
  { name: '不通过', code: 3 },
  { name: '已确认', code: 4 },
];

/**
 * 审核状态
 */
export const approveStatus = [
  { name: '编辑中', code: 1 },
  { name: '待审核', code: 2 },
  { name: '审核通过', code: 3 },
  { name: '审核不通过', code: 4 },
];

/**
 * 内蒙区划
 */
export const neimengAreaCode = [
  { name: '内蒙古自治区', code: '150000' },
  { name: '呼和浩特市', code: '150100' },
  { name: '包头市', code: '150200' },
  { name: '呼伦贝尔市', code: '150700' },
  { name: '兴安盟', code: '152200' },
  { name: '通辽市', code: '150500' },
  { name: '赤峰市', code: '150400' },
  { name: '锡林郭勒盟', code: '152500' },
  { name: '乌兰察布市', code: '150900' },
  { name: '鄂尔多斯市', code: '150600' },
  { name: '巴彦淖尔市', code: '150800' },
  { name: '乌海市', code: '150300' },
  { name: '阿拉善盟', code: '152900' },
];
