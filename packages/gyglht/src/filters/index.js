export function translate(val, arr) {
    let res = arr.find((e) => e.code === val)
    if (res) return res.name
    else return val
}

export function translateUnstrict(val, arr) {
    let res = arr.find((e) => e.code == val)
    if (res) return res.name
    else return val
}

export function dateFormater(t, formater) {
    if (t) {
        let date = new Date(t),
        Y = date.getFullYear() + '',
            M = date.getMonth() + 1,
            D = date.getDate(),
            H = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds();
        return formater.replace(/YYYY|yyyy/g, Y)
            .replace(/YY|yy/g, Y.substr(2, 2))
            .replace(/MM/g, (M < 10 ? '0' : '') + M)
            .replace(/DD/g, (D < 10 ? '0' : '') + D)
            .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
            .replace(/mm/g, (m < 10 ? '0' : '') + m)
            .replace(/ss/g, (s < 10 ? '0' : '') + s)
    } else {
        return ''
    }

}

// 时间戳转换 年-月-日 时：分：秒
export const timestampFormat = (timestamp, type) => {
    if (!timestamp || timestamp == null) return ""
    let time = parseInt(timestamp, 10)
    // 两位赋0
    const change = (t) => {
        if (t < 10) {
            return '0' + t
        } else {
            return t
        }
    }

    // 星期
    const getWeek = d => {
        let week
        if (d.getDay() == 0) week = "周日"
        if (d.getDay() == 1) week = "周一"
        if (d.getDay() == 2) week = "周二"
        if (d.getDay() == 3) week = "周三"
        if (d.getDay() == 4) week = "周四"
        if (d.getDay() == 5) week = "周五"
        if (d.getDay() == 6) week = "周六"
        return week
    }

    // 时间
    const date = new Date(time)
    const Y = date.getFullYear()
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
    const D = change(date.getDate())
    const h = change(date.getHours())
    const m = change(date.getMinutes())
    const s = change(date.getSeconds())
    const week = getWeek(date)

    if (type == "date") {
        return `${Y}-${M}-${D}`
    }
    if (type == "minute") {
        return `${Y}-${M}-${D} ${h}:${m}`
    }
    if (type == "week") {
        return `${Y}-${M}-${D} (${week})`
    }
    // 默认 年-月-日 时:分:秒
    return `${Y}-${M}-${D} ${h}:${m}:${s}`
}