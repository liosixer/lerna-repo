/** Mixin模式指的是，将多个类的接口“混入”（mix in）另一个类 **/
// 把传入的类混合成一个类并返回
function mix(...mixins) {
    // 定义一个混合类
    class Mix {
        constructor() {
            for (let _class of mixins) {
                copyProperties(this, new _class()); // 拷贝实例属性
            }
        }
    }

    for (let mixin of mixins) {
        copyProperties(Mix, mixin); // 拷贝静态属性
        copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
    }
    return Mix;
}

function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
        if (key !== "constructor" &&
            key !== "prototype" &&
            key !== "name"
        ) {
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}

export default mix;