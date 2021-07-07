import store from "../../../store/index"
const stepsTrans = {
    /**
     * 此字段用户记录当前标段处于哪个环节
     * 1、公开预审
     * 预审公告(11)-->预审文件(12)-->资审准备(13)-->开启(14)-->资格审查(15)-->资审结果(16)
     * 2、公开后审
     * 招标公告(21)-->招标文件(22)-->标前准备(23)-->开标(24)-->评标(25)-->定标(26)-->标后(27)
     * 3、邀请招标
     * 邀请函(31)-->招标文件(32)-->标前准备(33)-->开标(34)-->评标(35)-->定标(36)-->标后(37)
     * 4、询比公开
     * 询比公告(41)-->采购文件(42)-->标前准备(43)-->开启(44)-->评审(45)-->成交(46)-->成交后(47)
     * 5、询比邀请
     * 邀请函(51)-->采购文件(52)-->标前准备(53)-->开启(54)-->评审(55)-->成交(56)-->成交后(57)
     * 6、竞争性谈判邀请
     * 邀请函(61)-->采购文件(62)-->标前准备(63)-->开启(64)-->评审(65)-->成交(66)-->成交后(67)
     * 7、单一来源
     * 邀请函(71)-->采购文件(72)-->标前准备(73)-->开启(74)-->评审(75)-->成交(76)-->成交后(77)
     * 8、竞价公开
     * 竞价公告(81)-->竞价准备(83)-->竞价(85)-->定标(86)-->标后(87)
     * 9、竞价邀请
     * 邀请函(91)-->竞价准备(93)-->竞价(95)-->定标(96)-->标后(97)
     * 10、竞争性谈判公开
     * 竞谈公告(101)-->采购文件(102)-->标前准备(103)-->开启(104)-->评审(105)-->成交(106)-->成交后(107)
     */

// {name: "招标公告", code: "Notice", isDeal: true, active: true},
// {name: "招标文件", code: "BidFile", isDeal: true, active: false},
// {name: "标前准备", code: "Tender", isDeal: true, active: false},
// {name: "开标", code: "OpenTender", isDeal: true, active: false},
// {name: "评标", code: "EvalTender", isDeal: true, active: false},
// {name: "定标", code: "CaliTender", isDeal: true, active: false},
// {name: "标后", code: "AfterTender", isDeal: true, active: false}

// [{ code: 1, name: "公开招标"},{ code: 2, name: "邀请招标"},{code: 6, name: "询比采购"},{code: 7, name: "竞争性谈判"},{ code: 4, name: "单一来源"},{ code: 10, name: "竞价"}]

// supplierSource  1：公开  2：邀请
    getSteps(num) {
        const array = [

            [// 1、公开预审
                {number: 11, name: "预审公告", code: "Notice", isDeal: true, active: true},
                {number: 12, name: "预审文件", code: "BidFile", isDeal: true, active: false},
                {number: 13, name: "标前准备", code: "Tender", isDeal: true, active: false},
                {number: 14, name: "开启", code: "OpenTender", isDeal: true, active: false},
                {number: 15, name: "评审", code: "EvalTender", isDeal: true, active: false},
                {number: 16, name: "资审结果", code: "CaliTender", isDeal: true, active: false}
            ],
            [// 2、公开后审
                {number: 21, name: "招标公告", code: "Notice", isDeal: true, active: true},
                {number: 22, name: "招标文件", code: "BidFile", isDeal: true, active: false},
                {number: 23, name: "标前准备", code: "Tender", isDeal: true, active: false},
                {number: 24, name: "开标", code: "OpenTender", isDeal: true, active: false},
                {number: 25, name: "评标", code: "EvalTender", isDeal: true, active: false},
                {number: 26, name: "定标", code: "CaliTender", isDeal: true, active: false},
                {number: 27, name: "标后", code: "AfterTender", isDeal: true, active: false}
            ],
            [// 3、邀请招标
                {number: 31, name: "邀请函", code: "Notice", isDeal: true, active: true},
                {number: 32, name: "招标文件", code: "BidFile", isDeal: true, active: false},
                {number: 33, name: "标前准备", code: "Tender", isDeal: true, active: false},
                {number: 34, name: "开标", code: "OpenTender", isDeal: true, active: false},
                {number: 35, name: "评标", code: "EvalTender", isDeal: true, active: false},
                {number: 36, name: "定标", code: "CaliTender", isDeal: true, active: false},
                {number: 37, name: "标后", code: "AfterTender", isDeal: true, active: false}
            ],
            [// 4、询比公开 // 询比公告(1)-->采购文件(2)-->标前准备(3)-->开启(4)-->评审(5)-->成交(6)-->成交后(7)
                {number: 41, name: "询比公告", code: "Notice", isDeal: true, active: true},
                {number: 42, name: "采购文件", code: "BidFile", isDeal: true, active: false},
                {number: 43, name: "标前准备", code: "Tender", isDeal: true, active: false},
                {number: 44, name: "开启", code: "OpenTender", isDeal: true, active: false},
                {number: 45, name: "评审", code: "EvalTender", isDeal: true, active: false},
                {number: 46, name: "成交", code: "CaliTender", isDeal: true, active: false},
                {number: 47, name: "成交后", code: "AfterTender", isDeal: true, active: false}
            ],
            [// 5、询比邀请 // 邀请函(1)-->采购文件(2)-->标前准备(3)-->开启(4)-->评审(5)-->成交(6)-->成交后(7)
                {number: 51, name: "邀请函", code: "Notice", isDeal: true, active: true},
                {number: 52, name: "采购文件", code: "BidFile", isDeal: true, active: false},
                {number: 53, name: "标前准备", code: "Tender", isDeal: true, active: false},
                {number: 54, name: "开启", code: "OpenTender", isDeal: true, active: false},
                {number: 55, name: "评审", code: "EvalTender", isDeal: true, active: false},
                {number: 56, name: "成交", code: "CaliTender", isDeal: true, active: false},
                {number: 57, name: "成交后", code: "AfterTender", isDeal: true, active: false}
            ],
            [// 6、竞争性谈判 // 邀请函(1)-->采购文件(2)-->标前准备(3)-->开启(4)-->评审(5)-->成交(6)-->成交后(7)
                {number: 61, name: "邀请函", code: "Notice", isDeal: true, active: true},
                {number: 62, name: "采购文件", code: "BidFile", isDeal: true, active: false},
                {number: 63, name: "标前准备", code: "Tender", isDeal: true, active: false},
                {number: 64, name: "开启", code: "OpenTender", isDeal: true, active: false},
                {number: 65, name: "评审", code: "EvalTender", isDeal: true, active: false},
                {number: 66, name: "成交", code: "CaliTender", isDeal: true, active: false},
                {number: 67, name: "成交后", code: "AfterTender", isDeal: true, active: false}
            ],
            [// 7、单一来源 // 邀请函(1)-->采购文件(2)-->标前准备(3)-->开启(4)-->评审(5)-->成交(6)-->成交后(7)
                {number: 71, name: "邀请函", code: "Notice", isDeal: true, active: true},
                {number: 72, name: "采购文件", code: "BidFile", isDeal: true, active: false},
                {number: 73, name: "标前准备", code: "Tender", isDeal: true, active: false},
                {number: 74, name: "开启", code: "OpenTender", isDeal: true, active: false},
                {number: 75, name: "评审", code: "EvalTender", isDeal: true, active: false},
                {number: 76, name: "成交", code: "CaliTender", isDeal: true, active: false},
                {number: 77, name: "成交后", code: "AfterTender", isDeal: true, active: false}
            ],
            [// 8、竞价公开 // 竞价公告(1)-->竞价准备(3)-->竞价(5)-->定标(6)-->标后(7)
                {number: 81, name: "竞价公告", code: "Notice", isDeal: true, active: true},
                {number: 83, name: "竞价准备", code: "Tender", isDeal: true, active: false},
                {number: 85, name: "竞价", code: "EvalTender", isDeal: true, active: false},
                {number: 86, name: "成交", code: "CaliTender", isDeal: true, active: false},
                {number: 87, name: "成交后", code: "AfterTender", isDeal: true, active: false}
            ],
            [// 9、竞价邀请// 邀请函(1)-->竞价准备(3)-->竞价(5)-->定标(6)-->标后(7)
                {number: 91, name: "竞价邀请", code: "Notice", isDeal: true, active: true},
                {number: 93, name: "竞价准备", code: "Tender", isDeal: true, active: false},
                {number: 95, name: "竞价", code: "EvalTender", isDeal: true, active: false},
                {number: 96, name: "成交", code: "CaliTender", isDeal: true, active: false},
                {number: 97, name: "成交后", code: "AfterTender", isDeal: true, active: false}
            ],
            [// 10、竞争性谈判公开// 竞谈公告(101)-->采购文件(102)-->标前准备(103)-->开启(104)-->评审(105)-->成交(106)-->成交后(107)
                {number: 101, name: "竞谈公告", code: "Notice", isDeal: true, active: true},
                {number: 102, name: "采购文件", code: "BidFile", isDeal: true, active: false},
                {number: 103, name: "标前准备", code: "Tender", isDeal: true, active: false},
                {number: 104, name: "开启", code: "OpenTender", isDeal: true, active: false},
                {number: 105, name: "评审", code: "EvalTender", isDeal: true, active: false},
                {number: 106, name: "成交", code: "CaliTender", isDeal: true, active: false},
                {number: 107, name: "成交后", code: "AfterTender", isDeal: true, active: false}
            ],
             [// 11、竞争性磋商邀请// 邀请函(111)-->采购文件(112)-->标前准备(113)-->开启(114)-->评审(115)-->成交(116)-->成交后(117)
                {number: 111, name: "邀请函", code: "Notice", isDeal: true, active: true},
                {number: 112, name: "采购文件", code: "BidFile", isDeal: true, active: false},
                {number: 113, name: "标前准备", code: "Tender", isDeal: true, active: false},
                {number: 114, name: "开启", code: "OpenTender", isDeal: true, active: false},
                {number: 115, name: "评审", code: "EvalTender", isDeal: true, active: false},
                {number: 116, name: "成交", code: "CaliTender", isDeal: true, active: false},
                {number: 117, name: "成交后", code: "AfterTender", isDeal: true, active: false}
            ],
            [// 12、竞争性磋商公开// 磋商公告(121)-->采购文件(122)-->标前准备(123)-->开启(124)-->评审(125)-->成交(126)-->成交后(127)
               {number: 121, name: "磋商公告", code: "Notice", isDeal: true, active: true},
               {number: 122, name: "采购文件", code: "BidFile", isDeal: true, active: false},
               {number: 123, name: "标前准备", code: "Tender", isDeal: true, active: false},
               {number: 124, name: "开启", code: "OpenTender", isDeal: true, active: false},
               {number: 125, name: "评审", code: "EvalTender", isDeal: true, active: false},
               {number: 126, name: "成交", code: "CaliTender", isDeal: true, active: false},
               {number: 127, name: "成交后", code: "AfterTender", isDeal: true, active: false}
           ]
        ]
        if(store.state.logoType==2){
            array[1][5].name="中标"
            array[2][5].name="中标"
        }
        return array[num]
    }
}
export default stepsTrans