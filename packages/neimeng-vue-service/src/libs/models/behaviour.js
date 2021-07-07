const READONLY = { name: "readonly", code: 0, label: "查看" };
const ADD = { name: "add", code: 1, label: "新增" };
const EDIT = { name: "edit", code: 2, label: "编辑" };
const DELETE = { name: "delete", code: 3, label: "删除" };

/** 行为描述
 * @description 
 *  **/
class BaseBehaviour {
    constructor() { }
    static add() {
        return { ...ADD }
    }
    static edit() {
        return { ...EDIT }
    }
    static delete() {
        return { ...DELETE }
    }
    static readonly() {
        return { ...READONLY }
    }
}

export default BaseBehaviour;