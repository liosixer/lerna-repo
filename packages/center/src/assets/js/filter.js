const filter = {
    timestampChange: (val) => {
        if (val) {
            var date = new Date(val); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
            var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            return Y + M + D + h + m + ':'  + s;
        }

    },
    getLabel: (val, options) => {
        if (val || val === 0) {
            let index = options.findIndex(v => {
                return v.value === val
            })
            return options[index].label
        }
    }
}
export default filter