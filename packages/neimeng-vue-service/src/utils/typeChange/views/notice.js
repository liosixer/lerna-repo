const arr = [
    {value: 1, label: "公开招标"},
    {value: 2, label: "邀请招标"},
    {value: 6, label: "询比采购"},
    {value: 7, label: "竞争性谈判"},
    {value: 4, label: "单一来源"},
    {value: 10, label: "竞价"}
]

const trNoticeData = {
    aa:'222',
    isNotice: {//用来区分公告还是邀请函
        1: true,
        2: false,
        xbgk: true,
        xbyq: false,
        jzxtp: false,
        dyly: false,
        jjgk: true,
        jjyq: false
    },
    noticeTitle: { //公告标题
        1: '招标公告',
        2: '投标邀请函',
        xbgk: '询比公告',
        xbyq: '邀请函',
        jzxtp: '邀请函',
        dyly: '邀请函',
        jjgk: '竞价公告',
        jjyq: '邀请函'
    }
}
export default trNoticeData