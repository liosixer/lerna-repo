export default {
    data() {
        return {
            tableHeight: 800,// table的高度
            iscollapsider: false,// 是否为展开更多搜索条件

        }
    },
    computed:{
        //判断是否大于1920 是否显示第三个搜索条件
        isWidescreen:function() {
            let isWide = false
            let w = Number(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
            if(w>=1920 && !this.iscollapsider){
                isWide = true
            }
            return isWide
        }
    },
    methods: {
        //计算高度
        computeTableHeight(){
            this.$nextTick(()=>{
                let titleHei = Number(this.$refs.table_title.offsetHeight)
                let searchHei = Number(this.$refs.table_search.offsetHeight)
                let paginationHei = Number(this.$refs.table_pagination.offsetHeight)
                let h = Number(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
                let w = Number(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
                let pad = Math.ceil(20*(w/1920))*2;
                if(w<=1366){
                    pad= 20
                }
                this.tableHeight = h - titleHei - searchHei - paginationHei - 150 - pad
            })
        },
        /**去掉JSON对象字符串前后所有空格*/
        trimJSON(params){
            let newParams = {}
            for(let key in params){
                if(typeof params[key] == 'string'){
                    newParams[key] = params[key].toString().replace(/(^\s*)|(\s*$)/g, "")
                }else{
                    newParams[key] = params[key]
                }
            }
            return newParams;
        },
        /**去掉字符串前后所有空格*/
        trimStr(str){
            if(str){
                return str.toString().replace(/(^\s*)|(\s*$)/g, "");
            }else{
                return ''
            }
        },

        /*
        * 如果两个对象拥有相同的key值从一个对象赋值给另一个对象
        * eg:
        * let obj1 = {a: 1, b: 2, c: 3};
        * let obj2 = {a: 11, b: 22, c: null, d: 44, e: 55};
        * listAssign(obj1, obj2);  // obj1 值为 {a: 11, b: 22, c: null}
        * */
        listAssign(targetObj, sourceData) {
            Object.keys(targetObj).forEach(key => {
                if (sourceData.hasOwnProperty(key)) {
                    targetObj[key] = sourceData[key];
                }
            })
        },

        // 给对象赋默认值
        assignDefault(targetObj, sourceData) {
            Object.keys(targetObj).forEach(key => {
                if (sourceData.hasOwnProperty(key)) {
                    if(targetObj[key] == null || targetObj[key] === '') {
                        targetObj[key] = sourceData[key];
                    }
                }
            })
        },

    },
}
